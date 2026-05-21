'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { sights } from '@/data/sights';
import { categoryMeta } from '@/data/categories';
import { findById } from '@/lib/filters';
import { useShortlist, getStatusLabel } from '@/lib/shortlist';
import { shareUrl } from '@/lib/share';
import type { ShortlistStatus } from '@/lib/types';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

const STATUS_ORDER: ShortlistStatus[] = ['in', 'considering', 'out'];

const STATUS_VARIANT: Record<ShortlistStatus, 'default' | 'secondary' | 'outline'> = {
  in: 'default',
  considering: 'secondary',
  out: 'outline',
};

function ShortlistPageInner() {
  const { entries, hydrated, setStatus, remove, clear } = useShortlist();
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'error'>('idle');

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

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Ladataan…</p>;
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
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={clear}
              className="min-h-11"
            >
              Tyhjennä
            </Button>
          )}
        </div>
      </div>

      {entries.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Heart />
            </EmptyMedia>
            <EmptyTitle>Shortlist on tyhjä</EmptyTitle>
            <EmptyDescription>
              Lisää kohteita listalle Nähtävyydet-sivulta. Voit järjestää ne Mukaan /
              Harkinnassa / Pois -ryhmiin.
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
          {STATUS_ORDER.map((status) => {
            const items = grouped.get(status) ?? [];
            if (items.length === 0) return null;
            return (
              <section key={status} className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {getStatusLabel(status)} ({items.length})
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((entry) => {
                    const sight = findById(sights, entry.sightId);
                    if (!sight) return null;
                    const cat = categoryMeta[sight.category];
                    return (
                      <li key={entry.sightId}>
                        <Card size="sm">
                          <CardContent>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <Link
                                  href={`/nahtavyydet/${sight.slug}`}
                                  className="font-medium text-foreground hover:no-underline"
                                >
                                  {sight.name}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                  {cat.emoji} {cat.fi}
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-lg"
                                onClick={() => remove(entry.sightId)}
                                aria-label="Poista shortlistilta"
                                className="-mr-2 -mt-2 h-11 w-11 text-muted-foreground hover:text-foreground"
                              >
                                ✕
                              </Button>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {sight.shortDescription}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {STATUS_ORDER.map((s) => {
                                const isActive = entry.status === s;
                                return (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => setStatus(entry.sightId, s)}
                                    aria-pressed={isActive}
                                    className="inline-flex items-center"
                                  >
                                    <Badge
                                      variant={isActive ? STATUS_VARIANT[s] : 'outline'}
                                      className="min-h-11 cursor-pointer px-4 text-sm"
                                    >
                                      {getStatusLabel(s)}
                                    </Badge>
                                  </button>
                                );
                              })}
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
