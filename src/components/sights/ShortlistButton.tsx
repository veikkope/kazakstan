'use client';

import { Suspense } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useShortlist } from '@/lib/shortlist';
import { cn } from '@/lib/utils';

interface Props {
  sightId: string;
  sightName?: string;
  variant?: 'icon' | 'full';
}

function ShortlistButtonInner({ sightId, sightName, variant = 'icon' }: Props) {
  const { hydrated, has, toggle } = useShortlist();
  const active = hydrated && has(sightId);

  const label = active ? 'Shortlistilla' : 'Lisää shortlistille';

  function handleToggle() {
    // Capture pre-toggle state so we know which direction we just moved.
    const wasActive = active;
    toggle(sightId);
    if (wasActive) {
      toast('Poistettu listalta');
    } else {
      toast.success(
        'Lisätty Mukaan-listalle',
        sightName ? { description: sightName } : undefined,
      );
    }
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
        aria-label={active ? 'Poista shortlistilta' : 'Lisää shortlistille'}
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
      aria-label={active ? 'Poista shortlistilta' : 'Lisää shortlistille'}
      className="min-h-11 min-w-11"
    >
      <Star className={cn('size-5', active && 'fill-current')} aria-hidden />
    </Button>
  );
}

export default function ShortlistButton(props: Props) {
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
          aria-label="Lisää shortlistille"
          className={isFull ? 'min-h-11 px-4' : 'min-h-11 min-w-11'}
        >
          <Star className={isFull ? 'size-4' : 'size-5'} aria-hidden />
          {isFull && <span>Lisää shortlistille</span>}
        </Button>
      }
    >
      <ShortlistButtonInner {...props} />
    </Suspense>
  );
}
