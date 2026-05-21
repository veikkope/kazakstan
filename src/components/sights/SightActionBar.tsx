'use client';

import { Suspense } from 'react';
import { Navigation, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Sight } from '@/lib/types';
import { useShortlist } from '@/lib/shortlist';
import { shareUrl } from '@/lib/share';
import { cn } from '@/lib/utils';

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

  async function onShare() {
    if (typeof window === 'undefined') return;
    const result = await shareUrl({
      url: window.location.href,
      title: `${sight.name} — Kazakstan-reissu`,
      text: sight.shortDescription,
    });
    if (result === 'copied') {
      toast.success('Linkki kopioitu', { description: 'Lähetä se kaverille' });
    } else if (result === 'error') {
      toast.error('Linkin kopiointi epäonnistui');
    }
    // 'shared' → native OS share sheet gives its own feedback; stay silent.
    // 'cancelled' → user dismissed; no toast.
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
        <Button
          asChild
          variant="default"
          className="min-h-12 flex-1 px-4 text-sm font-medium"
        >
          <a
            href={mapsDirectionUrl(sight)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Navigoi ${sight.name}`}
          >
            <Navigation className="size-4" aria-hidden />
            <span>Navigoi</span>
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => toggle(sight.id)}
          disabled={!hydrated}
          aria-pressed={active}
          aria-label={active ? 'Poista shortlistilta' : 'Lisää shortlistille'}
          className="min-h-12 min-w-12"
        >
          <Heart className={cn('size-5', active && 'fill-current text-(--color-sand-dark)')} aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onShare}
          aria-label="Jaa"
          className="min-h-12 min-w-12"
        >
          <Share2 className="size-5" aria-hidden />
        </Button>
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
