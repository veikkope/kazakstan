'use client';

import CategoryFilter from '@/components/map/CategoryFilter';
import { regionMeta } from '@/data/categories';
import type { Category, Region } from '@/lib/types';

const ALL_REGIONS: Region[] = [
  'almaty',
  'almaty-region',
  'astana',
  'turkistan',
  'shymkent',
  'mangystau',
];

interface Props {
  categories: Category[];
  regions: Region[];
  onCategoriesChange: (next: Category[]) => void;
  onRegionsChange: (next: Region[]) => void;
}

export default function FilterBar({
  categories,
  regions,
  onCategoriesChange,
  onRegionsChange,
}: Props) {
  function toggleRegion(r: Region) {
    if (regions.includes(r)) onRegionsChange(regions.filter((x) => x !== r));
    else onRegionsChange([...regions, r]);
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-(--color-muted)">
          Kategoriat
        </p>
        <CategoryFilter value={categories} onChange={onCategoriesChange} />
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-(--color-muted)">
          Alueet
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onRegionsChange([])}
            aria-pressed={regions.length === 0}
            className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm ${
              regions.length === 0
                ? 'border-(--color-fg) bg-(--color-fg) text-white'
                : 'border-(--color-border) bg-(--color-card)'
            }`}
          >
            Kaikki
          </button>
          {ALL_REGIONS.map((r) => {
            const isOn = regions.includes(r);
            return (
              <button
                key={r}
                type="button"
                onClick={() => toggleRegion(r)}
                aria-pressed={isOn}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm ${
                  isOn
                    ? 'border-(--color-steppe) bg-(--color-steppe) text-white'
                    : 'border-(--color-border) bg-(--color-card) text-(--color-muted)'
                }`}
              >
                {regionMeta[r].fi}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
