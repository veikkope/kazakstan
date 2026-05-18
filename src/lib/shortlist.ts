'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ShortlistEntry, ShortlistStatus } from './types';
import { useUrlState } from './url-state';

const STORAGE_KEY = 'kz-shortlist-v1';

interface StoredShortlist {
  entries: ShortlistEntry[];
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
    // quota / private-mode — non-fatal
  }
}

/**
 * SSR-safe shortlist hook.
 * - Initial render: empty (server) → no hydration mismatch.
 * - On mount: read URL (?sl=...) first; if present, use it. Otherwise localStorage.
 * - Every change: write both localStorage and URL.
 */
export function useShortlist() {
  const { state, update } = useUrlState();
  const [entries, setEntries] = useState<ShortlistEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const skipNextUrlSyncRef = useRef(false);

  useEffect(() => {
    // Mount-time hydration from URL (?sl=...) and localStorage.
    // Runs once with empty deps — no cascading-render risk.
    const urlIds = state.shortlist;
    const local = readLocalStorage();

    let initial: ShortlistEntry[];
    if (urlIds.length > 0) {
      const localMap = new Map(local.map((e) => [e.sightId, e.status] as const));
      initial = urlIds.map((id) => ({
        sightId: id,
        status: localMap.get(id) ?? 'considering',
      }));
    } else {
      initial = local;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(initial);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeLocalStorage(entries);

    if (skipNextUrlSyncRef.current) {
      skipNextUrlSyncRef.current = false;
      return;
    }
    const ids = entries.map((e) => e.sightId);
    const current = state.shortlist.join(',');
    const next = ids.join(',');
    if (current !== next) update({ shortlist: ids });
  }, [entries, hydrated, state.shortlist, update]);

  const has = useCallback(
    (sightId: string) => entries.some((e) => e.sightId === sightId),
    [entries],
  );

  const toggle = useCallback((sightId: string) => {
    setEntries((prev) =>
      prev.some((e) => e.sightId === sightId)
        ? prev.filter((e) => e.sightId !== sightId)
        : [...prev, { sightId, status: 'considering' }],
    );
  }, []);

  const setStatus = useCallback((sightId: string, status: ShortlistStatus) => {
    setEntries((prev) =>
      prev.map((e) => (e.sightId === sightId ? { ...e, status } : e)),
    );
  }, []);

  const remove = useCallback((sightId: string) => {
    setEntries((prev) => prev.filter((e) => e.sightId !== sightId));
  }, []);

  const clear = useCallback(() => {
    setEntries([]);
  }, []);

  return { entries, hydrated, has, toggle, setStatus, remove, clear };
}

export function getStatusLabel(status: ShortlistStatus): string {
  return status === 'considering' ? 'Harkinnassa' : status === 'in' ? 'Mukaan' : 'Pois';
}
