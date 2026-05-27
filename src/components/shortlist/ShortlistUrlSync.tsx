'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  replaceShortlist,
  snapshotShortlist,
  subscribeToShortlist,
  subscribeToShortlistWriteError,
} from '@/lib/shortlist';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { sights } from '@/data/sights';
import type { LocalizedString, ShortlistEntry } from '@/lib/types';

const PARAM_SL = 'sl';

/**
 * Debounce window for store → URL writes. Coalesces bursts of clicks (e.g.,
 * bulk-toggling on the listing page) into a single `router.replace`, which
 * is cheap but not free. 60ms is just under one frame at 16ms so individual
 * clicks still feel immediate while sequential clicks within a tap-tap
 * cadence get batched.
 */
const URL_WRITE_DEBOUNCE_MS = 60;

/**
 * Owns the URL ↔ shortlist sync. Mounted exactly once in RootLayout so
 * only a single subscriber writes `?sl=...`. The previous design ran the
 * sync inside every `useShortlist()` instance, which on the listing page
 * meant ~50 copies fighting over the URL (see comments in shortlist.ts).
 *
 * Flow on mount:
 *   - Validate both sides against current sights dataset. Unknown ids are
 *     pruned silently from local storage (with a toast) and surfaced as a
 *     count to the user in the import dialog.
 *   - URL empty, local has items     → push local to URL (shareable)
 *   - URL has items, local empty     → silent seed (friend opens a link)
 *   - URL ⊇ local (superset / equal) → silent seed (no items lost)
 *   - URL has items, local has items
 *     that aren't in URL             → open ImportShortlistDialog so the
 *                                       user can pick yhdistä / korvaa /
 *                                       peruuta instead of silently
 *                                       wiping their own picks
 *
 * After mount, store → URL only (subscribeToShortlist). We never read
 * the URL on subscribe events, which is what kills the historical
 * router.replace loop. Other URL params (cat/region/sort/id) are
 * preserved by reading `window.location.search` at write time.
 */
function ShortlistUrlSyncInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const [importPayload, setImportPayload] = useState<ImportPayload | null>(
    null,
  );
  // Mount-effect guard. Using a ref instead of relying on `[]` deps so
  // the eslint react-hooks/set-state-in-effect rule sees an explicit
  // "only once" gate rather than an empty-deps escape hatch.
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;

    // Lazy-built each mount (cheap — single iteration over ~100 sights).
    // Putting this outside the component would freeze the dataset at module
    // import time, which fights HMR during development.
    const knownIds = new Set(sights.map((s) => s.id));

    const sl = searchParams.get(PARAM_SL) ?? '';
    const rawUrlIds = sl ? sl.split(',').filter(Boolean) : [];
    const urlIds = rawUrlIds.filter((id) => knownIds.has(id));
    const unknownUrlCount = rawUrlIds.length - urlIds.length;

    const rawLocalEntries = snapshotShortlist();
    const localEntries = rawLocalEntries.filter((e) => knownIds.has(e.sightId));
    const prunedLocalCount = rawLocalEntries.length - localEntries.length;

    // Persist the local pruning so the user's storage doesn't keep ghost
    // ids forever (they'd silently filter on every render). Toast lets them
    // know what happened — silent data loss erodes trust.
    if (prunedLocalCount > 0) {
      replaceShortlist(localEntries);
      toast.info(
        t('components.shortlistUrlSync.prunedToast', { count: prunedLocalCount }),
        {
          description: t('components.shortlistUrlSync.prunedToastDescription'),
        },
      );
    }

    const localIds = localEntries.map((e) => e.sightId);

    // Case A — no URL data. Push current local list into the URL so the
    // page is immediately shareable.
    if (urlIds.length === 0) {
      if (localIds.length > 0) {
        writeShortlistToUrl(router, localIds);
      }
      // If the URL had only unknown ids, rewrite to drop them.
      else if (unknownUrlCount > 0) {
        writeShortlistToUrl(router, []);
      }
      if (unknownUrlCount > 0) {
        toast.warning(
          t('components.shortlistUrlSync.unknownInLinkToast', {
            count: unknownUrlCount,
          }),
          {
            description: t(
              'components.shortlistUrlSync.unknownInLinkDescription',
            ),
          },
        );
      }
      return;
    }

    // Case B — URL has data, local is empty. Silent seed; nothing to lose.
    if (localIds.length === 0) {
      seedFromUrl(urlIds, localEntries);
      if (unknownUrlCount > 0) {
        toast.warning(
          t('components.shortlistUrlSync.droppedUnknownToast', {
            count: unknownUrlCount,
          }),
        );
      }
      return;
    }

    // Case C — both sides have data. Replace is only safe when the URL
    // is a superset (or equal) of local; otherwise we'd silently wipe
    // localOnly items and the user wouldn't know.
    const urlSet = new Set(urlIds);
    const localOnly = localIds.filter((id) => !urlSet.has(id));

    if (localOnly.length === 0) {
      seedFromUrl(urlIds, localEntries);
      if (unknownUrlCount > 0) {
        toast.warning(
          t('components.shortlistUrlSync.droppedUnknownToast', {
            count: unknownUrlCount,
          }),
        );
      }
      return;
    }

    // Conflict — open the import dialog.
    const localSet = new Set(localIds);
    const overlap = urlIds.filter((id) => localSet.has(id)).length;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImportPayload({
      urlIds,
      localCount: localIds.length,
      overlapCount: overlap,
      newCount: urlIds.length - overlap,
      localOnlyCount: localOnly.length,
      unknownCount: unknownUrlCount,
    });
    // Mount-once on purpose. searchParams captured here is the initial
    // URL we want to honour; later URL writes are ours via subscribe.
    // The setState above is a single one-shot "load initial UI from
    // external source" — exactly what the rule mistakenly flags.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Store → URL with debounce. Bursts of clicks (e.g., bulk select-all in
  // a region section) coalesce into a single router.replace call.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const flush = () => {
      timer = null;
      writeShortlistToUrl(
        router,
        snapshotShortlist().map((e) => e.sightId),
      );
    };
    const unsubscribe = subscribeToShortlist(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(flush, URL_WRITE_DEBOUNCE_MS);
    });
    return () => {
      if (timer) clearTimeout(timer);
      unsubscribe();
    };
  }, [router]);

  // Surface localStorage write failures (quota, private mode, blocked
  // extension) so the user knows their picks won't survive a refresh —
  // silent data loss is the worst possible failure mode here.
  useEffect(() => {
    return subscribeToShortlistWriteError(() => {
      toast.error(t('components.shortlistUrlSync.saveFailedToast'), {
        description: t('components.shortlistUrlSync.saveFailedDescription'),
        // Long duration — this is consequential, not transient.
        duration: 10000,
      });
    });
  }, [t]);

  function handleMerge() {
    if (!importPayload) return;
    // Build the merged list in a single replaceShortlist call so the
    // store emits once and the URL is written once — avoids the cascade
    // of router.replace calls we'd get from looping addShortlistEntry.
    const localEntries = snapshotShortlist();
    const localSet = new Set(localEntries.map((e) => e.sightId));
    const additions: ShortlistEntry[] = importPayload.urlIds
      .filter((id) => !localSet.has(id))
      .map((id) => ({ sightId: id }));
    replaceShortlist([...localEntries, ...additions]);
    setImportPayload(null);
  }

  function handleReplace() {
    if (!importPayload) return;
    seedFromUrl(importPayload.urlIds, snapshotShortlist());
    setImportPayload(null);
  }

  function handleCancel() {
    if (!importPayload) return;
    // Don't touch the store. Push local list back into the URL so a
    // refresh doesn't re-trigger this dialog (URL would otherwise keep
    // the sender's ids forever).
    setImportPayload(null);
    writeShortlistToUrl(
      router,
      snapshotShortlist().map((e) => e.sightId),
    );
  }

  return (
    <ImportShortlistDialog
      payload={importPayload}
      onMerge={handleMerge}
      onReplace={handleReplace}
      onCancel={handleCancel}
    />
  );
}

interface ImportPayload {
  urlIds: string[];
  localCount: number;
  overlapCount: number;
  newCount: number;
  localOnlyCount: number;
  /** Count of ids in the original URL that no longer match any sight. */
  unknownCount: number;
}

