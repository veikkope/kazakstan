'use client';

import { useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { useLocale, useTranslations } from 'next-intl';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Sight } from '@/lib/types';

interface Props {
  sight: Sight;
  onClose: () => void;
}

/**
 * Loaded lazily by SightHeroLightbox the first time the user taps the
 * hero image — keeps the ~18 kB lightbox + zoom plugin out of the
 * initial detail-page bundle. The library handles pinch-zoom, double-tap,
 * panning, drag-to-dismiss and keyboard nav out of the box.
 *
 * Only mounts when `sight.image` is set. Placeholder-emoji sights skip
 * the wrapper entirely from the parent.
 */
export default function HeroLightboxDialog({ sight, onClose }: Props) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  // Body scroll-lock while the lightbox is open. The library doesn't do
  // this itself in our setup and an unlocked body causes the underlying
  // detail page to scroll when the user pans inside the zoomed photo.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!sight.image) return null;

  const alt = sight.imageAlt
    ? localised(sight.imageAlt, loc)
    : localised(sight.name, loc);

  return (
    <Lightbox
      open
      close={onClose}
      slides={[{ src: sight.image, alt }]}
      // Single-image lightbox — hide the chrome we'd only need for galleries.
      carousel={{ finite: true }}
      render={{ buttonPrev: () => null, buttonNext: () => null }}
      plugins={[Zoom]}
      zoom={{
        maxZoomPixelRatio: 4,
        zoomInMultiplier: 1.5,
        doubleTapDelay: 280,
        doubleClickDelay: 280,
        wheelZoomDistanceFactor: 100,
        pinchZoomDistanceFactor: 100,
      }}
      labels={{
        Close: t('components.sightImage.zoomCloseAria'),
        'Zoom in': t('components.sightImage.zoomInAria'),
        'Zoom out': t('components.sightImage.zoomOutAria'),
      }}
      styles={{
        // Match the app's dark scrim instead of the library's default black.
        container: { backgroundColor: 'rgba(0, 0, 0, 0.92)' },
      }}
    />
  );
}
