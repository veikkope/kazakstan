'use client';

import { Suspense, useCallback, useMemo, useState } from 'react';
import { SearchX, SlidersHorizontal, X } from 'lucide-react';
import { m } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { sights } from '@/data/sights';
import SightCard from '@/components/sights/SightCard';
import SearchInput from '@/components/sights/SearchInput';
import CategoryFilter from '@/components/map/CategoryFilter';
import { regionMeta } from '@/data/categories';
import { filterByCategories, filterByRegions } from '@/lib/filters';
import { filterBySearch } from '@/lib/search';
import { useUrlState } from '@/lib/url-state';
import { sortSights } from '@/lib/sort';
import ScrollMemory from '@/components/layout/ScrollMemory';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Region, SortDimension } from '@/lib/types';
import { Button } from '@/components/ui/button';
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
  'aktau',
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
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const { state, update } = useUrlState();
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const sortLabel = (s: SortDimension): string => {
    switch (s) {
      case 'default':
        return t('pages.sights.sortDefault');
      case 'popular':
        return t('pages.sights.sortPopular');
      case 'interesting':
        return t('pages.sights.sortInteresting');
      case 'unique':
        return t('pages.sights.sortUnique');
    }
  };

  // Stable reference across rerenders — split so the sort/filter
  // chain doesn't redo work on every keystroke.
  const verified = sights;
  const totalCount = verified.length;

  // Filter order matters for cost:
  // 1. category/region — set lookups, O(1) per item, slash dataset early.
  // 2. text search — substring scan, more expensive per item.
  // 3. sort — runs on the smallest possible set.
  const visible = useMemo(() => {
    let result = filterByCategories(verified, state.categories);
    result = filterByRegions(result, state.regions);
    result = filterBySearch(result, state.q);
    result = sortSights(result, state.sort);
    return result;
  }, [verified, state.categories, state.regions, state.q, state.sort]);

  // Stable handler — required so SearchInput's debounce effect doesn't
  // restart its timer on every parent rerender (which would happen as the
  // result count updates and feeds back into the JSX).
  const onSearchChange = useCallback(
    (q: string) => update({ q }),
    [update],
  );

  // Badge sums only what the filter sheet owns — search has its own
  // visible affordance (the input + clear button), so counting it here
  // would double-signal and confuse users who open the sheet expecting
  // to find a toggled chip.
  const activeFilterCount =
    state.categories.length +
    state.regions.length +
    (state.sort !== 'default' ? 1 : 0);

  function toggleRegion(r: Region) {
    if (state.regions.includes(r))
      update({ regions: state.regions.filter((x) => x !== r) });
    else update({ regions: [...state.regions, r] });
  }

  // Sheet-scoped clear: only categories/regions/sort. Used by the desktop
  // "Tyhjennä" link and the mobile sheet footer button — clearing q here
  // would be surprising because the search input isn't in the sheet.
  function clearSheetFilters() {
    update({ categories: [], regions: [], sort: 'default' });
  }

  // Full clear: everything including the query. Used by the empty state
  // "Tyhjennä kaikki" button when both q and filters are active.
  function clearAll() {
    update({ categories: [], regions: [], sort: 'default', q: '' });
  }

  function clearSearch() {
    update({ q: '' });
  }

  const queryActive = state.q.trim().length > 0;
  const hasOtherFilters =
    state.categories.length > 0 ||
    state.regions.length > 0 ||
    state.sort !== 'default';

  return (
    <div className="space-y-5">
      {/* Remembers scroll-Y per pathname so `list → detail → back`
          lands the user where they were. The key is pathname (not full
          URL) so the silent `?sl=` writes from ShortlistUrlSync and the
          `?cat=`/`?sort=` filter updates don't reset the saved position
          mid-session. */}
      <ScrollMemory />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{t('pages.sights.title')}</h1>
        <p className="hidden text-sm text-muted-foreground sm:block">
          {t.rich('pages.sights.subtitle', {
            count: visible.length,
            bold: (chunks) => (
              <span className="font-semibold text-foreground">{chunks}</span>
            ),
          })}
        </p>
      </div>

      {/* Sticky filter bar — sits flush under the Header.
          Mobile header is 48px (top-12), desktop is 56px (top-14).
          Search input is the first child everywhere — it's the most
          frequently used affordance on a 66-item dataset. */}
      <div className="sticky top-12 z-20 -mx-4 space-y-2.5 border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur-md sm:top-14 sm:space-y-3 sm:py-3">
        <SearchInput
          value={state.q}
          onChange={onSearchChange}
          resultCount={visible.length}
          totalCount={totalCount}
        />

        {/* ============ Mobile: result count + filter button ============
            Filter sheet still owns categories/regions/sort — the inline
            chips returned in /kartta but here we keep them tucked away so
            the search input stays the dominant element. */}
        <div className="flex items-center justify-between gap-2 sm:hidden">
          <p className="text-sm text-muted-foreground">
            {t.rich('pages.sights.resultsCountMobile', {
              count: visible.length,
              bold: (chunks) => (
                <span className="font-semibold tabular-nums text-foreground">{chunks}</span>
              ),
            })}
          </p>
          <Button
            type="button"
            variant={activeFilterCount > 0 ? 'default' : 'outline'}
            size="default"
            onClick={() => setFilterSheetOpen(true)}
            aria-label={
              activeFilterCount > 0
                ? t('pages.sights.filterButtonActiveAria', { count: activeFilterCount })
                : t('pages.sights.filterButtonAria')
            }
            className="relative h-10 shrink-0 gap-1.5 px-4"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            <span className="text-sm font-medium">{t('pages.sights.filterButton')}</span>
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
              {t('pages.sights.categoriesHeading')}
            </p>
            <CategoryFilter
              value={state.categories}
              onChange={(categories) => update({ categories })}
              layout="wrap"
            />
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
              {t('pages.sights.regionsHeading')}
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
                {t('pages.sights.allRegions')}
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
                    {localised(regionMeta[r].label, loc)}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Label htmlFor="sort-select-desktop" className="text-sm">
              <span className="text-muted-foreground">{t('pages.sights.sortLabel')}</span>
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
                      {sortLabel(s)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Label>
            {activeFilterCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSheetFilters}
                className="ml-auto text-muted-foreground"
              >
                <X className="size-3.5" aria-hidden />
                {t('pages.sights.clear')}
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
            <SheetTitle>{t('pages.sights.filterSheetTitle')}</SheetTitle>
          </SheetHeader>

          {/* Scrollable section — actions live in a sticky footer so the
              user can always tap "Näytä N" without scrolling back. */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="mx-auto w-full max-w-6xl space-y-5">
              <section className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t('pages.sights.categoriesHeading')}
                </p>
                <CategoryFilter
                  value={state.categories}
                  onChange={(categories) => update({ categories })}
                  layout="wrap"
                />
              </section>

              <section className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t('pages.sights.regionsHeading')}
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
                    {t('pages.sights.allRegions')}
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
                        {localised(regionMeta[r].label, loc)}
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
                  {t('pages.sights.sortHeading')}
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
                        {sortLabel(s)}
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
                onClick={clearSheetFilters}
                className="h-11 flex-1"
                disabled={activeFilterCount === 0}
              >
                {t('pages.sights.clear')}
              </Button>
              <Button
                type="button"
                onClick={() => setFilterSheetOpen(false)}
                className="h-11 flex-[2]"
              >
                {t('pages.sights.showResults', { count: visible.length })}
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
            <EmptyTitle>
              {queryActive
                ? t('pages.sights.emptyTitleQuery', { query: state.q.trim() })
                : t('pages.sights.emptyTitleFilters')}
            </EmptyTitle>
            <EmptyDescription>
              {queryActive && hasOtherFilters
                ? t('pages.sights.emptyDescBoth')
                : queryActive
                  ? t('pages.sights.emptyDescQuery')
                  : t('pages.sights.emptyDescFilters')}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {/* Two-button empty state when both a query and other filters
                are active — lets the user iterate on one dimension at a
                time instead of nuking everything. */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {queryActive && (
                <Button variant="outline" onClick={clearSearch}>
                  {t('pages.sights.clearSearch')}
                </Button>
              )}
              {hasOtherFilters && (
                <Button
                  variant={queryActive ? 'ghost' : 'outline'}
                  onClick={clearAll}
                >
                  {t('pages.sights.clearAll')}
                </Button>
              )}
            </div>
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

function PageFallback() {
  const t = useTranslations();
  // Reserve full viewport height so that if this fallback briefly
  // renders during back-navigation hydration, the document stays tall
  // enough for the browser (and useScrollMemory) to land on the saved
  // Y position. A short fallback would collapse the layout, causing
  // scroll restoration to silently fail and dump the user at the top.
  return (
    <div className="min-h-[100dvh]">
      <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
    </div>
  );
}

export default function NahtavyydetPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <NahtavyydetPageInner />
    </Suspense>
  );
}