function ImportShortlistDialog({
  payload,
  onMerge,
  onReplace,
  onCancel,
}: {
  payload: ImportPayload | null;
  onMerge: () => void;
  onReplace: () => void;
  onCancel: () => void;
}) {
  const t = useTranslations();
  // Resolve the first few sight names of the URL ids so the user has a
  // visual cue of what they're importing. Cap at 6 for layout sanity.
  const preview = useMemo(() => {
    if (!payload) return { names: [] as string[], more: 0 };
    const cap = 6;
    const sightById = new Map(sights.map((s) => [s.id, s.name] as const));
    const names = payload.urlIds
      .slice(0, cap)
      .map((id) => sightById.get(id))
      .filter((n): n is LocalizedString => Boolean(n));
    const more = Math.max(0, payload.urlIds.length - names.length);
    return { names, more };
  }, [payload]);

  return (
    <Dialog
      open={payload !== null}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      {payload && (
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t('components.shortlistUrlSync.dialogTitle')}
            </DialogTitle>
            <DialogDescription>
              {t.rich('components.shortlistUrlSync.dialogDescription', {
                urlCount: payload.urlIds.length,
                localCount: payload.localCount,
                strong: (chunks) => (
                  <strong className="text-foreground">{chunks}</strong>
                ),
              })}
            </DialogDescription>
          </DialogHeader>

          {/* Visual breakdown — three small stat boxes give an at-a-glance
              picture of what merge vs replace would actually do. */}
          <dl className="grid grid-cols-3 gap-2 text-center text-sm">
            <Stat
              label={t('components.shortlistUrlSync.statShared')}
              value={payload.overlapCount}
              tone="neutral"
            />
            <Stat
              label={t('components.shortlistUrlSync.statNew')}
              value={`+${payload.newCount}`}
              tone="positive"
            />
            <Stat
              label={t('components.shortlistUrlSync.statOnlyYours')}
              value={payload.localOnlyCount}
              tone="risk"
            />
          </dl>

          {payload.unknownCount > 0 && (
            <p className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
              {t.rich('components.shortlistUrlSync.unknownDroppedNote', {
                count: payload.unknownCount,
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          )}

          {/* Preview the sender's picks so the user knows what they're
              accepting. Truncated to keep the dialog compact. */}
          {preview.names.length > 0 && (
            <div className="rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {t('components.shortlistUrlSync.previewLabel')}
              </span>{' '}
              {preview.names.join(', ')}
              {preview.more > 0 &&
                ` ${t('components.shortlistUrlSync.previewMore', { count: preview.more })}`}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {t.rich('components.shortlistUrlSync.explanation', {
              localOnlyCount: payload.localOnlyCount,
              strong: (chunks) => (
                <strong className="text-foreground">{chunks}</strong>
              ),
              destructive: (chunks) => (
                <span className="text-destructive">{chunks}</span>
              ),
            })}
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="min-h-11"
            >
              {t('components.shortlistUrlSync.cancel')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onReplace}
              className="min-h-11 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              {t('components.shortlistUrlSync.replace')}
            </Button>
            <Button
              type="button"
              onClick={onMerge}
              className="min-h-11"
            >
              {t('components.shortlistUrlSync.merge')}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: 'neutral' | 'positive' | 'risk';
}) {
  return (
    <div
      className={cn(
        'rounded-md border p-3',
        tone === 'positive' &&
          'border-emerald-300/60 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-950/20',
        tone === 'risk' &&
          'border-destructive/30 bg-destructive/5',
        tone === 'neutral' && 'border-border bg-card',
      )}
    >
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          'text-xl font-semibold tabular-nums',
          tone === 'positive' && 'text-emerald-700 dark:text-emerald-400',
          tone === 'risk' && 'text-destructive',
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function seedFromUrl(
  urlIds: string[],
  localEntries: readonly ShortlistEntry[],
): void {
  // Preserve local priority/visitedAt for any id that's also on the
  // sender's list — visit progress is private to the device and the
  // share URL only encodes ids, so we don't want a friend's link to
  // wipe our own "käyty"-marks for overlapping sights.
  const localExtras = new Map(
    localEntries.map(
      (e) =>
        [
          e.sightId,
          { priority: e.priority, visitedAt: e.visitedAt },
        ] as const,
    ),
  );
  replaceShortlist(
    urlIds.map((id) => {
      const extra = localExtras.get(id);
      const entry: ShortlistEntry = { sightId: id };
      if (extra?.priority) entry.priority = true;
      if (extra?.visitedAt) entry.visitedAt = extra.visitedAt;
      return entry;
    }),
  );
}

function writeShortlistToUrl(
  router: ReturnType<typeof useRouter>,
  ids: string[],
): void {
  if (typeof window === 'undefined') return;
  // Read live params so we preserve cat/region/sort/id set after mount.
  const params = new URLSearchParams(window.location.search);
  const current = params.get(PARAM_SL) ?? '';
  const next = ids.join(',');
  if (current === next) return;
  if (next === '') params.delete(PARAM_SL);
  else params.set(PARAM_SL, next);
  const query = params.toString();
  // Dynamic same-path update with mutated query — typedRoutes can't prove
  // pathname is a known Route at build time, so cast: the URL by construction
  // matches whatever route we're already on.
  const url = (query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname) as Route;
  router.replace(url, { scroll: false });
}

export default function ShortlistUrlSync() {
  // useSearchParams requires a Suspense boundary in static prerender.
  return (
    <Suspense fallback={null}>
      <ShortlistUrlSyncInner />
    </Suspense>
  );
}
