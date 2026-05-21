'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { toast } from 'sonner';
import { LocateFixed, LocateOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type LocateStatus = 'idle' | 'locating' | 'located' | 'error';

const PULSE_ICON_HTML = `
<div class="locate-pulse-wrapper">
  <div class="locate-pulse-ring"></div>
  <div class="locate-pulse-dot"></div>
</div>
`;

/**
 * "Show my location" floating action button.
 *
 * Mounted via Leaflet's L.Control API in the bottomright corner so it
 * stacks with attribution naturally and ignores map pan/zoom gestures.
 * The button itself is a React portal into the control's DOM node so we
 * can use shadcn Button + lucide icons without re-implementing styling
 * imperatively.
 *
 * No location is persisted anywhere — neither localStorage nor URL state.
 * Marker + accuracy circle live in Leaflet layer memory only and are
 * cleaned up on unmount or when the user toggles the control off.
 */
export default function LocateControl() {
  const map = useMap();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<LocateStatus>('idle');
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  // Mount a Leaflet control container that we'll portal React into.
  useEffect(() => {
    const control = new L.Control({ position: 'bottomright' });
    control.onAdd = () => {
      const div = L.DomUtil.create('div', 'locate-control-container');
      // Stop map from receiving the gestures that target this control.
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);
      setContainer(div);
      return div;
    };
    control.onRemove = () => {
      setContainer(null);
    };
    control.addTo(map);
    return () => {
      control.remove();
    };
  }, [map]);

  // Wire location events. Listeners outlive any single locate() call so
  // we attach once per map instance.
  useEffect(() => {
    const cleanupLayers = () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (circleRef.current) {
        circleRef.current.remove();
        circleRef.current = null;
      }
    };

    const onFound = (e: L.LocationEvent) => {
      const { latlng, accuracy } = e;
      cleanupLayers();

      const icon = L.divIcon({
        className: 'locate-pulse-icon',
        html: PULSE_ICON_HTML,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      markerRef.current = L.marker(latlng, {
        icon,
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map);
      // Floor the accuracy radius — < 30 m readings give an indistinct
      // dot, and Wi-Fi positioning often reports unrealistic ~5 m values.
      circleRef.current = L.circle(latlng, {
        radius: Math.max(accuracy, 30),
        color: '#2563eb',
        fillColor: '#2563eb',
        fillOpacity: 0.08,
        weight: 1.5,
        opacity: 0.35,
        interactive: false,
      }).addTo(map);

      map.flyTo(latlng, Math.max(map.getZoom(), 13), { duration: 0.6 });
      setStatus('located');
    };

    const onError = (e: L.ErrorEvent) => {
      // Leaflet forwards the underlying GeolocationPositionError.code.
      const code = (e as L.ErrorEvent & { code?: number }).code;
      const message =
        code === 1
          ? 'Anna selaimen käyttää sijaintia asetuksista'
          : code === 3
            ? 'Sijainnin haku aikakatkaisi — kokeile uudelleen'
            : 'Sijaintia ei saatavilla';
      toast.error(message);
      setStatus('error');
    };

    map.on('locationfound', onFound);
    map.on('locationerror', onError);

    return () => {
      map.off('locationfound', onFound);
      map.off('locationerror', onError);
      map.stopLocate();
      cleanupLayers();
    };
  }, [map]);

  const handleClick = () => {
    if (status === 'locating') return;

    if (status === 'located') {
      // Toggle off — clear the dot + circle.
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (circleRef.current) {
        circleRef.current.remove();
        circleRef.current = null;
      }
      map.stopLocate();
      setStatus('idle');
      return;
    }

    setStatus('locating');
    map.locate({
      setView: false, // we control the camera ourselves via flyTo
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000,
      watch: false,
    });
  };

  if (!container) return null;

  const label =
    status === 'located'
      ? 'Piilota sijainti'
      : status === 'locating'
        ? 'Hakee sijaintia…'
        : 'Näytä sijaintini';

  const Icon =
    status === 'locating'
      ? Loader2
      : status === 'located'
        ? LocateOff
        : LocateFixed;

  return createPortal(
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      onClick={handleClick}
      disabled={status === 'locating'}
      className={cn(
        'size-10 rounded-full bg-popover shadow-md ring-1 ring-foreground/10 hover:bg-muted',
        status === 'located' && 'text-primary',
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn('size-5', status === 'locating' && 'animate-spin')}
      />
    </Button>,
    container,
  );
}
