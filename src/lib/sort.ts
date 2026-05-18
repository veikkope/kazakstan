import type { Sight, SightRatings, SortDimension } from './types';

/** Average of the three rating dimensions, rounded to one decimal. */
export function averageRating(ratings: SightRatings): number {
  const sum = ratings.popularity + ratings.interest + ratings.uniqueness;
  return Math.round((sum / 3) * 10) / 10;
}

/** Returns the highest-scoring dimension and its value (for "stand-out" badges). */
export function topDimension(
  ratings: SightRatings,
): { dim: 'popularity' | 'interest' | 'uniqueness'; value: number } {
  const dims: Array<{ dim: 'popularity' | 'interest' | 'uniqueness'; value: number }> = [
    { dim: 'uniqueness', value: ratings.uniqueness },
    { dim: 'interest', value: ratings.interest },
    { dim: 'popularity', value: ratings.popularity },
  ];
  return dims.reduce((best, cur) => (cur.value > best.value ? cur : best), dims[0]);
}

const RATING_KEY: Record<Exclude<SortDimension, 'default'>, 'popularity' | 'interest' | 'uniqueness'> = {
  popular: 'popularity',
  interesting: 'interest',
  unique: 'uniqueness',
};

export const SORT_LABEL: Record<SortDimension, string> = {
  default: 'Oletus (alueittain)',
  popular: 'Suosituimmat',
  interesting: 'Mielenkiintoisimmat',
  unique: 'Erikoisimmat',
};

export function sortSights(sights: Sight[], dim: SortDimension): Sight[] {
  if (dim === 'default') return sights;
  const key = RATING_KEY[dim];
  // Stable sort: kohteet joilla ei ole arvostelua menevät loppuun.
  return [...sights].sort((a, b) => {
    const av = a.ratings?.[key];
    const bv = b.ratings?.[key];
    if (av === undefined && bv === undefined) return 0;
    if (av === undefined) return 1;
    if (bv === undefined) return -1;
    return bv - av;
  });
}

export function isSortDimension(value: string | null | undefined): value is SortDimension {
  return value === 'default' || value === 'popular' || value === 'interesting' || value === 'unique';
}
