import type { SightRatings } from '@/lib/types';

type Dimension = keyof Pick<SightRatings, 'popularity' | 'interest' | 'uniqueness'>;

const LABEL: Record<Dimension, string> = {
  popularity: 'Suosio',
  interest: 'Mielenkiinto',
  uniqueness: 'Erikoisuus',
};

function Stars({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span aria-label={`${clamped} / 5`} className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= clamped ? 'text-(--color-sand-dark)' : 'text-(--color-border)'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function StarRow({
  dimension,
  value,
  compact = false,
}: {
  dimension: Dimension;
  value: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2 ${compact ? 'text-xs' : 'text-sm'}`}
    >
      <span className="text-(--color-muted)">{LABEL[dimension]}</span>
      <span className="inline-flex items-center gap-1">
        <Stars value={value} />
        <span className="text-(--color-muted)">{value}/5</span>
      </span>
    </div>
  );
}

export default function StarRating({
  ratings,
  compact = false,
}: {
  ratings: SightRatings;
  compact?: boolean;
}) {
  return (
    <div className="space-y-1">
      <StarRow dimension="popularity" value={ratings.popularity} compact={compact} />
      <StarRow dimension="interest" value={ratings.interest} compact={compact} />
      <StarRow dimension="uniqueness" value={ratings.uniqueness} compact={compact} />
      {ratings.rationale && !compact && (
        <p className="mt-2 text-xs text-(--color-muted)">{ratings.rationale}</p>
      )}
    </div>
  );
}

export function RatingPlaceholder({ compact = false }: { compact?: boolean }) {
  return (
    <p className={`text-(--color-muted) ${compact ? 'text-xs' : 'text-sm'}`}>
      ⓘ Ei vielä arvosteltu — aja{' '}
      <code>place-rater</code> -agentti.
    </p>
  );
}
