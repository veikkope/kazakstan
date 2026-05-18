import Image from 'next/image';
import { categoryMeta } from '@/data/categories';
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
}: Props) {
  const meta = categoryMeta[sight.category];
  const wrapperClass = `relative ${aspect} w-full overflow-hidden ${className}`;

  if (sight.image) {
    return (
      <div className={wrapperClass}>
        <Image
          src={sight.image}
          alt={sight.imageAlt ?? sight.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {sight.imageAttribution && <AttributionChip attribution={sight.imageAttribution} />}
      </div>
    );
  }

  // Placeholder — visually consistent with the sight's category. Two-tone
  // diagonal gradient (category colour → darker) with the emoji centered.
  return (
    <div
      className={wrapperClass}
      role="img"
      aria-label={`${meta.fi}-kategoria — kuva puuttuu`}
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
  const credit = [attribution.author, attribution.license].filter(Boolean).join(' · ');
  return (
    <a
      href={attribution.sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="absolute bottom-1 right-1 z-10 max-w-[80%] truncate rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white/90 backdrop-blur hover:bg-black/75 hover:text-white hover:no-underline"
      aria-label={`Kuvan lähde: ${attribution.source}${credit ? ` — ${credit}` : ''}`}
    >
      © {credit || attribution.source}
    </a>
  );
}
