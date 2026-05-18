import type { SightRatings } from '@/lib/types';
import { averageRating, topDimension } from '@/lib/sort';

const TOP_LABEL = {
  popularity: { fi: 'Suosittu', emoji: '🔥' },
  interest: { fi: 'Sisältörikas', emoji: '🎯' },
  uniqueness: { fi: 'Erikoinen', emoji: '✨' },
} as const;

function FractionStars({ value, size }: { value: number; size: 'sm' | 'lg' }) {
  // Render 5 stars with partial fill based on value (0–5).
  const fillPct = Math.max(0, Math.min(5, value)) / 5;
  const sizeClass = size === 'lg' ? 'text-xl' : 'text-sm';
  return (
    <span className={`relative inline-block leading-none ${sizeClass}`} aria-hidden="true">
      <span className="text-(--color-border)">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden text-(--color-sand-dark)"
        style={{ width: `${fillPct * 100}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

interface Props {
  ratings: SightRatings;
  size?: 'sm' | 'lg';
  showBadge?: boolean;
}

export default function OverallStars({ ratings, size = 'sm', showBadge = true }: Props) {
  const avg = averageRating(ratings);
  const top = topDimension(ratings);
  const showStandout = showBadge && top.value >= 5;
  const standoutLabel = TOP_LABEL[top.dim];

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 ${
        size === 'lg' ? 'text-base' : 'text-xs'
      }`}
      aria-label={`Keskiarvo ${avg} viidestä`}
    >
      <FractionStars value={avg} size={size} />
      <span className={`font-semibold ${size === 'lg' ? 'text-lg' : ''}`}>
        {avg.toFixed(1)}
      </span>
      <span className="text-(--color-muted)">/ 5</span>
      {showStandout && (
        <span
          className={`rounded-full bg-(--color-sand) px-2 py-0.5 font-medium text-(--color-fg) ${
            size === 'lg' ? 'text-xs' : 'text-[10px]'
          }`}
          title={`${standoutLabel.fi} — paras ulottuvuus 5/5`}
        >
          {standoutLabel.emoji} {standoutLabel.fi}
        </span>
      )}
    </div>
  );
}
