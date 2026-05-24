'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { ShortlistEntry } from './types';

const STORAGE_KEY = 'kz-shortlist-v1';

/**
 * Soft cap surfaced in the UI as a one-time warning. Not enforced — the
 * data layer accepts unlimited entries; this is a heuristic threshold past
 * which a share URL gets long enough that mobile messengers (WhatsApp,
 * Telegram) sometimes truncate it. Realistic trip lists are well below.
 */
export const SHORTLIST_SOFT_MAX = 50;

/* ============================================================
 * Module-level store
 * ------------------------------------------------------------
 * Single source of truth shared by every `useShortlist()` consumer.
 * The previous design held a copy of the entries inside each component
 * instance, which meant N copies (one per SightCard on the listing
 * page) all tried to mirror their local state back into the URL.
 * That race produced an infinite `router.replace` loop where each
 * "non-toggling" copy kept overwriting the toggling copy's URL write.
 *
 * Now there is exactly one store; React subscribes to it through
 * `useSyncExternalStore`. URL ↔ store sync is handled separately by
 * `<ShortlistUrlSync/>` mounted once in the root layout, so the URL
 * is written by a single owner and read on first mount only.
 * ============================================================ */

// Frozen sentinel — `useSyncExternalStore` returns this during SSR
// and the initial hydration render so reference equality identifies
// pre-hydration renders without a separate boolean snapshot.
const EMPTY_ENTRIES: readonly ShortlistEntry[] = Object.freeze([]);

let storeEntries: ShortlistEntry[] = [];
let storeHydrated = false;
const listeners = new Set<() => void>();
const writeErrorListeners = new Set<(error: unknown) => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

/**
 * Type-narrow a raw JSON value to a well-formed `ShortlistEntry`. Used to
 * defend against schema drift (manual tampering, an old version with a
 * different shape, partial writes from a previous crash). Entries that fail
 * the check are silently dropped so a single corrupted item doesn't take
 * the whole list with it.
 */
function isValidEntry(value: unknown): value is ShortlistEntry {
  if (!value || typeof value !== 'object') return false;
  const e = value as Record<string, unknown>;
  if (typeof e.sightId !== 'string' || e.sightId.length === 0) return false;
  if ('priority' in e && e.priority !== undefined && typeof e.priority !== 'boolean') {
    return false;
  }
  if (
    'visitedAt' in e &&
    e.visitedAt !== undefined &&
    typeof e.visitedAt !== 'string'
  ) {
    return false;
  }
  return true;
}

function readLocalStorage(): ShortlistEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return [];
    const entries = (parsed as { entries?: unknown }).entries;
    if (!Array.isArray(entries)) return [];
    return entries.filter(isValidEntry);
  } catch {
    return [];
  }
}

function writeLocalStorage(entries: ShortlistEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries }));
  } catch (err) {
    // Quota exceeded, private mode, or another browser-imposed block.
    // Notify subscribers so the UI can show a toast — silently swallowing
    // means the user's "saved" state ghost-evaporates on next refresh.
    for (const listener of writeErrorListeners) listener(err);
  }
}

function hydrateFromStorage(): void {
  if (storeHydrated || typeof window === 'undefined') return;
  storeEntries = readLocalStorage();
  storeHydrated = true;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ShortlistEntry[] {
  hydrateFromStorage();
  return storeEntries;
}

function getServerSnapshot(): readonly ShortlistEntry[] {
  return EMPTY_ENTRIES;
}

/**
 * Defensive dedupe — public mutators are well-behaved, but
 * `replaceShortlist` (URL-import path) trusts caller input. A `?sl=a,a,b`
 * copy-paste would otherwise persist duplicates that confuse the rest of
 * the UI (progress totals, render keys). First occurrence wins so the
 * caller's intended ordering is preserved.
 */
function dedupe(entries: readonly ShortlistEntry[]): ShortlistEntry[] {
  const seen = new Set<string>();
  const out: ShortlistEntry[] = [];
  for (const entry of entries) {
    if (seen.has(entry.sightId)) continue;
    seen.add(entry.sightId);
    out.push(entry);
  }
  return out;
}

function commit(next: ShortlistEntry[]): void {
  storeEntries = dedupe(next);
  storeHydrated = true;
  writeLocalStorage(storeEntries);
  emit();
}

/* ============================================================
 * Cross-tab sync
 * ------------------------------------------------------------
 * The `storage` event fires in OTHER tabs/windows that share the same
 * origin when our key changes. We re-read and emit so a user toggling
 * items in tab A sees them appear in tab B immediately.
 *
 * Safety note: the originating tab does NOT receive its own `storage`
 * event (per the HTML spec), so writing to localStorage inside the
 * handler would not cause a self-loop. We still skip the write here
 * because the source tab already persisted the value — we only need to
 * refresh in-memory state and notify React subscribers.
 * ============================================================ */
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    // event.newValue can be null if the key was removed (cleared in another
    // tab). readLocalStorage() handles that path uniformly.
    storeEntries = readLocalStorage();
    storeHydrated = true;
    emit();
  });
}

