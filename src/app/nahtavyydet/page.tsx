'use client';

import { Suspense, useMemo, useState } from 'react';
import { SearchX, SlidersHorizontal, X } from 'lucide-react';
import { m } from 'motion/react';
import { sights } from '@/data/sights';
import SightCard from '@/components/sights/SightCard';
import CategoryFilter from '@/components/map/CategoryFilter';
import { regionMeta } from '@/data/categories';
import { excludeDrafts, filterByCategories, filterByRegions } from '@/lib/filters';
import { useUrlState } from '@/lib/url-state';
import { sortSights, SORT_LABEL } from '@/lib/sort';
import type { Region, SortDimension } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const SORT_OPTIONS: SortDimension[] = ['default', 'popular', 'interesting', 'unique'];

const ALL_REGIONS: Region[] = [
  'almaty',
  'almaty-region',
  'astana',
  'turkistan',
  'shymkent',
  'mangystau',
];

/**
 * Grid-level stagger orchestration.
 *
 * Parent (`m.ul`) holds `initial`/`animate` + `staggerChildren`. Each `m.li`
 * inherits the variant state from the parent; SightCard's inner `m.div`
 * also defines matching variants so the fade+lift animates while the
 * parent's stagger spaces out each card by 40ms. `re-key` on filter change
 * re-triggers the stagger when the visible set changes — keep this in mind
 * if perf becomes an issue with very large grids.
 */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function NahtavyydetPageInner() {
  const { state, update } = useUrlState();
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const visible = useMemo(() => {
    let result = excludeDrafts(sights);
    result = filterByCategories(result, state.categories);
    result = filterByRegions(result, state.regions);
    result = sortSights(result, state.sort);
    return result;
  }, [state.categories, state.regions, state.sort]);

  // All filters now live behind the mobile sheet — horizontal-scrolling
  // chips at the top were hard to operate. The badge sums everything:
  // categories + regions + non-default sort.
  const activeFilterCount =
    state.categories.length +
    state.regions.length +
    (state.sort !== 'default' ? 1 : 0);

  function toggleRegion(r: Region) {
    if (state.regions.includes(r))
      update({ regions: state.regions.filter((x) => x !== r) });
    else update({ regions: [...state.regions, r] });
  }

  function clearAllFilters() {
    update({ categories: [], regions: [], sort: 'default' });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Nähtävyydet</h1>
        <p className="hidden text-sm text-muted-foreground sm:block">
          <span className="font-semibold text-foreground">{visible.length}</span>{' '}
          kohdetta. Käytä suodattimia rajataksesi vaihtoehtoja.
        </p>
      </div>

      {/* Sticky filter bar — sits flush under the Header.
          Mobile header is 48px (top-12), desktop is 56px (top-14). */}
      <div className="sticky top-12 z-20 -mx-4 border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur-md sm:top-14 sm:py-3">
        {/* ============ Mobile: result count + filter button ============
            No inline chips — horizontal scroll at the top was hostile UX.
            Everything (categories, regions, sort) is now in the sheet
            so the sticky bar stays small and quiet. */}
        <div className="flex items-center justify-between gap-2 sm:hidden">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold tabular-nums text-foreground">
              {visible.length}
            </span>{' '}
            kohdetta
          </p>
          <Button
            type="button"
            variant={activeFilterCount > 0 ? 'default' : 'outline'}
            size="default"
            onClick={() => setFilterSheetOpen(true)}
            aria-label={
              activeFilterCount > 0
                ? `Suodattimet — ${activeFilterCount} aktiivinen`
                : 'Suodattimet'
            }
            className="relative h-10 shrink-0 gap-1.5 px-4"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            <span className="text-sm font-medium">Suodata</span>
            {activeFilterCount > 0 && (
              <span
                aria-hidden
                className="flex size-5 items-center justify-center rounded-full bg-primary-foreground/20 text-[11px] font-semibold tabular-nums"
              >
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* ============ Desktop: full inline filters ============ */}
        <div className="hidden space-y-3 sm:block">
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
              Kategoriat
            </p>
            <CategoryFilter
              value={state.categories}
              onChange={(categories) => update({ categories })}
              layout="wrap"
            />
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
              Alueet
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={state.regions.length === 0 ? 'default' : 'outline'}
                size="sm"
                onClick={() => update({ regions: [] })}
                aria-pressed={state.regions.length === 0}
                className="min-h-9 rounded-full px-4"
              >
                Kaikki
              </Button>
              {ALL_REGIONS.map((r) => {
                const isOn = state.regions.includes(r);
                return (
                  <Button
                    key={r}
                    type="button"
                    variant={isOn ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleRegion(r)}
                    aria-pressed={isOn}
                    className="min-h-9 rounded-full px-4"
                  >
                    {regionMeta[r].fi}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Label htmlFor="sort-select-desktop" className="text-sm">
              <span className="text-muted-foreground">Järjestys:</span>
              <Select
                value={state.sort}
                onValueChange={(value) =>
                  update({ sort: value as SortDimension })
                }
              >
                <SelectTrigger id="sort-select-desktop" size="sm" className="min-h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {SORT_LABEL[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Label>
            {(state.categories.length > 0 ||
              state.regions.length > 0 ||
              state.sort !== 'default') && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="ml-auto text-muted-foreground"
              >
                <X className="size-3.5" aria-hidden />
                Tyhjennä
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet — categories first (most frequently changed),
          regions below, sort last. Sticky footer keeps the primary actions
          in reach even when the content is long. */}
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85dvh] rounded-t-2xl pb-0 sm:hidden"
        >
          <SheetHeader>
            <SheetTitle>Suodattimet</SheetTitle>
          </SheetHeader>

          {/* Scrollable section — actions live in a sticky footer so the
              user can always tap "Näytä N" without scrolling back. */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="mx-auto w-full max-w-6xl space-y-5">
              <section className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Kategoriat
                </p>
                <CategoryFilter
                  value={state.categories}
                  onChange={(categories) => update({ categories })}
                  layout="wrap"
                />
              </section>

              <section className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Alueet
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={state.regions.length === 0 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => update({ regions: [] })}
                    aria-pressed={state.regions.length === 0}
                    className="min-h-11 rounded-full px-4"
                  >
                    Kaikki
                  </Button>
                  {ALL_REGIONS.map((r) => {
                    const isOn = state.regions.includes(r);
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
              </section>

              <section className="space-y-2">
                <Label
                  htmlFor="sort-select-mobile"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Järjestys
                </Label>
                <Select
                  value={state.sort}
                  onValueChange={(value) =>
                    update({ sort: value as SortDimension })
                  }
                >
                  <SelectTrigger id="sort-select-mobile" className="min-h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {SORT_LABEL[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>
            </div>
          </div>

          {/* Sticky action footer */}
          <div className="border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex w-full max-w-6xl gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={clearAllFilters}
                className="h-11 flex-1"
                disabled={activeFilterCount === 0}
              >
                Tyhjennä
              </Button>
              <Button
                type="button"
                onClick={() => setFilterSheetOpen(false)}
                className="h-11 flex-[2]"
              >
                Näytä {visible.length} kohdetta
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {visible.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX />
            </EmptyMedia>
            <EmptyTitle>Ei kohteita näillä suodattimilla</EmptyTitle>
            <EmptyDescription>
              Kokeile poistaa kategoria- tai alue-suodattimia.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={clearAllFilters}>
              Tyhjennä suodattimet
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <m.ul
          key={visible.map((s) => s.id).join(',')}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((s) => (
            <m.li key={s.id} variants={itemVariants}>
              <SightCard sight={s} />
            </m.li>
          ))}
        </m.ul>
      )}
    </div>
  );
}

export default function NahtavyydetPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Ladataan…</p>}>
      <NahtavyydetPageInner />
    </Suspense>
  );
}
