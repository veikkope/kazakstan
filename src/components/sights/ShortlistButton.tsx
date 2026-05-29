'use client';

import { Suspense } from 'react';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  SHORTLIST_SOFT_MAX,
  snapshotShortlist,
  useShortlist,
} from '@/lib/shortlist';
import { hapticTap } from '@/lib/haptic';
import { cn } from '@/lib/utils';

interface Props {
  sightId: string;
  sightName?: string;
  variant?: 'icon' | 'full';
}

function ShortlistButtonInner({ sightId, sightName, variant = 'icon' }: Props) {
  const t = useTranslations();
  const { hydrated, has, toggle } = useShortlist();
  const active = hydrated && has(sightId);

  const label = active
    ? t('components.shortlistButton.onShortlist')
    : t('components.shortlistButton.add');

  function handleToggle() {
    // Capture pre-toggle state so we know which direction we just moved.
    const wasActive = active;
    toggle(sightId);
    hapticTap();
    if (wasActive) {
      toast(t('components.shortlistButton.removedToast'));
      return;
    }
    // Read the post-toggle count to detect the moment we cross the soft cap.
    // Snapshot is synchronous after `toggle` because the store commits before
    // returning, so this reflects the just-added entry.
    const newCount = snapshotShortlist().length;
    if (newCount === SHORTLIST_SOFT_MAX + 1) {
      // Show once, at the crossing — repeating it on every add past 50
      // would be nag. The user can opt to keep adding; no hard block.
      toast.warning(
        t('components.shortlistButton.softMaxTitle', { count: newCount }),
        {
          description: t('components.shortlistButton.softMaxDescription'),
          duration: 8000,
        },
      );
      return;
    }
    toast.success(
      t('components.shortlistButton.addedToast'),
      sightName ? { description: sightName } : undefined,
    );
  }

  // Pre-hydration: render a stable, disabled outline button so SSR/CSR match.
  if (variant === 'full') {
    return (
      <Button
        type="button"
        variant={active ? 'default' : 'outline'}
        size="default"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggle();
        }}
        disabled={!hydrated}
        aria-pressed={active}
        aria-label={active ? t('components.shortlistButton.removeAria') : t('components.shortlistButton.addAria')}
        className="min-h-11 px-4"
      >
        <Star className={cn('size-4', active && 'fill-current')} aria-hidden />
        <span>{label}</span>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={active ? 'default' : 'outline'}
      size="icon"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }}
      disabled={!hydrated}
      aria-pressed={active}
      aria-label={active ? t('components.shortlistButton.removeAria') : t('components.shortlistButton.addAria')}
      className="min-h-11 min-w-11"
    >
      <Star className={cn('size-5', active && 'fill-current')} aria-hidden />
    </Button>
  );
}

export default function ShortlistButton(props: Props) {
  const t = useTranslations();
  const isFull = props.variant === 'full';
  // useSearchParams (kautta useUrlState) vaatii Suspense-rajan staattisessa prerenderissä.
  return (
    <Suspense
      fallback={
        <Button
          type="button"
          variant="outline"
          size={isFull ? 'default' : 'icon'}
          disabled
          aria-label={t('components.shortlistButton.addAria')}
          className={isFull ? 'min-h-11 px-4' : 'min-h-11 min-w-11'}
        >
          <Star className={isFull ? 'size-4' : 'size-5'} aria-hidden />
          {isFull && <span>{t('components.shortlistButton.add')}</span>}
        </Button>
      }
    >
      <ShortlistButtonInner {...props} />
    </Suspense>
  );
}
