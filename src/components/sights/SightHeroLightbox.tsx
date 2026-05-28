'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { asLocale, localised } from '@/lib/i18n-helpers';
import { hapticTap } from '@/lib/haptic';
import type { Sight } from '@/lib/types';
import HeroLightboxDialog from './HeroLightboxDialog';
import SightImage from './SightImage';

// Lightbox is statically imported so the ~18 kB chunk + its stylesheet
// land in the detail page's HTML as a normal script/link reference.
// `offline.ts:discoverAssets()` parses those tags to build the trip
// cache — a lazy `next/dynamic` import would only fetch on first tap and
// stay invisible to the asset crawl, breaking the lightbox on a
// downloaded trip. The dialog itself does not render until `open=true`,
// so the actual DOM cost is still deferred.

interface Props {
  sight: Sight;
  /** Forwarded to SightImage. */
  sizes: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
}

/**
 * Detail-page hero wrapper. When the sight has a real image, the hero
 * becomes a button that opens a pinch-zoomable lightbox; when it's the
 * category placeholder, the lightbox is skipped (nothing to zoom) and
 * the image renders inert.
 *
 * Stays inside the parent's <ViewTransition> so the morph from the
 * thumbnail still lands here — the button is a transparent passthrough,
 * not its own positioned element.
 */
export default function SightHeroLightbox({
  sight,
  sizes,
  priority,
  aspect,
  className,
}: Props) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const [open, setOpen] = useState(false);

  if (!sight.image) {
    return (
      <SightImage
        sight={sight}
        sizes={sizes}
        priority={priority}
        aspect={aspect}
        className={className}
      />
    );
  }

  const sightName = localised(sight.name, loc);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          hapticTap();
          setOpen(true);
        }}
        aria-label={t('components.sightImage.zoomOpenAria', { name: sightName })}
        // `block w-full` so the button fills the same box as the bare
        // SightImage did; `cursor-zoom-in` hints the interaction. The
        // wrapper has no padding/border so the morph snapshot still
        // matches the destination exactly.
        className="block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left"
      >
        <SightImage
          sight={sight}
          sizes={sizes}
          priority={priority}
          aspect={aspect}
          className={className}
        />
      </button>
      {open && <HeroLightboxDialog sight={sight} onClose={() => setOpen(false)} />}
    </>
  );
}
