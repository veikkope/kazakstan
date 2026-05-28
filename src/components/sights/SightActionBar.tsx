'use client';

import { Suspense } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import NavigateMenu from '@/components/navigation/NavigateMenu';
import type { Sight } from '@/lib/types';
import { asLocale, localised } from '@/lib/i18n-helpers';
import { useShortlist } from '@/lib/shortlist';
import { shareUrl } from '@/lib/share';
import { hapticSuccess, hapticTap } from '@/lib/haptic';
import { cn } from '@/lib/utils';

interface Props {
  sight: Sight;
}

function SightActionBarInner({ sight }: Props) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const { hydrated, has, toggle } = useShortlist();
  const active = hydrated && has(sight.id);
  const sightName = localised(sight.name, loc);

  async function onShare() {
    if (typeof window === 'undefined') return;
    hapticTap();
    const result = await shareUrl({
      url: window.location.href,
      title: t('components.sightActionBar.shareTitle', { name: sightName }),
      text: localised(sight.shortDescription, loc),
    });
    if (result === 'copied') {
      hapticSuccess();
      toast.success(t('components.sightActionBar.linkCopiedTitle'), {
        description: t('components.sightActionBar.linkCopiedDescription'),
      });
    } else if (result === 'error') {
      toast.error(t('components.sightActionBar.linkCopyError'));
    } else if (result === 'shared') {
      hapticSuccess();
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
        <NavigateMenu
          coords={sight.coords}
          label={sightName}
          region={sight.region}
          triggerText={t('components.sightActionBar.navigate')}
          className="min-h-12 flex-1 text-sm font-medium"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            toggle(sight.id);
            hapticTap();
          }}
          disabled={!hydrated}
          aria-pressed={active}
          aria-label={active ? t('components.sightActionBar.removeShortlistAria') : t('components.sightActionBar.addShortlistAria')}
          className="min-h-12 min-w-12"
        >
          <Heart className={cn('size-5', active && 'fill-current text-(--color-sand-dark)')} aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onShare}
          aria-label={t('components.sightActionBar.shareAria')}
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
