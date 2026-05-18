'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

interface Props {
  sights: Sight[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function PanToSelected({ sights, selectedId }: Pick<Props, 'sights' | 'selectedId'>) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const s = sights.find((x) => x.id === selectedId);
    if (s) {
      map.flyTo([s.coords.lat, s.coords.lng], Math.max(map.getZoom(), 8), {
        duration: 0.6,
      });
    }
  }, [selectedId, sights, map]);
  return null;
}

export default function MapView({ sights, selectedId, onSelect }: Props) {
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
      {sights.map((s) => (
        <Marker
          key={s.id}
          position={[s.coords.lat, s.coords.lng]}
          icon={makeIcon(categoryMeta[s.category].color)}
          eventHandlers={{ click: () => onSelect(s.id) }}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{s.name}</strong>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                {categoryMeta[s.category].emoji} {categoryMeta[s.category].fi}
              </div>
              <p style={{ fontSize: 13, margin: '6px 0 4px' }}>{s.shortDescription}</p>
              <a href={`/nahtavyydet/${s.slug}`}>Lue lisää →</a>
            </div>
          </Popup>
        </Marker>
      ))}
      <PanToSelected sights={sights} selectedId={selectedId} />
    </MapContainer>
  );
}
