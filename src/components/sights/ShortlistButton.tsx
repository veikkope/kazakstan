'use client';

import { Suspense } from 'react';
import { useShortlist } from '@/lib/shortlist';

interface Props {
  sightId: string;
  variant?: 'icon' | 'full';
}

function ShortlistButtonInner({ sightId, variant = 'icon' }: Props) {
  const { hydrated, has, toggle } = useShortlist();
  const active = hydrated && has(sightId);

  // Pre-hydration: render a stable placeholder so SSR/CSR match.
  const label = !hydrated
    ? '☆'
    : active
      ? variant === 'full'
        ? '★ Shortlistilla'
        : '★'
      : variant === 'full'
        ? '☆ Lisää shortlistille'
        : '☆';

  const sizing =
    variant === 'full'
      ? 'min-h-11 px-4 text-sm'
      : 'min-h-11 min-w-11 px-2 text-lg leading-none';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(sightId);
      }}
      disabled={!hydrated}
      aria-pressed={active}
      aria-label={active ? 'Poista shortlistilta' : 'Lisää shortlistille'}
      className={`inline-flex items-center justify-center rounded-md border transition ${sizing} ${
        active
          ? 'border-(--color-sand-dark) bg-(--color-sand) text-(--color-fg)'
          : 'border-(--color-border) bg-(--color-card) text-(--color-muted) hover:text-(--color-fg)'
      }`}
    >
      {label}
    </button>
  );
}

export default function ShortlistButton(props: Props) {
  const sizing =
    props.variant === 'full'
      ? 'min-h-11 px-4 text-sm'
      : 'min-h-11 min-w-11 px-2 text-lg leading-none';
  // useSearchParams (kautta useUrlState) vaatii Suspense-rajan staattisessa prerenderissä.
  return (
    <Suspense
      fallback={
        <button
          type="button"
          disabled
          className={`inline-flex items-center justify-center rounded-md border border-(--color-border) bg-(--color-card) text-(--color-muted) ${sizing}`}
        >
          ☆
        </button>
      }
    >
      <ShortlistButtonInner {...props} />
    </Suspense>
  );
}
