'use client';

import { Suspense, useMemo } from 'react';
import { sights } from '@/data/sights';
import SightCard from '@/components/sights/SightCard';
import FilterBar from '@/components/sights/FilterBar';
import { excludeDrafts, filterByCategories, filterByRegions } from '@/lib/filters';
import { useUrlState } from '@/lib/url-state';
import { sortSights, SORT_LABEL } from '@/lib/sort';
import type { SortDimension } from '@/lib/types';

const SORT_OPTIONS: SortDimension[] = ['default', 'popular', 'interesting', 'unique'];

function NahtavyydetPageInner() {
  const { state, update } = useUrlState();

  const visible = useMemo(() => {
    let result = state.showDrafts ? sights : excludeDrafts(sights);
    result = filterByCategories(result, state.categories);
    result = filterByRegions(result, state.regions);
    result = sortSights(result, state.sort);
    return result;
  }, [state.categories, state.regions, state.showDrafts, state.sort]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Nähtävyydet</h1>
        <p className="text-sm text-(--color-muted)">
          {visible.length} kohdetta. Käytä suodattimia rajataksesi vaihtoehtoja.
        </p>
      </div>

      <FilterBar
        categories={state.categories}
        regions={state.regions}
        onCategoriesChange={(categories) => update({ categories })}
        onRegionsChange={(regions) => update({ regions })}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex min-h-11 items-center gap-2 text-sm text-(--color-muted)">
          <input
            type="checkbox"
            checked={state.showDrafts}
            onChange={(e) => update({ showDrafts: e.target.checked })}
            className="h-5 w-5"
          />
          Näytä myös luonnokset (vahvistamattomat kohteet)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-(--color-muted)">Järjestys:</span>
          <select
            value={state.sort}
            onChange={(e) => update({ sort: e.target.value as SortDimension })}
            className="min-h-11 rounded-md border border-(--color-border) bg-(--color-card) px-3 text-base sm:text-sm"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {SORT_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center text-sm text-(--color-muted)">
          Ei kohteita näillä suodattimilla.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <li key={s.id}>
              <SightCard sight={s} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NahtavyydetPage() {
  return (
    <Suspense fallback={<p className="text-sm text-(--color-muted)">Ladataan…</p>}>
      <NahtavyydetPageInner />
    </Suspense>
  );
}
