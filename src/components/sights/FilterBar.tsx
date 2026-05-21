'use client';

import { Button } from '@/components/ui/button';
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

/**
 * Region chips use <Button> (not <Badge>) because they are interactive toggle
 * controls — clicking changes filter state. Badges are reserved for
 * non-interactive status decoration in this codebase.
 */
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

  const allSelected = regions.length === 0;

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
          <Button
            type="button"
            variant={allSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => onRegionsChange([])}
            aria-pressed={allSelected}
            className="min-h-11 rounded-full px-4"
          >
            Kaikki
          </Button>
          {ALL_REGIONS.map((r) => {
            const isOn = regions.includes(r);
            return (
              <Button
                key={r}
                type="button"
                variant={isOn ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleRegion(r)}
                aria-pressed={isOn}
                className="min-h-11 rounded-full px-4"
              >
                {regionMeta[r].fi}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
