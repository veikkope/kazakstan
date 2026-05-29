'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useCallback, useMemo } from 'react';
import type { Activity, Category, Region, SortDimension } from './types';
import { allActivities, allCategories } from '@/data/categories';
import { isSortDimension } from './sort';

const PARAM = {
  CAT: 'cat',
  REGION: 'region',
  ID: 'id',
  SL: 'sl',
  SORT: 'sort',
  Q: 'q',
  ACT: 'act',
} as const;

const ALL_REGIONS: Region[] = [
  'almaty',
  'almaty-region',
  'astana',
  'turkistan',
  'shymkent',
  'aktau',
  'other',
];

function parseCsv<T extends string>(value: string | null, valid: readonly T[]): T[] {
  if (!value) return [];
  const set = new Set(valid);
  return value
    .split(',')
    .map((v) => v.trim())
    .filter((v): v is T => set.has(v as T));
}

function csvOrNull<T extends string>(values: T[]): string | null {
  return values.length === 0 ? null : values.join(',');
}

export interface UrlState {
  categories: Category[];
  regions: Region[];
  activities: Activity[];
  selectedId: string | null;
  shortlist: string[];
  sort: SortDimension;
  /** Free-text search query. Empty string when unset (mirrors absent param). */
  q: string;
}

export function readUrlState(params: URLSearchParams): UrlState {
  const rawSort = params.get(PARAM.SORT);
  return {
    categories: parseCsv(params.get(PARAM.CAT), allCategories),
    regions: parseCsv(params.get(PARAM.REGION), ALL_REGIONS),
    activities: parseCsv(params.get(PARAM.ACT), allActivities),
    selectedId: params.get(PARAM.ID),
    shortlist: params.get(PARAM.SL)?.split(',').filter(Boolean) ?? [],
    sort: isSortDimension(rawSort) ? rawSort : 'default',
    q: params.get(PARAM.Q) ?? '',
  };
}

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<UrlState>(() => {
    const params = new URLSearchParams(searchParams.toString());
    return readUrlState(params);
  }, [searchParams]);

  const update = useCallback(
    (patch: Partial<UrlState>) => {
      const params = new URLSearchParams(searchParams.toString());

      const apply = (key: string, value: string | null) => {
        if (value === null || value === '') params.delete(key);
        else params.set(key, value);
      };

      if ('categories' in patch && patch.categories) {
        apply(PARAM.CAT, csvOrNull(patch.categories));
      }
      if ('regions' in patch && patch.regions) {
        apply(PARAM.REGION, csvOrNull(patch.regions));
      }
      if ('activities' in patch && patch.activities) {
        apply(PARAM.ACT, csvOrNull(patch.activities));
      }
      if ('selectedId' in patch) {
        apply(PARAM.ID, patch.selectedId ?? null);
      }
      if ('shortlist' in patch && patch.shortlist) {
        apply(PARAM.SL, csvOrNull(patch.shortlist));
      }
      if ('sort' in patch && patch.sort !== undefined) {
        apply(PARAM.SORT, patch.sort === 'default' ? null : patch.sort);
      }
      if ('q' in patch && patch.q !== undefined) {
        // Trim before persisting — keeps URL clean and prevents
        // " " (single space) from being treated as an active filter.
        const trimmed = patch.q.trim();
        apply(PARAM.Q, trimmed === '' ? null : trimmed);
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { state, update };
}
