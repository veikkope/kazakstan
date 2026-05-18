'use client';

import { Suspense, useMemo } from 'react';
import MapViewClient from '@/components/map/MapView.client';
import CategoryFilter from '@/components/map/CategoryFilter';
import SightList from '@/components/sights/SightList';
import { sights } from '@/data/sights';
import { excludeDrafts, filterByCategories } from '@/lib/filters';
import { useUrlState } from '@/lib/url-state';

function KarttaPageInner() {
  const { state, update } = useUrlState();

  const visible = useMemo(() => {
    const base = state.showDrafts ? sights : excludeDrafts(sights);
    return filterByCategories(base, state.categories);
  }, [state.categories, state.showDrafts]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Kartta</h1>
        <CategoryFilter
          value={state.categories}
          onChange={(categories) => update({ categories })}
        />
      </div>
      <p className="text-sm text-(--color-muted)">
        {visible.length} kohdetta. Klikkaa pini tai listariviä kun haluat zoomata.
      </p>
      <div className="flex flex-col gap-3 sm:h-[70vh] sm:flex-row">
        <aside className="overflow-y-auto rounded-lg border border-(--color-border) bg-(--color-card) sm:w-80">
          <SightList
            sights={visible}
            selectedId={state.selectedId}
            onSelect={(id) =>
              update({ selectedId: id === state.selectedId ? null : id })
            }
          />
        </aside>
        <div className="h-[60vh] flex-1 overflow-hidden rounded-lg border border-(--color-border) sm:h-auto">
          <MapViewClient
            sights={visible}
            selectedId={state.selectedId}
            onSelect={(id) => update({ selectedId: id })}
          />
        </div>
      </div>
    </div>
  );
}

export default function KarttaPage() {
  return (
    <Suspense fallback={<p className="text-sm text-(--color-muted)">Ladataan…</p>}>
      <KarttaPageInner />
    </Suspense>
  );
}
