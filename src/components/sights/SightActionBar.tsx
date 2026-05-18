'use client';

import { Suspense, useState } from 'react';
import type { Sight } from '@/lib/types';
import { useShortlist } from '@/lib/shortlist';
import { shareUrl } from '@/lib/share';

interface Props {
  sight: Sight;
}

/**
 * Universal "open in maps" URL. Works on iOS, Android, and desktop:
 * the OS picks Apple Maps / Google Maps / browser as appropriate.
 */
function mapsDirectionUrl(sight: Sight): string {
  const dest = `${sight.coords.lat},${sight.coords.lng}`;
  const label = encodeURIComponent(sight.name);
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}&destination_place_id=${label}`;
}

function SightActionBarInner({ sight }: Props) {
  const { hydrated, has, toggle } = useShortlist();
  const active = hydrated && has(sight.id);
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'error'>('idle');

  async function onShare() {
    if (typeof window === 'undefined') return;
    const result = await shareUrl({
      url: window.location.href,
      title: `${sight.name} — Kazakstan-reissu`,
      text: sight.shortDescription,
    });
    if (result === 'copied') {
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2000);
    } else if (result === 'error') {
      setShareState('error');
      setTimeout(() => setShareState('idle'), 2000);
    }
  }

  return (
    <div
      className="fixed inset-x-0 z-30 border-t border-(--color-border) bg-(--color-card)/95 backdrop-blur lg:hidden"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom) + 56px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-stretch gap-2 px-3 py-2 sm:bottom-0">
        <a
          href={mapsDirectionUrl(sight)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Navigoi ${sight.name}`}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-(--color-steppe) px-4 text-sm font-medium text-white hover:bg-(--color-steppe-dark) hover:no-underline"
        >
          <span aria-hidden>🗺️</span>
          <span>Navigoi</span>
        </a>
        <button
          type="button"
          onClick={() => toggle(sight.id)}
          disabled={!hydrated}
          aria-pressed={active}
          aria-label={active ? 'Poista shortlistilta' : 'Lisää shortlistille'}
          className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-md border text-lg ${
            active
              ? 'border-(--color-sand-dark) bg-(--color-sand) text-(--color-fg)'
              : 'border-(--color-border) bg-(--color-card) text-(--color-muted)'
          }`}
        >
          {active ? '★' : '☆'}
        </button>
        <button
          type="button"
          onClick={onShare}
          aria-label="Jaa"
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md border border-(--color-border) bg-(--color-card) text-base text-(--color-muted) hover:text-(--color-fg)"
        >
          {shareState === 'copied' ? '✓' : shareState === 'error' ? '!' : '↗'}
        </button>
      </div>
    </div>
  );
}

export default function SightActionBar(props: Props) {
  // useShortlist reads searchParams transitively — needs a Suspense boundary
  // during static prerender, mirroring ShortlistButton.
  return (
    <Suspense fallback={null}>
      <SightActionBarInner {...props} />
    </Suspense>
  );
}