/* ============================================================
 * Public mutators — usable from React or non-React code.
 * They are not hooks, so `<ShortlistUrlSync/>` (and tests) can call
 * them without a React context.
 * ============================================================ */

export function toggleShortlistEntry(sightId: string): void {
  hydrateFromStorage();
  const exists = storeEntries.some((e) => e.sightId === sightId);
  commit(
    exists
      ? storeEntries.filter((e) => e.sightId !== sightId)
      : [...storeEntries, { sightId }],
  );
}

/**
 * Toggle the "suosikki" / top-pick flag on an entry. Clears the field
 * entirely when set to false so the persisted JSON stays compact.
 */
export function setShortlistEntryPriority(
  sightId: string,
  priority: boolean,
): void {
  hydrateFromStorage();
  commit(
    storeEntries.map((e) => {
      if (e.sightId !== sightId) return e;
      if (priority) return { ...e, priority: true };
      const rest = { ...e };
      delete rest.priority;
      return rest;
    }),
  );
}

export function removeShortlistEntry(sightId: string): void {
  hydrateFromStorage();
  commit(storeEntries.filter((e) => e.sightId !== sightId));
}

/**
 * Append a full entry (with its prior priority/visitedAt) back into the
 * store. Used by the "Kumoa"-toast after a removal so the previous
 * state is restored verbatim — `toggleShortlistEntry` cannot do this
 * because it always inserts a bare entry.
 */
export function addShortlistEntry(entry: ShortlistEntry): void {
  hydrateFromStorage();
  if (storeEntries.some((e) => e.sightId === entry.sightId)) return;
  commit([...storeEntries, entry]);
}

/**
 * Toggle the "visited" mark on a sight. When set, stores today's ISO date
 * so we can later show "Käyty <date>" hints in the trip-review view.
 * When cleared, removes `visitedAt` entirely (not just set to undefined),
 * keeping the JSON tight.
 */
export function setShortlistEntryVisited(
  sightId: string,
  visited: boolean,
): void {
  hydrateFromStorage();
  commit(
    storeEntries.map((e) => {
      if (e.sightId !== sightId) return e;
      if (visited) return { ...e, visitedAt: new Date().toISOString() };
      const rest = { ...e };
      delete rest.visitedAt;
      return rest;
    }),
  );
}

export function clearShortlist(): void {
  hydrateFromStorage();
  commit([]);
}

/** Replace the entire shortlist — used by URL-sync on initial mount. */
export function replaceShortlist(entries: ShortlistEntry[]): void {
  commit(entries);
}

/** Read entries without subscribing — used by URL writers. */
export function snapshotShortlist(): ShortlistEntry[] {
  hydrateFromStorage();
  return storeEntries;
}

/** Subscribe to store changes — used by URL-sync component. */
export const subscribeToShortlist = subscribe;

/**
 * Subscribe to write failures (quota exceeded, private mode, blocked
 * extension). Returns an unsubscribe function. Used by `ShortlistUrlSync`
 * which is the global host with access to the toast Sonner.
 */
export function subscribeToShortlistWriteError(
  listener: (error: unknown) => void,
): () => void {
  writeErrorListeners.add(listener);
  return () => {
    writeErrorListeners.delete(listener);
  };
}

/* ============================================================
 * React hook
 * ============================================================ */

export function useShortlist() {
  const entries = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // `entries !== EMPTY_ENTRIES` flips from false → true exactly when
  // `useSyncExternalStore` swaps the server snapshot out for the
  // client snapshot (post-hydration). Buttons disable themselves
  // until this happens so SSR and CSR render the same markup.
  const hydrated = entries !== EMPTY_ENTRIES;

  const has = useCallback(
    (sightId: string) => entries.some((e) => e.sightId === sightId),
    [entries],
  );

  return {
    entries,
    hydrated,
    has,
    toggle: toggleShortlistEntry,
    setPriority: setShortlistEntryPriority,
    setVisited: setShortlistEntryVisited,
    remove: removeShortlistEntry,
    clear: clearShortlist,
  };
}
