'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type MapViewComponent from './MapView';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-(--color-bg) text-sm text-(--color-muted)">
      Ladataan karttaa…
    </div>
  ),
});

export default function MapViewClient(
  props: ComponentProps<typeof MapViewComponent>,
) {
  return <MapView {...props} />;
}
