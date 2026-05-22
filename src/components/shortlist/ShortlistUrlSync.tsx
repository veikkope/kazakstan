'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  replaceShortlist,
  snapshotShortlist,
  subscribeToShortlist,
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
import type { ShortlistEntry } from '@/lib/types';

const PARAM_SL = 'sl';

/**
 * Owns the URL ↔ shortlist sync. Mounted exactly once in RootLayout so
 * only a single subscriber writes `?sl=...`. The previous design ran the
 * sync inside every `useShortlist()` instance, which on the listing page
 * meant ~50 copies fighting over the URL (see comments in shortlist.ts).
 *
 * Flow on mount:
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

    const sl = searchParams.get(PARAM_SL) ?? '';
    const urlIds = sl ? sl.split(',').filter(Boolean) : [];
    const localEntries = snapshotShortlist();
    const localIds = localEntries.map((e) => e.sightId);

    // Case A — no URL data. Push current local list into the URL so the
    // page is immediately shareable.
    if (urlIds.length === 0) {
      if (localIds.length > 0) {
        writeShortlistToUrl(router, localIds);
      }
      return;
    }

    // Case B — URL has data, local is empty. Silent seed; nothing to lose.
    if (localIds.length === 0) {
      seedFromUrl(urlIds, localEntries);
      return;
    }

    // Case C — both sides have data. Replace is only safe when the URL
    // is a superset (or equal) of local; otherwise we'd silently wipe
    // localOnly items and the user wouldn't know.
    const urlSet = new Set(urlIds);
    const localOnly = localIds.filter((id) => !urlSet.has(id));

    if (localOnly.length === 0) {
      seedFromUrl(urlIds, localEntries);
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
    });
    // Mount-once on purpose. searchParams captured here is the initial
    // URL we want to honour; later URL writes are ours via subscribe.
    // The setState above is a single one-shot "load initial UI from
    // external source" — exactly what the rule mistakenly flags.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return subscribeToShortlist(() => {
      writeShortlistToUrl(
        router,
        snapshotShortlist().map((e) => e.sightId),
      );
    });
  }, [router]);

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
  // Resolve the first few sight names of the URL ids so the user has a
  // visual cue of what they're importing. Cap at 6 for layout sanity.
  const preview = useMemo(() => {
    if (!payload) return { names: [] as string[], more: 0 };
    const cap = 6;
    const sightById = new Map(sights.map((s) => [s.id, s.name] as const));
    const names = payload.urlIds
      .slice(0, cap)
      .map((id) => sightById.get(id))
      .filter((n): n is string => Boolean(n));
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
            <DialogTitle>Tuotko jaetun shortlistin?</DialogTitle>
            <DialogDescription>
              Linkki sisältää{' '}
              <strong className="text-foreground">
                {payload.urlIds.length} kohdetta
              </strong>
              . Sinulla on jo{' '}
              <strong className="text-foreground">
                {payload.localCount} omaa kohdetta
              </strong>{' '}
              listalla.
            </DialogDescription>
          </DialogHeader>

          {/* Visual breakdown — three small stat boxes give an at-a-glance
              picture of what merge vs replace would actually do. */}
          <dl className="grid grid-cols-3 gap-2 text-center text-sm">
            <Stat
              label="Yhteisiä"
              value={payload.overlapCount}
              tone="neutral"
            />
            <Stat
              label="Uusia"
              value={`+${payload.newCount}`}
              tone="positive"
            />
            <Stat
              label="Vain sinulla"
              value={payload.localOnlyCount}
              tone="risk"
            />
          </dl>

          {/* Preview the sender's picks so the user knows what they're
              accepting. Truncated to keep the dialog compact. */}
          {preview.names.length > 0 && (
            <div className="rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Linkillä:</span>{' '}
              {preview.names.join(', ')}
              {preview.more > 0 && ` + ${preview.more} muuta`}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Yhdistä</strong> lisää
            linkin uudet kohteet listallesi — et menetä omiasi.{' '}
            <strong className="text-foreground">Korvaa omat</strong> pitää
            vain linkin sisällön ja{' '}
            <span className="text-destructive">
              poistaa {payload.localOnlyCount} omaasi
            </span>
            .
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="min-h-11"
            >
              Peruuta
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onReplace}
              className="min-h-11 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              Korvaa omat
            </Button>
            <Button
              type="button"
              onClick={onMerge}
              className="min-h-11"
            >
              Yhdistä
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
  const url = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
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
