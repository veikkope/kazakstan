'use client';

import { Suspense, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { sights } from '@/data/sights';
import { categoryMeta, regionMeta } from '@/data/categories';
import { findById } from '@/lib/filters';
import { addShortlistEntry, useShortlist } from '@/lib/shortlist';
import { toast } from 'sonner';
import SightImage from '@/components/sights/SightImage';
import { shareUrl } from '@/lib/share';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Locale, Region, ShortlistEntry, Sight } from '@/lib/types';
import {
  GMAPS_MAX_STOPS,
  orderRoute,
  type RoutePoint,
} from '@/lib/route';
import NavigateMenu from '@/components/navigation/NavigateMenu';
import { Check, Heart, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

const VISITED_FORMATTER = new Intl.DateTimeFormat('fi-FI', {
  day: 'numeric',
  month: 'numeric',
});

function formatVisitedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return VISITED_FORMATTER.format(d);
}

// Region display order matches the rest of the app (url-state.ts ALL_REGIONS,
// regionMeta key order). Sorting by population/relevance here would diverge
// from the filter menus and confuse users who already learnt the ordering.
const REGION_ORDER: Region[] = [
  'almaty',
  'almaty-region',
  'astana',
  'turkistan',
  'shymkent',
  'aktau',
  'other',
];

interface GroupedEntry {
  entry: ShortlistEntry;
  sight: Sight;
}

/**
 * Within a region, surface the user's intent: priorities float to the top,
 * then unvisited (the candidates for "today's route"), then visited at the
 * bottom (de-emphasised but kept for trip-review browsing).
 */
function sortEntriesForDisplay(
  items: GroupedEntry[],
  loc: Locale,
): GroupedEntry[] {
  return [...items].sort((a, b) => {
    const aVisited = a.entry.visitedAt ? 1 : 0;
    const bVisited = b.entry.visitedAt ? 1 : 0;
    if (aVisited !== bVisited) return aVisited - bVisited;
    const aPrio = a.entry.priority ? 0 : 1;
    const bPrio = b.entry.priority ? 0 : 1;
    if (aPrio !== bPrio) return aPrio - bPrio;
    return localised(a.sight.name, loc).localeCompare(
      localised(b.sight.name, loc),
      loc,
    );
  });
}

function groupShortlistByRegion(
  entries: readonly ShortlistEntry[],
  loc: Locale,
): Map<Region, GroupedEntry[]> {
  const buckets = new Map<Region, GroupedEntry[]>();
  for (const entry of entries) {
    const sight = findById(sights, entry.sightId);
    if (!sight) continue;
    const existing = buckets.get(sight.region);
    if (existing) existing.push({ entry, sight });
    else buckets.set(sight.region, [{ entry, sight }]);
  }
  const sorted = new Map<Region, GroupedEntry[]>();
  for (const [region, arr] of buckets) {
    sorted.set(region, sortEntriesForDisplay(arr, loc));
  }
  return sorted;
}

/**
 * Segmented progress bar. One tile per shortlist entry — so the bar
 * visibly grows as the user saves more places, and fills with emerald
 * as they tick off visits. Priority entries glow amber until visited.
 * Hidden when the shortlist is empty (the page-level Empty state
 * already handles that case).
 */
