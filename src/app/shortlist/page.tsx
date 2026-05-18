'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { sights } from '@/data/sights';
import { categoryMeta } from '@/data/categories';
import { findById } from '@/lib/filters';
import { useShortlist, getStatusLabel } from '@/lib/shortlist';
import type { ShortlistStatus } from '@/lib/types';

const STATUS_ORDER: ShortlistStatus[] = ['in', 'considering', 'out'];

function ShortlistPageInner() {
  const { entries, hydrated, setStatus, remove, clear } = useShortlist();
  const [copyState, setCopyState] = useState<'idle' | 'done' | 'error'>('idle');

  async function share() {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState('done');
      setTimeout(() => setCopyState('idle'), 2500);
    } catch {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2500);
    }
  }

  if (!hydrated) {
    return <p className="text-sm text-(--color-muted)">Ladataan…</p>;
  }

  const grouped = new Map<ShortlistStatus, typeof entries>();
  for (const status of STATUS_ORDER) grouped.set(status, []);
  for (const entry of entries) {
    grouped.get(entry.status)?.push(entry);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Shortlist</h1>
          <p className="text-sm text-(--color-muted)">
            {entries.length} kohdetta. Tallennettu selaimeen ja URL-osoitteeseen — jaa
            linkki kaverille.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={share}
            className="rounded-md bg-(--color-steppe) px-3 py-2 text-sm text-white hover:bg-(--color-steppe-dark)"
          >
            {copyState === 'done'
              ? '✓ Linkki kopioitu'
              : copyState === 'error'
                ? 'Kopiointi epäonnistui'
                : 'Jaa kavereille (kopioi linkki)'}
          </button>
          {entries.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm text-(--color-muted) hover:text-(--color-fg)"
            >
              Tyhjennä
            </button>
          )}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center">
          <p className="text-(--color-muted)">
            Shortlistilla ei ole vielä mitään. Lisää kohteita{' '}
            <Link href="/kartta">kartalta</Link> tai{' '}
            <Link href="/nahtavyydet">nähtävyyslistasta</Link>.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {STATUS_ORDER.map((status) => {
            const items = grouped.get(status) ?? [];
            if (items.length === 0) return null;
            return (
              <section key={status} className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
                  {getStatusLabel(status)} ({items.length})
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((entry) => {
                    const sight = findById(sights, entry.sightId);
                    if (!sight) return null;
                    const cat = categoryMeta[sight.category];
                    return (
                      <li
                        key={entry.sightId}
                        className="rounded-lg border border-(--color-border) bg-(--color-card) p-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/nahtavyydet/${sight.slug}`}
                              className="font-medium text-(--color-fg) hover:no-underline"
                            >
                              {sight.name}
                            </Link>
                            <p className="text-xs text-(--color-muted)">
                              {cat.emoji} {cat.fi}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(entry.sightId)}
                            aria-label="Poista shortlistilta"
                            className="text-(--color-muted) hover:text-(--color-fg)"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="mt-2 text-sm text-(--color-muted)">
                          {sight.shortDescription}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {STATUS_ORDER.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setStatus(entry.sightId, s)}
                              className={`rounded-full border px-2 py-0.5 text-xs ${
                                entry.status === s
                                  ? 'border-(--color-fg) bg-(--color-fg) text-white'
                                  : 'border-(--color-border) bg-(--color-card) text-(--color-muted) hover:text-(--color-fg)'
                              }`}
                            >
                              {getStatusLabel(s)}
                            </button>
                          ))}
                        </div>
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
    <Suspense fallback={<p className="text-sm text-(--color-muted)">Ladataan…</p>}>
      <ShortlistPageInner />
    </Suspense>
  );
}
