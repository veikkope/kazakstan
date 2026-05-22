'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import type { Sight } from '@/lib/types';
import { categoryMeta } from '@/data/categories';
import LocateControl from './LocateControl';

L.Icon.Default.mergeOptions({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

type MarkState = 'none' | 'shortlist' | 'priority' | 'visited';

function markStateFor(
  id: string,
  shortlistIds: ReadonlySet<string>,
  priorityIds: ReadonlySet<string>,
  visitedIds: ReadonlySet<string>,
): MarkState {
  if (visitedIds.has(id)) return 'visited';
  if (priorityIds.has(id)) return 'priority';
  if (shortlistIds.has(id)) return 'shortlist';
  return 'none';
}

function makeIcon(color: string, mark: MarkState): L.DivIcon {
  if (mark === 'shortlist') {
    // Plain amber ring, no glyph — signals "on my list" without the
    // weight of a top-pick mark. Same size as priority/visited so the
    // marker doesn't shift when a sight is promoted to suosikki.
    return L.divIcon({
      className: '',
      html: `<div style="width:1.4rem;height:1.4rem;border-radius:9999px;background:${color};border:2.5px solid #fbbf24;box-shadow:0 1px 4px rgba(0,0,0,0.45)"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  }
  if (mark === 'priority' || mark === 'visited') {
    // Coloured ring + glyph. ★ amber for top picks, ✓ emerald for visited.
    const ring = mark === 'visited' ? '#10b981' : '#fbbf24';
    const glyph = mark === 'visited' ? '✓' : '★';
    return L.divIcon({
      className: '',
      html: `<div style="position:relative;width:1.4rem;height:1.4rem;border-radius:9999px;background:${color};border:2.5px solid ${ring};box-shadow:0 1px 4px rgba(0,0,0,0.45)">
        <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;line-height:1;text-shadow:0 1px 1px rgba(0,0,0,0.45)" aria-hidden="true">${glyph}</span>
      </div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  }
  return L.divIcon({
    className: '',
    html: `<div style="
      width:1.25rem;height:1.25rem;border-radius:9999px;
      background:${color};border:2px solid white;
      box-shadow:0 1px 3px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function safeText(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

function safeAttr(s: string): string {
  return safeText(s);
}

function safeUrl(s: string): string {
  // Allow relative paths and https only — strip everything else.
  if (s.startsWith('/') || s.startsWith('https://')) return safeAttr(s);
  return '';
}

function starsRow(rating: number): string {
  const rounded = Math.round(rating);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rounded ? '★' : '☆';
  }
  return `
    <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
      <span style="display:inline-flex;letter-spacing:1px;color:#a98654;font-size:13px;line-height:1">
        ${stars}
      </span>
      <span style="font-size:11px;color:#64748b">${rating.toFixed(1)}</span>
    </div>
  `;
}

function popupHtml(sight: Sight, mark: MarkState): string {
  const meta = categoryMeta[sight.category];
  const imageUrl = sight.image ? safeUrl(sight.image) : '';
  const imageAlt = safeAttr(sight.imageAlt ?? sight.name);

  const markChip =
    mark === 'visited'
      ? `<span style="position:absolute;top:8px;right:8px;display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;background:rgba(6,78,59,0.85);color:#fff;font-size:11px;font-weight:600;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)">
          <span style="color:#34d399" aria-hidden="true">✓</span>
          Käyty
        </span>`
      : mark === 'priority'
        ? `<span style="position:absolute;top:8px;right:8px;display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;background:rgba(15,23,42,0.62);color:#fff;font-size:11px;font-weight:600;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)">
            <span style="color:#fbbf24" aria-hidden="true">★</span>
            Suosikki
          </span>`
        : '';

  const hero = imageUrl
    ? `<div style="position:relative;height:132px;overflow:hidden;background:#f1ede4">
        <img src="${imageUrl}" alt="${imageAlt}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block" />
        <span style="position:absolute;bottom:8px;left:8px;display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:rgba(15,23,42,0.62);color:#fff;font-size:11px;font-weight:500;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)">
          <span style="display:inline-block;width:6px;height:6px;border-radius:999px;background:${meta.color}"></span>
          <span>${meta.emoji} ${meta.fi}</span>
        </span>
        ${markChip}
      </div>`
    : `<div style="position:relative;height:56px;display:flex;align-items:center;justify-content:center;background:${meta.color}1a;color:#1e293b;font-size:13px;font-weight:500;gap:6px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:${meta.color}"></span>
        ${meta.emoji} ${meta.fi}
        ${markChip}
      </div>`;

  const ratings = sight.ratings
    ? starsRow(
        (sight.ratings.popularity +
          sight.ratings.interest +
          sight.ratings.uniqueness) /
          3,
      )
    : '';

  return `
    <div style="width:248px;font-family:var(--font-geist-sans),system-ui,-apple-system,sans-serif;color:#1e293b">
      ${hero}
      <div style="padding:11px 14px 13px">
        <strong style="display:block;font-size:15px;line-height:1.25;letter-spacing:-0.01em">${safeText(sight.name)}</strong>
        ${ratings}
        <p style="font-size:13px;line-height:1.45;margin:8px 0 10px;color:#475569">${safeText(sight.shortDescription)}</p>
        <a href="/nahtavyydet/${safeAttr(sight.slug)}" style="display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:#2563eb;text-decoration:none">
          Lue lisää
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  `;
}

interface ClusterProps {
  sights: Sight[];
  shortlistIds: ReadonlySet<string>;
  priorityIds: ReadonlySet<string>;
  visitedIds: ReadonlySet<string>;
  onSelect: (id: string) => void;
  /** Setter for the marker registry kept by the parent for zoomToShowLayer lookups. */
  registerMarkers: (
    cluster: L.MarkerClusterGroup,
    markers: Map<string, L.Marker>,
  ) => void;
}

function MarkerClusterLayer({
  sights,
  shortlistIds,
  priorityIds,
  visitedIds,
  onSelect,
  registerMarkers,
}: ClusterProps) {
  const map = useMap();
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());

  // Mirror the latest mark sets into refs so the build effect can read
  // the current state on initial render without re-running when the
  // user toggles shortlist/priority/visited. The mark-sync effect below
  // handles updates in place via setIcon + setPopupContent. Refs are
  // kept fresh via a no-dep effect (writing refs during render is
  // disallowed by react-hooks/refs in React 19).
  const shortlistIdsRef = useRef(shortlistIds);
  const priorityIdsRef = useRef(priorityIds);
  const visitedIdsRef = useRef(visitedIds);
  useEffect(() => {
    shortlistIdsRef.current = shortlistIds;
    priorityIdsRef.current = priorityIds;
    visitedIdsRef.current = visitedIds;
  });

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 50,
      // Slightly tighter than default — feels right with ~30 markers spread across Kazakhstan.
      chunkedLoading: true,
    });

    const markers = new Map<string, L.Marker>();

    for (const s of sights) {
      const mark = markStateFor(
        s.id,
        shortlistIdsRef.current,
        priorityIdsRef.current,
        visitedIdsRef.current,
      );
      const marker = L.marker([s.coords.lat, s.coords.lng], {
        icon: makeIcon(categoryMeta[s.category].color, mark),
      });
      marker.bindPopup(popupHtml(s, mark), {
        className: 'sight-popup',
        maxWidth: 280,
        minWidth: 248,
      });
      marker.on('click', () => onSelect(s.id));
      cluster.addLayer(marker);
      markers.set(s.id, marker);
    }

    map.addLayer(cluster);
    markersMapRef.current = markers;
    registerMarkers(cluster, markers);

    return () => {
      map.removeLayer(cluster);
      markersMapRef.current = new Map();
      registerMarkers(cluster, new Map()); // signal cleanup to parent
    };
  }, [sights, map, onSelect, registerMarkers]);

  // Update popup content + marker icon when shortlist/priority/visited
  // membership changes, without rebuilding the cluster (which would
  // flicker + reset spiderfy state). Icon swap re-renders the DivIcon
  // DOM in place.
  useEffect(() => {
    for (const s of sights) {
      const marker = markersMapRef.current.get(s.id);
      if (!marker) continue;
      const mark = markStateFor(s.id, shortlistIds, priorityIds, visitedIds);
      marker.setPopupContent(popupHtml(s, mark));
      marker.setIcon(makeIcon(categoryMeta[s.category].color, mark));
    }
  }, [sights, shortlistIds, priorityIds, visitedIds]);

  return null;
}

interface PanProps {
  sights: Sight[];
  selectedId: string | null;
  clusterRef: React.RefObject<L.MarkerClusterGroup | null>;
  markersRef: React.RefObject<Map<string, L.Marker>>;
}

function PanToSelected({ sights, selectedId, clusterRef, markersRef }: PanProps) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const sight = sights.find((s) => s.id === selectedId);
    if (!sight) return;
    const marker = markersRef.current.get(selectedId);
    const cluster = clusterRef.current;

    if (marker && cluster) {
      // Expand cluster if the marker is hidden behind one.
      cluster.zoomToShowLayer(marker, () => {
        map.flyTo([sight.coords.lat, sight.coords.lng], Math.max(map.getZoom(), 9), {
          duration: 0.6,
        });
        marker.openPopup();
      });
    } else {
      map.flyTo([sight.coords.lat, sight.coords.lng], Math.max(map.getZoom(), 8), {
        duration: 0.6,
      });
    }
  }, [selectedId, sights, map, clusterRef, markersRef]);

  return null;
}

interface Props {
  sights: Sight[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Sight ids currently on the shortlist (any state) — pins get an amber ring. */
  shortlistIds: ReadonlySet<string>;
  /** Subset marked as top picks ("suosikit") — pins gain a ★ glyph. */
  priorityIds: ReadonlySet<string>;
  /** Sight ids marked as visited — pins switch to a ✓ in emerald. */
  visitedIds: ReadonlySet<string>;
}

export default function MapView({
  sights,
  selectedId,
  onSelect,
  shortlistIds,
  priorityIds,
  visitedIds,
}: Props) {
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const registerMarkers = useMemo(
    () => (cluster: L.MarkerClusterGroup, markers: Map<string, L.Marker>) => {
      clusterRef.current = cluster;
      markersRef.current = markers;
    },
    [],
  );

  return (
    <MapContainer
      center={[48.0, 68.0]}
      zoom={5}
      minZoom={3}
      maxZoom={17}
      wheelDebounceTime={100}
      wheelPxPerZoomLevel={80}
      zoomControl={false}
      style={{ height: '100%', width: '100%' }}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={17}
        keepBuffer={4}
        updateWhenZooming={false}
      />
      <MarkerClusterLayer
        sights={sights}
        shortlistIds={shortlistIds}
        priorityIds={priorityIds}
        visitedIds={visitedIds}
        onSelect={onSelect}
        registerMarkers={registerMarkers}
      />
      <PanToSelected
        sights={sights}
        selectedId={selectedId}
        clusterRef={clusterRef}
        markersRef={markersRef}
      />
      <LocateControl />
    </MapContainer>
  );
}