function ShortlistProgress({
  entries,
}: {
  entries: readonly ShortlistEntry[];
}) {
  const t = useTranslations();
  if (entries.length === 0) return null;

  const total = entries.length;
  const visited = entries.filter((e) => e.visitedAt).length;
  const priorityTotal = entries.filter((e) => e.priority).length;
  const priorityVisited = entries.filter(
    (e) => e.priority && e.visitedAt,
  ).length;
  const percent = Math.round((visited / total) * 100);
  const complete = visited === total;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3 sm:px-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2
              className={cn(
                'text-sm font-semibold tracking-tight',
                complete && 'text-emerald-700 dark:text-emerald-400',
              )}
            >
              {complete
                ? t('pages.shortlist.progressComplete')
                : t('pages.shortlist.progressInProgress')}
            </h2>
            <p className="text-xs tabular-nums text-muted-foreground">
              <span className="font-semibold text-foreground">{visited}</span>
              {' / '}
              {total} {t('pages.shortlist.progressVisitedLabel')}
              {priorityTotal > 0 && (
                <>
                  {' · '}
                  <span className="text-amber-600 dark:text-amber-400">
                    {priorityVisited}/{priorityTotal}
                  </span>{' '}
                  {t('pages.shortlist.progressPriorityLabel')}
                </>
              )}
            </p>
          </div>
          <p
            className={cn(
              'shrink-0 text-4xl font-bold leading-none tracking-tight tabular-nums sm:text-5xl',
              'bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent',
              'dark:from-emerald-400 dark:to-emerald-600',
            )}
            aria-hidden
          >
            {percent}
            <span className="ml-0.5 align-top text-base font-semibold text-emerald-600/80 sm:text-lg dark:text-emerald-400/80">
              %
            </span>
          </p>
        </div>

        <div
          className="flex flex-wrap gap-1"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={visited}
          aria-label={t('pages.shortlist.progressAria', {
            visited,
            total,
            percent,
          })}
        >
          {entries.map((entry) => {
            const isVisited = Boolean(entry.visitedAt);
            const isPriority = !isVisited && Boolean(entry.priority);
            return (
              <span
                key={entry.sightId}
                aria-hidden
                className={cn(
                  'h-2 min-w-[14px] flex-1 rounded-full transition-colors duration-300',
                  isVisited
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-sm shadow-emerald-500/30 dark:from-emerald-500 dark:to-emerald-700'
                    : isPriority
                      ? 'bg-amber-200 ring-1 ring-amber-400/60 dark:bg-amber-900/40 dark:ring-amber-500/50'
                      : 'bg-muted-foreground/15',
                )}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

interface RegionSectionProps {
  region: Region;
  items: GroupedEntry[];
  selectedIds: ReadonlySet<string>;
  onToggleSelected: (sightId: string) => void;
  onSelectAll: (region: Region, ids: string[]) => void;
  onClearSelection: (region: Region) => void;
  onTogglePriority: (sightId: string, next: boolean) => void;
  onToggleVisited: (sightId: string, next: boolean) => void;
  onRemove: (entry: ShortlistEntry, sightName: string) => void;
}

function RegionSection({
  region,
  items,
  selectedIds,
  onToggleSelected,
  onSelectAll,
  onClearSelection,
  onTogglePriority,
  onToggleVisited,
  onRemove,
}: RegionSectionProps) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const meta = regionMeta[region];
  const regionLabel = localised(meta.label, loc);
  const regionSubtitle = meta.subtitle ? localised(meta.subtitle, loc) : undefined;
  const selectableIds = useMemo(
    () => items.filter((g) => !g.entry.visitedAt).map((g) => g.sight.id),
    [items],
  );
  const selectedItems = useMemo(
    () => items.filter((g) => selectedIds.has(g.sight.id)),
    [items, selectedIds],
  );
  const selectedInRegion = selectedItems.length;
  const allSelectableSelected =
    selectableIds.length > 0 &&
    selectableIds.every((id) => selectedIds.has(id));
  const overLimit = selectedInRegion > GMAPS_MAX_STOPS;
  const isAktau = region === 'aktau';

  // Pre-order points so NavigateMenu's URL builders embed the optimised path
  // directly into the <a href>. Recomputed only when selection changes —
  // orderRoute is O(2^n · n²) for n ≤ 10, which is microseconds in practice.
  const orderedPoints: readonly RoutePoint[] = useMemo(() => {
    if (selectedItems.length === 0 || overLimit) return [];
    const pts: RoutePoint[] = selectedItems.map((g) => ({
      id: g.sight.id,
      coords: g.sight.coords,
      label: localised(g.sight.name, loc),
    }));
    return orderRoute(pts).points;
  }, [selectedItems, overLimit, loc]);

  const routeButtonText =
    selectedInRegion === 0
      ? t('pages.shortlist.routeButtonEmpty')
      : t('pages.shortlist.routeButtonWithCount', { count: selectedInRegion });

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight">
            {regionLabel}{' '}
            <span className="font-normal text-muted-foreground">
              ({items.length})
            </span>
          </h2>
          {regionSubtitle && (
            <p className="text-xs text-muted-foreground">{regionSubtitle}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {selectableIds.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="min-h-9 text-xs"
              onClick={() =>
                allSelectableSelected
                  ? onClearSelection(region)
                  : onSelectAll(region, selectableIds)
              }
            >
              {allSelectableSelected
                ? t('pages.shortlist.clearSelection')
                : t('pages.shortlist.selectAll')}
            </Button>
          )}
          {orderedPoints.length > 0 ? (
            <NavigateMenu
              points={orderedPoints}
              region={region}
              size="sm"
              triggerText={routeButtonText}
              align="end"
              className="min-h-9 bg-(--color-steppe) text-white hover:bg-(--color-steppe-dark)"
            />
          ) : (
            // No selection / over-limit → render a visually matching disabled
            // button so the layout doesn't collapse. NavigateMenu mounts with
            // points only; this stub avoids passing an empty array.
            <Button
              type="button"
              size="sm"
              disabled
              className="min-h-9 bg-(--color-steppe) text-white opacity-60"
            >
              {routeButtonText}
            </Button>
          )}
        </div>
      </div>

      {overLimit && (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          {t('pages.shortlist.overLimitWarning', { max: GMAPS_MAX_STOPS })}
        </p>
      )}

      {isAktau && (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          {t.rich('pages.shortlist.aktauWarning', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map(({ entry, sight }) => {
          const cat = categoryMeta[sight.category];
          const isVisited = Boolean(entry.visitedAt);
          const isPriority = Boolean(entry.priority);
          const isSelected = selectedIds.has(sight.id);
          const sightName = localised(sight.name, loc);
          const sightShort = localised(sight.shortDescription, loc);
          const catLabel = localised(cat.label, loc);
          // Visited entries shouldn't normally land in today's route — but
          // we don't *block* re-visits, just keep them unchecked unless the
          // user actively flips the checkbox.
          return (
            <li key={entry.sightId}>
              <Card
                size="sm"
                className={cn(
                  'transition-colors',
                  isSelected &&
                    'ring-2 ring-(--color-steppe) ring-offset-2 ring-offset-background',
                  isVisited && 'opacity-70',
                )}
              >
                <CardContent>
                  <div className="flex gap-3">
                    {/* Selection checkbox — large hit target on mobile. */}
                    <label
                      className="flex shrink-0 cursor-pointer items-center justify-center self-start pt-1"
                      aria-label={
                        isSelected
                          ? t('pages.shortlist.deselectAria', { name: sightName })
                          : t('pages.shortlist.selectAria', { name: sightName })
                      }
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onToggleSelected(sight.id)}
                        className="size-5"
                      />
                    </label>
                    <Link
                      href={`/sights/${sight.slug}`}
                      aria-label={sightName}
                      className="size-20 shrink-0 overflow-hidden rounded-md sm:size-24"
                    >
                      <SightImage
                        sight={sight}
                        sizes="96px"
                        aspect="aspect-square"
                        showAttribution={false}
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/sights/${sight.slug}`}
                            className="line-clamp-1 font-medium text-foreground hover:no-underline"
                          >
                            {sightName}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {cat.emoji} {catLabel}
                            {isVisited && entry.visitedAt && (
                              <>
                                {' · '}
                                <span className="text-emerald-600 dark:text-emerald-400">
                                  {t('pages.shortlist.visitedOn', {
                                    date: formatVisitedDate(entry.visitedAt),
                                  })}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-lg"
                          onClick={() => onRemove(entry, sightName)}
                          aria-label={t('pages.shortlist.removeAria')}
                          className="-mr-1.5 -mt-1.5 size-11 shrink-0 text-muted-foreground hover:text-foreground"
                        >
                          ✕
                        </Button>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {sightShort}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      type="button"
                      variant={isPriority ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onTogglePriority(sight.id, !isPriority)}
                      aria-pressed={isPriority}
                      className={cn(
                        'min-h-11 px-3 text-sm',
                        isPriority &&
                          'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400/40 dark:bg-amber-500 dark:hover:bg-amber-400',
                      )}
                    >
                      <Star
                        className={cn('size-4', isPriority && 'fill-current')}
                        aria-hidden
                      />
                      {t('pages.shortlist.priorityLabel')}
                    </Button>
                    <Button
                      type="button"
                      variant={isVisited ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onToggleVisited(sight.id, !isVisited)}
                      aria-pressed={isVisited}
                      className={cn(
                        'min-h-11 px-3 text-sm',
                        isVisited &&
                          'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500/40 dark:bg-emerald-600 dark:hover:bg-emerald-500',
                      )}
                    >
                      <Check
                        className="size-4"
                        strokeWidth={isVisited ? 3 : 2}
                        aria-hidden
                      />
                      {t('pages.shortlist.visitedLabel')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ShortlistPageInner() {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const { entries, hydrated, setPriority, setVisited, remove, clear } =
    useShortlist();
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  );
  // Selection of "today's route" — ephemeral. Not persisted to URL or
  // localStorage because it only matters in the current session.
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function handleRemove(entry: ShortlistEntry, sightName: string) {
    remove(entry.sightId);
    // Also drop from selection so the count stays in sync with the visible list.
    setSelectedIds((prev) => {
      if (!prev.has(entry.sightId)) return prev;
      const next = new Set(prev);
      next.delete(entry.sightId);
      return next;
    });
    toast(t('pages.shortlist.removedToast', { name: sightName }), {
      action: {
        label: t('pages.shortlist.undo'),
        onClick: () => addShortlistEntry(entry),
      },
      duration: 6000,
    });
  }

  function handleClearAll() {
    const snapshot = entries.map((e) => ({ ...e }));
    clear();
    setSelectedIds(new Set());
    toast(t('pages.shortlist.clearedToast'), {
      description: t('pages.shortlist.clearedToastDescription', {
        count: snapshot.length,
      }),
      action: {
        label: t('pages.shortlist.undo'),
        onClick: () => {
          for (const entry of snapshot) addShortlistEntry(entry);
        },
      },
      duration: 10000,
    });
  }

  async function share() {
    if (typeof window === 'undefined') return;
    const result = await shareUrl({
      url: window.location.href,
      title: t('pages.shortlist.shareTitle'),
      text: t('pages.shortlist.shareText'),
    });
    if (result === 'copied') {
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2500);
    } else if (result === 'error') {
      setShareState('error');
      setTimeout(() => setShareState('idle'), 2500);
    }
  }

  function toggleSelected(sightId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(sightId)) next.delete(sightId);
      else next.add(sightId);
      return next;
    });
  }

  function selectAllInRegion(_region: Region, ids: string[]) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      return next;
    });
  }

  function clearSelectionInRegion(region: Region) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const item of groupedByRegion.get(region) ?? []) {
        next.delete(item.sight.id);
      }
      return next;
    });
  }

  // React Compiler memoizes this automatically — useMemo here trips the
  // `preserve-manual-memoization` lint because of the in-place sort pass.
  const groupedByRegion = groupShortlistByRegion(entries, loc);

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">{t('pages.shortlist.loading')}</p>;
  }

  const orderedRegions = REGION_ORDER.filter((r) => groupedByRegion.has(r));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{t('pages.shortlist.title')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('pages.shortlist.intro', { count: entries.length })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={share}
            size="lg"
            className="min-h-11 bg-(--color-steppe) text-white hover:bg-(--color-steppe-dark)"
          >
            {shareState === 'copied'
              ? t('pages.shortlist.shareCopied')
              : shareState === 'error'
                ? t('pages.shortlist.shareError')
                : t('pages.shortlist.shareButton')}
          </Button>
          {entries.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="min-h-11"
                >
                  {t('pages.shortlist.clearButton')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('pages.shortlist.clearDialogTitle')}</DialogTitle>
                  <DialogDescription>
                    {t.rich('pages.shortlist.clearDialogDescription', {
                      count: entries.length,
                      strong: (chunks) => (
                        <span className="font-medium text-foreground">
                          {chunks}
                        </span>
                      ),
                    })}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="min-h-11">
                      {t('pages.shortlist.cancel')}
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={handleClearAll}
                      className="min-h-11 bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40"
                    >
                      {t('pages.shortlist.confirmClear')}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <ShortlistProgress entries={entries} />

      {entries.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Heart />
            </EmptyMedia>
            <EmptyTitle>{t('pages.shortlist.emptyTitle')}</EmptyTitle>
            <EmptyDescription>
              {t('pages.shortlist.emptyDescription')}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/sights">{t('pages.shortlist.emptyBrowseSights')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/map">{t('pages.shortlist.emptyOpenMap')}</Link>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        <>
          <div className="flex items-start gap-2 rounded-md border border-(--color-border) bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>
              {t.rich('pages.shortlist.usageHint', {
                strong: (chunks) => (
                  <span className="font-medium text-foreground">{chunks}</span>
                ),
              })}
            </p>
          </div>
          <div className="space-y-8">
            {orderedRegions.map((region) => {
              const items = groupedByRegion.get(region);
              if (!items || items.length === 0) return null;
              return (
                <RegionSection
                  key={region}
                  region={region}
                  items={items}
                  selectedIds={selectedIds}
                  onToggleSelected={toggleSelected}
                  onSelectAll={selectAllInRegion}
                  onClearSelection={clearSelectionInRegion}
                  onTogglePriority={setPriority}
                  onToggleVisited={setVisited}
                  onRemove={handleRemove}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function ShortlistPage() {
  return (
    <Suspense fallback={<ShortlistFallback />}>
      <ShortlistPageInner />
    </Suspense>
  );
}

function ShortlistFallback() {
  const t = useTranslations();
  return <p className="text-sm text-muted-foreground">{t('pages.shortlist.loading')}</p>;
}
