'use client';

import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import type { Sight } from '@/lib/types';
import { categoryMeta } from '@/data/categories';

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

function popupHtml(sight: Sight): string {
  const meta = categoryMeta[sight.category];
  // Manual escaping for the few fields rendered into innerHTML. Sight content
  // is author-controlled but we still keep this defensive.
  const safe = (s: string) =>
    s.replace(/[&<>"']/g, (c) => {
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
  return `
    <div style="min-width:180px">
      <strong>${safe(sight.name)}</strong>
      <div style="font-size:12px;color:#475569;margin-top:2px">
        ${meta.emoji} ${meta.fi}
      </div>
      <p style="font-size:13px;margin:6px 0 4px;color:#1e293b">${safe(sight.shortDescription)}</p>
      <a href="/nahtavyydet/${sight.slug}">Lue lisää →</a>
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
      marker.bindPopup(popupHtml(s));
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
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
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
    </MapContainer>
  );
}
