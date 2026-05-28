'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { Activity, Sight, TripPin, TripPinKind } from '@/lib/types';
import { activityMeta, categoryMeta } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import LocateControl from './LocateControl';

/** Localised string bundle injected into raw-HTML popups. Leaflet popups live
 *  outside React's tree so we can't call `useTranslations` inside them — the
 *  parent reads keys once and passes them down. */
interface PopupLabels {
  readMore: string;
  visited: string;
  favorite: string;
}

interface TripPinLabels {
  rentalCar: string;
  airport: string;
  hotel: string;
  meetingPoint: string;
  readMore: string;
}

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

function makeIcon(color: string, mark: MarkState, activity?: Activity): L.DivIcon {
  if (activity === 'hike') {
    // Emoji-in-circle pin so the researched hike/summit sights stand out
    // from plain category dots. The ring colour still encodes shortlist
    // state (amber = on list / top pick, emerald = visited, white = none).
    const ring =
      mark === 'visited' ? '#10b981' : mark === 'none' ? '#fff' : '#fbbf24';
    return L.divIcon({
      className: '',
      html: `<div style="position:relative;width:1.6rem;height:1.6rem;border-radius:9999px;background:${activityMeta.hike.color};border:2.5px solid ${ring};box-shadow:0 1px 5px rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1" aria-hidden="true">${activityMeta.hike.emoji}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    });
  }
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
      <span style="display:inline-flex;letter-spacing:1px;color:var(--color-sand-dark);font-size:13px;line-height:1">
        ${stars}
      </span>
      <span style="font-size:11px;color:var(--color-muted)">${rating.toFixed(1)}</span>
    </div>
  `;
}

function popupHtml(
  sight: Sight,
  mark: MarkState,
  locale: string,
  labels: PopupLabels,
): string {
  const meta = categoryMeta[sight.category];
  const loc = asLocale(locale);
  const sightName = localised(sight.name, loc);
  const sightShortDesc = localised(sight.shortDescription, loc);
  const categoryLabel = localised(meta.label, loc);
  const imageUrl = sight.image ? safeUrl(sight.image) : '';
  const imageAlt = safeAttr(
    sight.imageAlt ? localised(sight.imageAlt, loc) : sightName,
  );

  const markChip =
    mark === 'visited'
      ? `<span style="position:absolute;top:8px;right:8px;display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;background:rgba(6,78,59,0.85);color:#fff;font-size:11px;font-weight:600;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)">
          <span style="color:#34d399" aria-hidden="true">✓</span>
          ${safeText(labels.visited)}
        </span>`
      : mark === 'priority'
        ? `<span style="position:absolute;top:8px;right:8px;display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;background:rgba(15,23,42,0.62);color:#fff;font-size:11px;font-weight:600;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)">
            <span style="color:#fbbf24" aria-hidden="true">★</span>
            ${safeText(labels.favorite)}
          </span>`
        : '';

  const hero = imageUrl
    ? `<div style="position:relative;height:132px;overflow:hidden;background:var(--color-border)">
        <img src="${imageUrl}" alt="${imageAlt}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block" />
        <span style="position:absolute;bottom:8px;left:8px;display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:rgba(15,23,42,0.62);color:#fff;font-size:11px;font-weight:500;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)">
          <span style="display:inline-block;width:6px;height:6px;border-radius:999px;background:${meta.color}"></span>
          <span>${meta.emoji} ${safeText(categoryLabel)}</span>
        </span>
        ${markChip}
      </div>`
    : `<div style="position:relative;height:56px;display:flex;align-items:center;justify-content:center;background:${meta.color}1a;color:var(--color-fg);font-size:13px;font-weight:500;gap:6px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:${meta.color}"></span>
        ${meta.emoji} ${safeText(categoryLabel)}
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
    <div style="width:248px;font-family:var(--font-geist-sans),system-ui,-apple-system,sans-serif;color:var(--color-fg)">
      ${hero}
      <div style="padding:11px 14px 13px">
        <strong style="display:block;font-size:15px;line-height:1.25;letter-spacing:-0.01em">${safeText(sightName)}</strong>
        ${ratings}
        <p style="font-size:13px;line-height:1.45;margin:8px 0 10px;color:var(--color-muted)">${safeText(sightShortDesc)}</p>
        <a href="/${safeAttr(locale)}/sights/${safeAttr(sight.slug)}" style="display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:var(--color-steppe);text-decoration:none">
          ${safeText(labels.readMore)}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  `;
}

const tripPinVisual: Record<TripPinKind, { emoji: string; color: string }> = {
  'rental-car': { emoji: '🚗', color: '#0ea5e9' },
  airport: { emoji: '✈️', color: '#6366f1' },
  hotel: { emoji: '🛏️', color: '#a855f7' },
  'meeting-point': { emoji: '📍', color: '#f97316' },
};

function tripPinLabelFor(kind: TripPinKind, labels: TripPinLabels): string {
  switch (kind) {
    case 'rental-car':
      return labels.rentalCar;
    case 'airport':
      return labels.airport;
    case 'hotel':
      return labels.hotel;
    case 'meeting-point':
      return labels.meetingPoint;
  }
}

function makeTripIcon(kind: TripPinKind): L.DivIcon {
  const { emoji, color } = tripPinVisual[kind];
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:1.6rem;height:1.6rem;border-radius:9999px;background:${color};border:2.5px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1" aria-hidden="true">${emoji}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

function tripPinPopupHtml(pin: TripPin, _locale: string, labels: TripPinLabels): string {
  const visual = tripPinVisual[pin.kind];
  const label = tripPinLabelFor(pin.kind, labels);
  const subtitle = pin.subtitle
    ? `<p style="font-size:13px;line-height:1.45;margin:6px 0 0;color:var(--color-muted)">${safeText(pin.subtitle)}</p>`
    : '';
  const details = pin.details && pin.details.length > 0
    ? `<ul style="margin:8px 0 0;padding:0;list-style:none;font-size:12px;line-height:1.5;color:var(--color-muted)">
        ${pin.details
          .map(
            (d) =>
              `<li style="padding:2px 0;border-top:1px solid var(--color-border)">${safeText(d)}</li>`,
          )
          .join('')}
      </ul>`
    : '';
  const hrefBlock = pin.href
    ? `<a href="${safeUrl(pin.href)}" style="display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:13px;font-weight:600;color:var(--color-steppe);text-decoration:none">
        ${safeText(pin.hrefLabel ?? labels.readMore)}
        <span aria-hidden="true">→</span>
      </a>`
    : '';
  return `
    <div style="width:240px;font-family:var(--font-geist-sans),system-ui,-apple-system,sans-serif;color:var(--color-fg)">
      <div style="display:flex;align-items:center;gap:6px;padding:10px 14px 6px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:1.4rem;height:1.4rem;border-radius:9999px;background:${visual.color};color:#fff;font-size:13px;line-height:1" aria-hidden="true">${visual.emoji}</span>
        <span style="font-size:11px;font-weight:600;color:var(--color-muted);text-transform:uppercase;letter-spacing:0.04em">${safeText(label)}</span>
      </div>
      <div style="padding:0 14px 13px">
        <strong style="display:block;font-size:14px;line-height:1.3;letter-spacing:-0.01em">${safeText(pin.title)}</strong>
        ${subtitle}
        ${details}
        ${hrefBlock}
      </div>
    </div>
  `;
}

interface TripPinLayerProps {
  pins: TripPin[];
  locale: string;
  labels: TripPinLabels;
}

function TripPinLayer({ pins, locale, labels }: TripPinLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (pins.length === 0) return;
    const layer = L.layerGroup();
    for (const pin of pins) {
      const marker = L.marker([pin.coords.lat, pin.coords.lng], {
        icon: makeTripIcon(pin.kind),
        // Above sight markers so tripPin always wins overlap (24 = default, 1000 = top)
        zIndexOffset: 1000,
      });
      marker.bindPopup(tripPinPopupHtml(pin, locale, labels), {
        className: 'trip-pin-popup',
        maxWidth: 280,
        minWidth: 240,
        // Mobile chrome (filter bar on top, "Lista" FAB on bottom) sits
        // *over* the map canvas, so Leaflet's default autoPan considers
        // the whole canvas visible and lets the popup land behind those
        // overlays. Reserve generous edge padding so the popup always
        // ends up inside the visually clear area. Harmless on desktop
        // (no overlays + larger viewport, autoPan rarely engages).
        autoPanPaddingTopLeft: L.point(12, 130),
        autoPanPaddingBottomRight: L.point(12, 100),
      });
      layer.addLayer(marker);
    }
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer);
    };
  }, [pins, map, locale, labels]);

  return null;
}

