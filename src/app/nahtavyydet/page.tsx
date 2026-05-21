'use client';

import { Suspense, useMemo } from 'react';
import { SearchX } from 'lucide-react';
import { m } from 'motion/react';
import { sights } from '@/data/sights';
import SightCard from '@/components/sights/SightCard';
import FilterBar from '@/components/sights/FilterBar';
import { excludeDrafts, filterByCategories, filterByRegions } from '@/lib/filters';
import { useUrlState } from '@/lib/url-state';
import { sortSights, SORT_LABEL } from '@/lib/sort';
import type { SortDimension } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

const SORT_OPTIONS: SortDimension[] = ['default', 'popular', 'interesting', 'unique'];

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
        <p className="text-sm text-muted-foreground">
          {visible.length} kohdetta. Käytä suodattimia rajataksesi vaihtoehtoja.
        </p>
      </div>

      <div className="sticky top-14 z-20 -mx-4 mb-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
        <div className="space-y-3">
          <FilterBar
            categories={state.categories}
            regions={state.regions}
            onCategoriesChange={(categories) => update({ categories })}
            onRegionsChange={(regions) => update({ regions })}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Label
              htmlFor="show-drafts"
              className="min-h-11 text-sm text-muted-foreground"
            >
              <Checkbox
                id="show-drafts"
                checked={state.showDrafts}
                onCheckedChange={(checked) => update({ showDrafts: checked === true })}
              />
              Näytä myös luonnokset (vahvistamattomat kohteet)
            </Label>
            <Label htmlFor="sort-select" className="ml-auto text-sm">
              <span className="text-muted-foreground">Järjestys:</span>
              <Select
                value={state.sort}
                onValueChange={(value) => update({ sort: value as SortDimension })}
              >
                <SelectTrigger id="sort-select" size="default" className="min-h-11">
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
          </div>
        </div>
      </div>

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
            <Button
              variant="outline"
              onClick={() => update({ categories: [], regions: [] })}
            >
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
