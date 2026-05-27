'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Info, List as ListIcon, Map as MapIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import MapViewClient from '@/components/map/MapView.client';
import CategoryFilter from '@/components/map/CategoryFilter';
import SearchInput from '@/components/sights/SearchInput';
import SightList from '@/components/sights/SightList';
import { Button } from '@/components/ui/button';
import { sights } from '@/data/sights';
import { carRental } from '@/data/logistics';
import type { TripPin } from '@/lib/types';
import { filterByCategories } from '@/lib/filters';
import { filterBySearch } from '@/lib/search';
import { asLocale, localised } from '@/lib/i18n-helpers';
import { useUrlState } from '@/lib/url-state';
import { useShortlist } from '@/lib/shortlist';
import { useWakeLock } from '@/lib/wake-lock';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ViewMode = 'map' | 'list';

function KarttaPageInner() {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const { state, update } = useUrlState();
  const { entries: shortlistEntries } = useShortlist();
  // Keep the screen awake while the passenger is following the map — the
  // primary use case for this page on the road. No-op where unsupported.
  useWakeLock();
  // Sets are memoised on the entries array — keeps the marker
  // popup/icon-sync effects from re-running on unrelated re-renders.
  // priorityIds and visitedIds are both subsets of shortlistIds (you
  // can only mark on-list entries as suosikki/käyty).
  const shortlistIds = useMemo(
    () => new Set(shortlistEntries.map((e) => e.sightId)),
    [shortlistEntries],
  );
  const priorityIds = useMemo(
    () =>
      new Set(
        shortlistEntries.filter((e) => e.priority).map((e) => e.sightId),
      ),
    [shortlistEntries],
  );
  const visitedIds = useMemo(
    () =>
      new Set(
        shortlistEntries.filter((e) => e.visitedAt).map((e) => e.sightId),
      ),
    [shortlistEntries],
  );
  // Mobile-only canvas toggle. Desktop uses side-by-side layout and
  // ignores this — state is intentionally not in URL since it's purely
  // ephemeral mobile chrome.
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  // Lock the page to the viewport — MOBILE ONLY. On phones the map fills
  // the space between Header and BottomNav with no document scroll (Footer
  // hidden). Desktop uses normal flow (title + filters + 70dvh map + sidebar)
  // which is taller than the viewport and MUST scroll normally, so the lock
  // must not apply there. We mirror Tailwind's `sm` breakpoint (640px) and
  // re-evaluate on resize so crossing the breakpoint flips the lock cleanly.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const mql = window.matchMedia('(max-width: 639.98px)');

    const apply = () => {
      if (mql.matches) {
        html.style.overflow = 'hidden';
        body.classList.add('kartta-locked');
      } else {
        html.style.overflow = '';
        body.classList.remove('kartta-locked');
      }
    };

    apply();
    mql.addEventListener('change', apply);
    return () => {
      mql.removeEventListener('change', apply);
      html.style.overflow = '';
      body.classList.remove('kartta-locked');
    };
  }, []);

  // Cheapest filter first (set lookup) → text scan last. Both run only
  // when their source state changes thanks to useMemo deps.
  const verified = sights;
  const visible = useMemo(() => {
    const byCategory = filterByCategories(verified, state.categories);
    return filterBySearch(byCategory, state.q);
  }, [verified, state.categories, state.q]);

  // Stable handler — SearchInput's debounce effect re-runs when onChange
  // identity changes; using useCallback prevents the timer from being
  // cancelled on every parent rerender.
  const onSearchChange = useCallback(
    (q: string) => update({ q }),
    [update],
  );

  const tripPins = useMemo<TripPin[]>(
    () => [
      {
        id: 'rental-car-pickup',
        kind: 'rental-car',
        title: `${localised(carRental.operator, loc)} — ${localised(carRental.pickup.name, loc)}`,
        subtitle: t('pages.map.rentalPin.subtitle'),
        coords: carRental.pickup.coords,
        details: [
          t('pages.map.rentalPin.pickup', { date: carRental.pickupDate }),
          t('pages.map.rentalPin.return', { date: carRental.returnDate }),
          t('pages.map.rentalPin.address', { address: localised(carRental.pickup.address, loc) }),
          ...(carRental.hours
            ? [t('pages.map.rentalPin.hours', { hours: localised(carRental.hours, loc) })]
            : []),
        ],
        href: '/vuokra-auto',
        hrefLabel: t('pages.map.rentalPin.hrefLabel'),
      },
    ],
    [t, loc],
  );

  const handleListSelect = (id: string) => {
    update({ selectedId: id });
    // Snap back to the map so the user immediately sees the pin they
    // picked; PanToSelected handles the flyTo + popup.
    setViewMode('map');
  };

  return (
    // Edge-to-edge breakout cancels <main>'s `px-4 py-6 pb-24` so the
    // map can span from sticky Header to sticky BottomNav with no
    // wasted padding. Desktop reverts to normal flow.
    <div className="-mx-4 -mt-6 -mb-24 sm:mx-0 sm:mt-0 sm:mb-0 sm:space-y-3">
      {/* Mobile-only sr-only h1 — BottomNav already labels "Kartta" tab. */}
      <h1 className="sr-only sm:hidden">{t('pages.map.title')}</h1>

      {/* Desktop title row + info */}
      <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-3">
        <h1 className="text-2xl font-semibold">{t('pages.map.title')}</h1>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span>{t('pages.map.resultCount', { count: visible.length })}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={t('pages.map.tipAriaLabel')}
                className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <Info className="size-4" aria-hidden />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {t('pages.map.tipTooltip')}
            </TooltipContent>
          </Tooltip>
        </p>
      </div>

      {/* Desktop filter (inline above map) — search input on top, then
          category chips so the same vertical priority holds across
          /kartta and /nahtavyydet. */}
      <div className="hidden space-y-3 sm:block">
        <SearchInput
          value={state.q}
          onChange={onSearchChange}
          resultCount={visible.length}
          totalCount={verified.length}
          className="max-w-md"
        />
        <CategoryFilter
          value={state.categories}
          onChange={(categories) => update({ categories })}
        />
      </div>

      {/*
        Map area.
        Mobile: full viewport between Header (3rem / 48px compact) and
        BottomNav (~4rem natural + env(safe-area-inset-bottom) for the
        home indicator on notched phones). Filter chips overlay the top
        of the canvas. dvh adapts to Safari address-bar autohide.
        Desktop: classic 70dvh side-by-side with sidebar.
      */}
      {/* `isolate` traps Leaflet's internal z-index (panes ~400, controls
          ~1000) inside this stacking context so they can't paint over the
          sticky Header (z-20) when the desktop page scrolls. */}
      <div className="relative isolate flex h-[calc(100dvh-var(--app-header-h)-var(--offline-banner-h)-var(--bottom-nav-h)-env(safe-area-inset-bottom))] sm:h-[70dvh] sm:flex-row sm:gap-3">
        {/* Map canvas (always mounted) */}
        <div className="relative h-full flex-1 overflow-hidden sm:overflow-hidden sm:rounded-lg sm:border sm:border-border">
          <MapViewClient
            sights={visible}
            selectedId={state.selectedId}
            onSelect={(id) => update({ selectedId: id })}
            shortlistIds={shortlistIds}
            priorityIds={priorityIds}
            visitedIds={visitedIds}
            tripPins={tripPins}
          />

          {/*
            Mobile filter chips overlay — sits on top of the map at the
            top edge. backdrop-blur with translucent fill keeps the map
            visible behind the chips. z above Leaflet's max control z so
            the chip row never disappears behind cluster bubbles.
          */}
          <div className="absolute inset-x-0 top-0 z-[1015] space-y-2 border-b border-border bg-background/95 px-3 py-2 backdrop-blur-md sm:hidden">
            <SearchInput
              value={state.q}
              onChange={onSearchChange}
              resultCount={visible.length}
              totalCount={verified.length}
            />
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
              <CategoryFilter
                value={state.categories}
                onChange={(categories) => update({ categories })}
              />
            </div>
          </div>

          {/*
            Mobile list overlay — covers map when viewMode==='list'.
            pt-14 clears the filter overlay above; the filter stays
            tappable in list mode (filter z=1015 > list z=1010).
            Kept mounted (toggled via `hidden`) so collapsible-section
            state inside <SightList> survives map↔list view toggles.
          */}
          {/* pt clears the filter overlay (search input + chip row + the
              outer py-2 padding). Bumped from 14 → 28 when SearchInput
              joined the overlay — keep these in sync if either changes. */}
          <div
            role="region"
            aria-label={t('pages.map.listRegionAriaLabel')}
            aria-hidden={viewMode !== 'list'}
            className={cn(
              'absolute inset-0 z-[1010] overflow-y-auto overscroll-contain bg-background pt-28 sm:hidden',
              viewMode !== 'list' && 'hidden',
            )}
          >
            <SightList
              sights={visible}
              selectedId={state.selectedId}
              onSelect={handleListSelect}
              priorityIds={priorityIds}
              visitedIds={visitedIds}
            />
          </div>

          {/*
            View toggle FAB — centered along the bottom, above both
            map and list overlay. bottom-6 keeps it clear of iOS safe
            area when BottomNav's safe-area padding is added.
          */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[1020] flex justify-center sm:hidden">
            <Button
              type="button"
              variant="default"
              onClick={() =>
                setViewMode((prev) => (prev === 'map' ? 'list' : 'map'))
              }
              aria-pressed={viewMode === 'list'}
              aria-label={
                viewMode === 'map'
                  ? t('pages.map.switchToListAriaLabel', { count: visible.length })
                  : t('pages.map.switchToMapAriaLabel')
              }
              className="pointer-events-auto h-11 gap-2 rounded-full px-5 shadow-lg ring-1 ring-foreground/10"
            >
              {viewMode === 'map' ? (
                <>
                  <ListIcon aria-hidden="true" className="size-4" />
                  <span className="text-sm font-medium">{t('pages.map.list')}</span>
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs font-semibold tabular-nums"
                  >
                    {visible.length}
                  </span>
                </>
              ) : (
                <>
                  <MapIcon aria-hidden="true" className="size-4" />
                  <span className="text-sm font-medium">{t('pages.map.map')}</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Desktop sidebar list */}
        <aside className="hidden sm:block sm:w-80">
          <Card className="h-full gap-0 overflow-hidden py-0">
            <div className="h-full overflow-y-auto">
              <SightList
                sights={visible}
                selectedId={state.selectedId}
                onSelect={(id) =>
                  update({ selectedId: id === state.selectedId ? null : id })
                }
                priorityIds={priorityIds}
                visitedIds={visitedIds}
              />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function MapPageFallback() {
  const t = useTranslations();
  return <p className="text-sm text-muted-foreground">{t('common.loading')}</p>;
}

export default function KarttaPage() {
  return (
    <Suspense fallback={<MapPageFallback />}>
      <KarttaPageInner />
    </Suspense>
  );
}
