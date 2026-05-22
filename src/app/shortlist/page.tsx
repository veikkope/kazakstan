'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { sights } from '@/data/sights';
import { categoryMeta } from '@/data/categories';
import { findById } from '@/lib/filters';
import { addShortlistEntry, useShortlist } from '@/lib/shortlist';
import { toast } from 'sonner';
import SightImage from '@/components/sights/SightImage';
import { shareUrl } from '@/lib/share';
import type { ShortlistEntry } from '@/lib/types';
import { Check, Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

type Bucket = 'priority' | 'saved' | 'visited';

const BUCKET_LABEL: Record<Bucket, string> = {
  priority: 'Suosikit',
  saved: 'Tallennetut',
  visited: 'Käydyt',
};

const BUCKET_ORDER: Bucket[] = ['priority', 'saved', 'visited'];

function bucketFor(entry: ShortlistEntry): Bucket {
  if (entry.visitedAt) return 'visited';
  if (entry.priority) return 'priority';
  return 'saved';
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
        {/* Two-column header. Left stack (title + stats) is two tight
            lines of text; the right column is a single oversized %
            number. `leading-none` on the digits + `items-center` on the
            row aligns them so the prominent number doesn't add vertical
            height beyond what the two text lines already need. */}
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2
              className={cn(
                'text-sm font-semibold tracking-tight',
                complete && 'text-emerald-700 dark:text-emerald-400',
              )}
            >
              {complete ? '🎉 Reissu valmis!' : 'Reissun eteneminen'}
            </h2>
            <p className="text-xs tabular-nums text-muted-foreground">
              <span className="font-semibold text-foreground">{visited}</span>
              {' / '}
              {total} käyty
              {priorityTotal > 0 && (
                <>
                  {' · '}
                  <span className="text-amber-600 dark:text-amber-400">
                    {priorityVisited}/{priorityTotal}
                  </span>{' '}
                  suosikkia
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
          aria-label={`Reissun eteneminen: ${visited} / ${total} käyty (${percent} %)`}
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

function ShortlistPageInner() {
  const { entries, hydrated, setPriority, setVisited, remove, clear } =
    useShortlist();
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  );

  function handleRemove(entry: ShortlistEntry, sightName: string) {
    // Capture the full entry so the Kumoa-action restores priority +
    // visitedAt verbatim. addShortlistEntry is module-scoped so it stays
    // callable from the toast onClick after this component re-renders.
    remove(entry.sightId);
    toast(`Poistettu: ${sightName}`, {
      action: {
        label: 'Kumoa',
        onClick: () => addShortlistEntry(entry),
      },
      duration: 6000,
    });
  }

  function handleClearAll() {
    // Snapshot every entry (with priority + visitedAt) so the undo toast
    // can restore the whole list verbatim — visit progress + suosikit
    // included. clear() itself is the cheap part; the safety net matters.
    const snapshot = entries.map((e) => ({ ...e }));
    clear();
    toast('Shortlist tyhjennetty', {
      description: `Poistettu ${snapshot.length} kohdetta`,
      action: {
        label: 'Kumoa',
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
      title: 'Kazakstan-reissun shortlist',
      text: 'Tässä mun shortlist Kazakstaniin — mitä mieltä?',
    });
    if (result === 'copied') {
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2500);
    } else if (result === 'error') {
      setShareState('error');
      setTimeout(() => setShareState('idle'), 2500);
    }
    // 'shared' and 'cancelled' need no UI feedback — the native sheet already conveyed it.
  }

  const grouped = useMemo(() => {
    const buckets: Record<Bucket, ShortlistEntry[]> = {
      priority: [],
      saved: [],
      visited: [],
    };
    for (const entry of entries) buckets[bucketFor(entry)].push(entry);
    return buckets;
  }, [entries]);

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Ladataan…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Shortlist</h1>
          <p className="text-sm text-muted-foreground">
            {entries.length} kohdetta. Tallennettu selaimeen ja URL-osoitteeseen — jaa
            linkki kaverille.
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
              ? '✓ Linkki kopioitu'
              : shareState === 'error'
                ? 'Jakaminen epäonnistui'
                : 'Jaa kavereille'}
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
                  Tyhjennä
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tyhjennä shortlist?</DialogTitle>
                  <DialogDescription>
                    Poistetaan kaikki{' '}
                    <span className="font-medium text-foreground">
                      {entries.length} kohdetta
                    </span>{' '}
                    listalta — mukaan lukien suosikit ja käyty-merkinnät.
                    Voit perua toiminnon hetken ajan ilmoituksen kautta.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="min-h-11">
                      Peruuta
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={handleClearAll}
                      className="min-h-11 bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40"
                    >
                      Kyllä, tyhjennä
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
            <EmptyTitle>Shortlist on tyhjä</EmptyTitle>
            <EmptyDescription>
              Lisää kohteita listalle Nähtävyydet-sivulta. Voit nostaa kärkivalinnat
              suosikeiksi ★ ja merkitä käydyt ✓ reissun aikana.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/nahtavyydet">Selaa nähtävyyksiä</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/kartta">Avaa kartta</Link>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="space-y-6">
          {BUCKET_ORDER.map((bucket) => {
            const items = grouped[bucket];
            if (items.length === 0) return null;
            return (
              <section key={bucket} className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {BUCKET_LABEL[bucket]} ({items.length})
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((entry) => {
                    const sight = findById(sights, entry.sightId);
                    if (!sight) return null;
                    const cat = categoryMeta[sight.category];
                    const isVisited = Boolean(entry.visitedAt);
                    const isPriority = Boolean(entry.priority);
                    return (
                      <li key={entry.sightId}>
                        <Card size="sm">
                          <CardContent>
                            <div className="flex gap-3">
                              <Link
                                href={`/nahtavyydet/${sight.slug}`}
                                aria-label={sight.name}
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
                                      href={`/nahtavyydet/${sight.slug}`}
                                      className="line-clamp-1 font-medium text-foreground hover:no-underline"
                                    >
                                      {sight.name}
                                    </Link>
                                    <p className="text-xs text-muted-foreground">
                                      {cat.emoji} {cat.fi}
                                      {isVisited && entry.visitedAt && (
                                        <>
                                          {' · '}
                                          <span className="text-emerald-600 dark:text-emerald-400">
                                            Käyty {formatVisitedDate(entry.visitedAt)}
                                          </span>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  {/* Destructive action only — toggles live on
                                      the actions row below so they are not
                                      adjacent to this destructive one. */}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-lg"
                                    onClick={() =>
                                      handleRemove(entry, sight.name)
                                    }
                                    aria-label="Poista shortlistilta"
                                    className="-mr-1.5 -mt-1.5 size-11 shrink-0 text-muted-foreground hover:text-foreground"
                                  >
                                    ✕
                                  </Button>
                                </div>
                                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                  {sight.shortDescription}
                                </p>
                              </div>
                            </div>
                            {/* Toggles: ★ Suosikki (left), ✓ Käyty (right).
                                `justify-between` keeps them well apart so a
                                stray tap doesn't flip the wrong one. */}
                            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                              <Button
                                type="button"
                                variant={isPriority ? 'default' : 'outline'}
                                size="sm"
                                onClick={() =>
                                  setPriority(entry.sightId, !isPriority)
                                }
                                aria-pressed={isPriority}
                                className={cn(
                                  'min-h-11 px-3 text-sm',
                                  isPriority &&
                                    'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400/40 dark:bg-amber-500 dark:hover:bg-amber-400',
                                )}
                              >
                                <Star
                                  className={cn(
                                    'size-4',
                                    isPriority && 'fill-current',
                                  )}
                                  aria-hidden
                                />
                                Suosikki
                              </Button>
                              <Button
                                type="button"
                                variant={isVisited ? 'default' : 'outline'}
                                size="sm"
                                onClick={() =>
                                  setVisited(entry.sightId, !isVisited)
                                }
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
                                Käyty
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
          })}
        </div>
      )}
    </div>
  );
}

export default function ShortlistPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Ladataan…</p>}>
      <ShortlistPageInner />
    </Suspense>
  );
}