interface ClusterProps {
  sights: Sight[];
  shortlistIds: ReadonlySet<string>;
  priorityIds: ReadonlySet<string>;
  visitedIds: ReadonlySet<string>;
  onSelect: (id: string) => void;
  /** Locale prefix for popup "Lue lisää" hrefs — Leaflet popups are raw HTML
      strings outside React's render tree, so we can't use next-intl's <Link>. */
  locale: string;
  /** Localised popup labels — same reason as `locale`: Leaflet popups are
      raw HTML strings, hooks can't run inside them. */
  popupLabels: PopupLabels;
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
  locale,
  popupLabels,
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
        icon: makeIcon(categoryMeta[s.category].color, mark, s.activity),
      });
      marker.bindPopup(popupHtml(s, mark, locale, popupLabels), {
        className: 'sight-popup',
        maxWidth: 280,
        minWidth: 248,
        // See TripPinLayer for the rationale — mobile filter bar (~110 px)
        // and "Lista" FAB (~80 px) overlay the map; without padding the
        // popup top lands behind the filter bar after openPopup.
        autoPanPaddingTopLeft: L.point(12, 130),
        autoPanPaddingBottomRight: L.point(12, 100),
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
  }, [sights, map, onSelect, registerMarkers, locale, popupLabels]);

  // Update popup content + marker icon when shortlist/priority/visited
  // membership changes, without rebuilding the cluster (which would
  // flicker + reset spiderfy state). Icon swap re-renders the DivIcon
  // DOM in place.
  useEffect(() => {
    for (const s of sights) {
      const marker = markersMapRef.current.get(s.id);
      if (!marker) continue;
      const mark = markStateFor(s.id, shortlistIds, priorityIds, visitedIds);
      marker.setPopupContent(popupHtml(s, mark, locale, popupLabels));
      marker.setIcon(makeIcon(categoryMeta[s.category].color, mark, s.activity));
    }
  }, [sights, shortlistIds, priorityIds, visitedIds, locale, popupLabels]);

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

    // Guard so a quick second selection (user taps another pin while the
    // first flyTo is still animating) doesn't open the *previous* popup
    // after this effect's cleanup has already run.
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    const flyAndOpen = (anchor: L.Marker, targetZoom: number) => {
      if (cancelled) return;
      map.flyTo([sight.coords.lat, sight.coords.lng], targetZoom, {
        duration: 0.6,
      });
      // Open the popup AFTER flyTo settles. Opening it concurrently makes
      // Leaflet's autoPan race against the in-flight flyTo: autoPan reads
      // the still-moving viewport, computes a stale adjustment, and the
      // popup ends up partially behind the chrome overlay. Waiting for
      // moveend lets autoPan see the final viewport and pan correctly.
      const onMoveEnd = () => {
        map.off('moveend', onMoveEnd);
        if (cancelled) return;
        anchor.openPopup();
      };
      map.on('moveend', onMoveEnd);
      cleanups.push(() => map.off('moveend', onMoveEnd));
    };

    if (marker && cluster) {
      // Expand cluster if the marker is hidden behind one. zoomToShowLayer
      // animates to the zoom level that breaks the cluster, then fires the
      // callback once that's complete — our flyTo nudges to at least zoom 9
      // and centres the marker.
      cluster.zoomToShowLayer(marker, () => {
        flyAndOpen(marker, Math.max(map.getZoom(), 9));
      });
    } else {
      map.flyTo([sight.coords.lat, sight.coords.lng], Math.max(map.getZoom(), 8), {
        duration: 0.6,
      });
    }

    return () => {
      cancelled = true;
      for (const fn of cleanups) fn();
    };
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
  /** Logistics pins (rental, airport, hotel) — always visible, unaffected by category filter. */
  tripPins?: TripPin[];
}

