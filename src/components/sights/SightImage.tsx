'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { categoryMeta } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Sight } from '@/lib/types';

interface Props {
  sight: Sight;
  /** Forwarded to next/image. Required for responsive optimization. */
  sizes: string;
  /** Render priority for above-the-fold detail headers. */
  priority?: boolean;
  /** Tailwind aspect-ratio class for the wrapper. */
  aspect?: string;
  /** Extra classes appended to the wrapper. */
  className?: string;
  /**
   * Show the CC-BY attribution chip when the sight has imageAttribution.
   * Defaults to true. Disable for thumbnails wrapped in a Link (avoids
   * nested-anchor HTML) — the detail page surfaces the credit instead.
   */
  showAttribution?: boolean;
}

/**
 * Hero image for a sight. Renders next/image when sight.image is set, otherwise
 * a category-coloured gradient placeholder with the category emoji. Always
 * occupies a fixed aspect ratio so layout doesn't shift while images load.
 *
 * When sight.imageAttribution is present, a small clickable credit chip is
 * rendered in the bottom-right corner — required by CC-BY-style licences.
 */
export default function SightImage({
  sight,
  sizes,
  priority,
  aspect = 'aspect-[4/3]',
  className = '',
  showAttribution = true,
}: Props) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const meta = categoryMeta[sight.category];
  const wrapperClass = `relative ${aspect} w-full overflow-hidden ${className}`;

  if (sight.image) {
    return (
      <div className={wrapperClass}>
        <Image
          src={sight.image}
          alt={
            sight.imageAlt
              ? localised(sight.imageAlt, loc)
              : localised(sight.name, loc)
          }
          fill
          sizes={sizes}
          priority={priority}
          // Served unoptimized: the /_next/image optimizer is a server route
          // that doesn't exist offline, so an optimized image that wasn't
          // pre-fetched would break on the trip. Unoptimized requests the
          // stable same-origin /images/sights/<slug>.jpg URL, which the
          // service worker can precache and serve offline. Originals are
          // size-capped at build (scripts/optimize-sight-images.mjs).
          unoptimized
          className="object-cover"
        />
        {showAttribution && sight.imageAttribution && (
          <AttributionChip attribution={sight.imageAttribution} />
        )}
      </div>
    );
  }

  // Placeholder — visually consistent with the sight's category. Two-tone
  // diagonal gradient (category colour → darker) with the emoji centered.
  return (
    <div
      className={wrapperClass}
      role="img"
      aria-label={t('components.sightImage.placeholderAria', { category: localised(meta.label, loc) })}
      style={{
        background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.color}cc 60%, #1e293b 140%)`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-5xl drop-shadow-md sm:text-6xl" aria-hidden>
          {meta.emoji}
        </span>
      </div>
    </div>
  );
}

function AttributionChip({
  attribution,
}: {
  attribution: NonNullable<Sight['imageAttribution']>;
}) {
  const t = useTranslations();
  const credit = [attribution.author, attribution.license].filter(Boolean).join(' · ');
  const ariaLabel = credit
    ? t('components.sightImage.attributionAriaWithCredit', {
        source: attribution.source,
        credit,
      })
    : t('components.sightImage.attributionAria', { source: attribution.source });
  return (
    <a
      href={attribution.sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="absolute bottom-1 right-1 z-10 max-w-[80%] truncate rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white/90 backdrop-blur hover:bg-black/75 hover:text-white hover:no-underline"
      aria-label={ariaLabel}
    >
      © {credit || attribution.source}
    </a>
  );
}
