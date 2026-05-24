'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronDown, Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { categoryMeta, regionMeta } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Region, Sight } from '@/lib/types';
import { cn } from '@/lib/utils';
import OverallStars from './OverallStars';

interface Props {
  sights: Sight[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Top-pick ids — rows get a filled ★ matching the priority map pin. */
  priorityIds?: ReadonlySet<string>;
  /** Visited ids — rows get a ✓ overriding the ★. */
  visitedIds?: ReadonlySet<string>;
}

const REGION_ORDER: Region[] = [
  'almaty',
  'almaty-region',
  'astana',
  'turkistan',
  'shymkent',
  'aktau',
  'other',
];

/**
 * Region-grouped, collapsible list. Accordion behaviour (one open at a
 * time) keeps the on-screen footprint small on mobile where the list
 * lives in a bottom overlay, and reduces scroll fatigue with ~50 sights.
 *
 * Open state is driven by React but the actual disclosure widget is a
 * native `<details>`. That gives free keyboard support, screen-reader
 * semantics, and bypasses the iOS tap-delay quirk some custom
 * accordions have.
 */
export default function SightList({
  sights,
  selectedId,
  onSelect,
  priorityIds,
  visitedIds,
}: Props) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const grouped = useMemo(() => {
    const m = new Map<Region, Sight[]>();
    for (const s of sights) {
      const arr = m.get(s.region);
      if (arr) arr.push(s);
      else m.set(s.region, [s]);
    }
    return m;
  }, [sights]);

  // Default to the first region with items so a fresh visit doesn't show
  // a wall of collapsed headers. Computed once from initial props — later
  // filter changes don't reset (user-toggled state is sticky).
  const [openRegion, setOpenRegion] = useState<Region | null>(() => {
    for (const r of REGION_ORDER) {
      if (sights.some((s) => s.region === r)) return r;
    }
    return null;
  });

  // Auto-open the region containing the currently selected sight so the
  // user sees their pin reflected in the list. Uses the React 19 prop-
  // change derive pattern (track previous via state, compare in render)
  // instead of useEffect — preferred for "react to a prop change" sync.
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(
    selectedId,
  );
  if (selectedId !== lastSelectedId) {
    setLastSelectedId(selectedId);
    if (selectedId) {
      const sight = sights.find((s) => s.id === selectedId);
      if (sight && sight.region !== openRegion) setOpenRegion(sight.region);
    }
  }

  if (sights.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-(--color-muted)">
        {t('components.sightList.empty')}
      </p>
    );
  }

  return (
    <div className="divide-y divide-(--color-border)">
      {REGION_ORDER.map((region) => {
        const items = grouped.get(region);
        if (!items || items.length === 0) return null;
        const isOpen = openRegion === region;
        const meta = regionMeta[region];
        const regionLabel = localised(meta.label, loc);
        const regionSubtitle = meta.subtitle ? localised(meta.subtitle, loc) : undefined;
        return (
          <details
            key={region}
            open={isOpen}
            onToggle={(e) => {
              const next = e.currentTarget.open;
              // Mirror native toggle into accordion state. The `else if`
              // ignores the cascade close that fires when opening another
              // region (we already set state from that one's onToggle).
              if (next) setOpenRegion(region);
              else if (isOpen) setOpenRegion(null);
            }}
            className="group/region"
          >
            <summary
              aria-label={t('components.sightList.regionAria', { region: regionLabel, count: items.length })}
              className={cn(
                'flex min-h-12 cursor-pointer list-none select-none items-center gap-3 px-3 py-3 transition-colors',
                'hover:bg-(--color-bg) active:bg-(--color-bg)',
                'focus-visible:outline-none focus-visible:bg-(--color-bg)',
                "[&::-webkit-details-marker]:hidden",
              )}
            >
              <ChevronDown
                aria-hidden
                className="size-4 shrink-0 -rotate-90 text-(--color-muted) transition-transform duration-150 group-open/region:rotate-0"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-(--color-fg)">
                  {regionLabel}
                </span>
                {regionSubtitle && !isOpen && (
                  <span className="block truncate text-xs text-(--color-muted)">
                    {regionSubtitle}
                  </span>
                )}
              </span>
              <span className="shrink-0 rounded-full bg-(--color-bg) px-2.5 py-0.5 text-xs font-medium tabular-nums text-(--color-muted) group-open/region:bg-(--color-card) group-open/region:ring-1 group-open/region:ring-(--color-border)">
                {items.length}
              </span>
            </summary>
            <ul className="divide-y divide-(--color-border) border-t border-(--color-border) bg-(--color-bg)/30">
              {items.map((s) => {
                const isSelected = s.id === selectedId;
                const isVisited = visitedIds?.has(s.id) ?? false;
                const isPriority =
                  !isVisited && (priorityIds?.has(s.id) ?? false);
                const catMeta = categoryMeta[s.category];
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(s.id)}
                      className={cn(
                        'block w-full px-3 py-3 pl-10 text-left transition-colors',
                        isSelected
                          ? 'bg-(--color-steppe)/10'
                          : 'hover:bg-(--color-bg)',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-1.5 font-medium text-(--color-fg)">
                          {isVisited ? (
                            <Check
                              className="size-3.5 shrink-0 text-emerald-500"
                              strokeWidth={3}
                              aria-label={t('components.sightList.visitedAria')}
                            />
                          ) : isPriority ? (
                            <Star
                              className="size-3.5 shrink-0 fill-amber-400 text-amber-400"
                              aria-label={t('components.sightList.favoriteAria')}
                            />
                          ) : null}
                          <span className="truncate">{localised(s.name, loc)}</span>
                        </span>
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] text-white"
                          style={{ backgroundColor: catMeta.color }}
                        >
                          {localised(catMeta.label, loc)}
                        </span>
                      </div>
                      {s.ratings && (
                        <div className="mt-1">
                          <OverallStars
                            ratings={s.ratings}
                            showBadge={false}
                          />
                        </div>
                      )}
                      <p className="mt-1 line-clamp-2 text-xs text-(--color-muted)">
                        {localised(s.shortDescription, loc)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </div>
  );
}