export default function MapView({
  sights,
  selectedId,
  onSelect,
  shortlistIds,
  priorityIds,
  visitedIds,
  tripPins,
}: Props) {
  // Locale flows into popupHtml so "Lue lisää" hrefs land on the correct
  // /<locale>/sights/<slug> route. Leaflet popups are HTML strings, not
  // React — they sit outside next-intl's <Link> auto-prefix.
  const locale = useLocale();
  const t = useTranslations();
  // Dark mode swaps OSM tiles for Carto's dark basemap. `resolvedTheme`
  // collapses 'system' to the concrete light/dark; undefined pre-mount
  // falls through to the light OSM tiles. The `key` forces the TileLayer
  // to remount on switch so both url and attribution update cleanly.
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  // Bundle strings once per render; memoise so child layer effects only
  // re-run when the locale (and thus the strings) actually changes.
  const popupLabels = useMemo<PopupLabels>(
    () => ({
      readMore: t('components.mapView.readMore'),
      visited: t('components.mapView.visited'),
      favorite: t('components.mapView.favorite'),
    }),
    [t],
  );
  const tripPinLabels = useMemo<TripPinLabels>(
    () => ({
      rentalCar: t('components.mapView.tripPin.rentalCar'),
      airport: t('components.mapView.tripPin.airport'),
      hotel: t('components.mapView.tripPin.hotel'),
      meetingPoint: t('components.mapView.tripPin.meetingPoint'),
      readMore: t('components.mapView.readMore'),
    }),
    [t],
  );
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
        key={isDark ? 'dark' : 'light'}
        attribution={
          isDark
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
        url={
          isDark
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
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
        locale={locale}
        popupLabels={popupLabels}
        registerMarkers={registerMarkers}
      />
      <PanToSelected
        sights={sights}
        selectedId={selectedId}
        clusterRef={clusterRef}
        markersRef={markersRef}
      />
      {tripPins && tripPins.length > 0 && (
        <TripPinLayer pins={tripPins} locale={locale} labels={tripPinLabels} />
      )}
      <LocateControl />
    </MapContainer>
  );
}
