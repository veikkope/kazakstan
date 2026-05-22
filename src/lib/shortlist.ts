'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { ShortlistEntry } from './types';

const STORAGE_KEY = 'kz-shortlist-v1';

interface StoredShortlist {
  entries: ShortlistEntry[];
}

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

function emit(): void {
  for (const listener of listeners) listener();
}

function readLocalStorage(): ShortlistEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredShortlist;
    return Array.isArray(parsed.entries) ? parsed.entries : [];
  } catch {
    return [];
  }
}

function writeLocalStorage(entries: ShortlistEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries }));
  } catch {
    // quota / private mode — non-fatal
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

function commit(next: ShortlistEntry[]): void {
  storeEntries = next;
  storeHydrated = true;
  writeLocalStorage(next);
  emit();
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
