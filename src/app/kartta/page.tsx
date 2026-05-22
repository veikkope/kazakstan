'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { Info, List as ListIcon, Map as MapIcon } from 'lucide-react';
import MapViewClient from '@/components/map/MapView.client';
import CategoryFilter from '@/components/map/CategoryFilter';
import SightList from '@/components/sights/SightList';
import { Button } from '@/components/ui/button';
import { sights } from '@/data/sights';
import { excludeDrafts, filterByCategories } from '@/lib/filters';
import { useUrlState } from '@/lib/url-state';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ViewMode = 'map' | 'list';

function KarttaPageInner() {
  const { state, update } = useUrlState();
  // Mobile-only canvas toggle. Desktop uses side-by-side layout and
  // ignores this — state is intentionally not in URL since it's purely
  // ephemeral mobile chrome.
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  // Lock the page to the viewport: the map fills the available space
  // between Header and BottomNav, no document scroll, Footer hidden.
  // Cleanup on unmount restores defaults so the rest of the app keeps
  // its normal flow.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    body.classList.add('kartta-locked');
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.classList.remove('kartta-locked');
    };
  }, []);

  const visible = useMemo(() => {
    return filterByCategories(excludeDrafts(sights), state.categories);
  }, [state.categories]);

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
      <h1 className="sr-only sm:hidden">Kartta</h1>

      {/* Desktop title row + info */}
      <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-3">
        <h1 className="text-2xl font-semibold">Kartta</h1>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span>{visible.length} kohdetta.</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Karttavinkki"
                className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <Info className="size-4" aria-hidden />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Klikkaa pini tai listariviä kun haluat zoomata.
            </TooltipContent>
          </Tooltip>
        </p>
      </div>

      {/* Desktop filter (inline above map) */}
      <div className="hidden sm:block">
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
      <div className="relative flex h-[calc(100dvh-3rem-4rem-env(safe-area-inset-bottom))] sm:h-[70dvh] sm:flex-row sm:gap-3">
        {/* Map canvas (always mounted) */}
        <div className="relative h-full flex-1 overflow-hidden sm:overflow-hidden sm:rounded-lg sm:border sm:border-border">
          <MapViewClient
            sights={visible}
            selectedId={state.selectedId}
            onSelect={(id) => update({ selectedId: id })}
          />

          {/*
            Mobile filter chips overlay — sits on top of the map at the
            top edge. backdrop-blur with translucent fill keeps the map
            visible behind the chips. z above Leaflet's max control z so
            the chip row never disappears behind cluster bubbles.
          */}
          <div className="absolute inset-x-0 top-0 z-[1015] border-b border-border bg-background/95 backdrop-blur-md sm:hidden">
            <div className="overflow-x-auto px-3 py-2 [-webkit-overflow-scrolling:touch]">
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
          */}
          {viewMode === 'list' && (
            <div
              role="region"
              aria-label="Kohteet listana"
              className="absolute inset-0 z-[1010] overflow-y-auto overscroll-contain bg-background pt-14 sm:hidden"
            >
              <SightList
                sights={visible}
                selectedId={state.selectedId}
                onSelect={handleListSelect}
              />
            </div>
          )}

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
                  ? `Vaihda listanäkymään — ${visible.length} kohdetta`
                  : 'Vaihda karttanäkymään'
              }
              className="pointer-events-auto h-11 gap-2 rounded-full px-5 shadow-lg ring-1 ring-foreground/10"
            >
              {viewMode === 'map' ? (
                <>
                  <ListIcon aria-hidden="true" className="size-4" />
                  <span className="text-sm font-medium">Lista</span>
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
                  <span className="text-sm font-medium">Kartta</span>
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
              />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default function KarttaPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Ladataan…</p>}>
      <KarttaPageInner />
    </Suspense>
  );
}
