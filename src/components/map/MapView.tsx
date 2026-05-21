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

function makeIcon(color: string): L.DivIcon {
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

function popupHtml(sight: Sight): string {
  const meta = categoryMeta[sight.category];
  const imageUrl = sight.image ? safeUrl(sight.image) : '';
  const imageAlt = safeAttr(sight.imageAlt ?? sight.name);

  const hero = imageUrl
    ? `<div style="position:relative;height:132px;overflow:hidden;background:#f1ede4">
        <img src="${imageUrl}" alt="${imageAlt}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block" />
        <span style="position:absolute;bottom:8px;left:8px;display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:rgba(15,23,42,0.62);color:#fff;font-size:11px;font-weight:500;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)">
          <span style="display:inline-block;width:6px;height:6px;border-radius:999px;background:${meta.color}"></span>
          <span>${meta.emoji} ${meta.fi}</span>
        </span>
      </div>`
    : `<div style="height:56px;display:flex;align-items:center;justify-content:center;background:${meta.color}1a;color:#1e293b;font-size:13px;font-weight:500;gap:6px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:${meta.color}"></span>
        ${meta.emoji} ${meta.fi}
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
  onSelect: (id: string) => void;
  /** Setter for the marker registry kept by the parent for zoomToShowLayer lookups. */
  registerMarkers: (
    cluster: L.MarkerClusterGroup,
    markers: Map<string, L.Marker>,
  ) => void;
}

function MarkerClusterLayer({ sights, onSelect, registerMarkers }: ClusterProps) {
  const map = useMap();

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
      const marker = L.marker([s.coords.lat, s.coords.lng], {
        icon: makeIcon(categoryMeta[s.category].color),
      });
      marker.bindPopup(popupHtml(s), {
        className: 'sight-popup',
        maxWidth: 280,
        minWidth: 248,
      });
      marker.on('click', () => onSelect(s.id));
      cluster.addLayer(marker);
      markers.set(s.id, marker);
    }

    map.addLayer(cluster);
    registerMarkers(cluster, markers);

    return () => {
      map.removeLayer(cluster);
      registerMarkers(cluster, new Map()); // signal cleanup to parent
    };
  }, [sights, map, onSelect, registerMarkers]);

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
}

export default function MapView({ sights, selectedId, onSelect }: Props) {
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
