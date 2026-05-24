'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { sights } from '@/data/sights';
import { findById } from '@/lib/filters';
import { asLocale, localised } from '@/lib/i18n-helpers';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { ItineraryDay, TransportMode, BookingUrgency, AnchorKind } from '@/lib/types';

/** Emoji glyphs are locale-neutral; map types live next to the helpers
 *  that resolve their localised labels via `useTranslations`. */
const TRANSPORT_EMOJI: Record<TransportMode, string> = {
  plane: '✈️',
  train: '🚆',
  car: '🚗',
  bus: '🚌',
  taxi: '🚕',
  walk: '🚶',
};

const ANCHOR_ICON: Record<AnchorKind, string> = {
  flight: '✈️',
  train: '🚆',
  drive: '🚗',
  arrival: '📍',
  departure: '🛫',
  tour: '🧭',
  checkin: '🔑',
  checkout: '🚪',
};

type UrgencyVariant = 'destructive' | 'secondary' | 'outline' | 'default';

const URGENCY_VARIANT: Record<BookingUrgency, UrgencyVariant> = {
  now: 'destructive',
  'week-before': 'secondary',
  'on-arrival': 'secondary',
  'walk-in': 'secondary',
};

const URGENCY_CLASSNAME: Partial<Record<BookingUrgency, string>> = {
  'week-before': 'bg-amber-500/15 text-amber-700',
  'on-arrival': 'bg-blue-500/15 text-blue-700',
  'walk-in': 'bg-emerald-500/15 text-emerald-700',
};

function formatKZT(n: number): string {
  return new Intl.NumberFormat('fi-FI').format(n) + ' ₸';
}

interface Props {
  day: ItineraryDay;
  defaultOpen?: boolean;
  isToday?: boolean;
}

export default function DayCard({ day, defaultOpen, isToday }: Props) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const itemValue = `day-${day.day}`;
  const ring = isToday
    ? 'border-(--color-steppe) ring-2 ring-(--color-steppe)/30'
    : 'border-(--color-border)';

  const transportLabel = (mode: TransportMode): string =>
    `${TRANSPORT_EMOJI[mode]} ${t(`components.dayCard.transport.${mode}`)}`;
  const urgencyLabel = (u: BookingUrgency): string =>
    t(`components.dayCard.urgency.${u}`);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? itemValue : undefined}
      id={`day-${day.day}`}
      className={`scroll-mt-20 rounded-lg border bg-(--color-card) ${ring}`}
    >
      <AccordionItem value={itemValue} className="border-b-0">
        <AccordionTrigger className="min-h-14 items-center rounded-lg border-transparent px-5 py-3 hover:no-underline">
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-(--color-muted)">
              <span>
                {t('components.dayCard.dayLabel', { day: day.day })}
                {day.date ? ` — ${day.date}` : ''}
              </span>
              {day.city && (
                <span className="font-medium normal-case text-(--color-fg)">
                  · {localised(day.city, loc)}
                </span>
              )}
              {isToday && (
                <Badge className="bg-(--color-steppe) text-white">
                  {t('components.dayCard.todayBadge')}
                </Badge>
              )}
              {day.earlyWakeRisk && (
                <span
                  title={t('components.dayCard.earlyWake')}
                  aria-label={t('components.dayCard.earlyWake')}
                >
                  ⏰
                </span>
              )}
              {day.driverNeeded && (
                <span
                  title={t('components.dayCard.driverNeeded')}
                  aria-label={t('components.dayCard.driverNeeded')}
                >
                  🚙
                </span>
              )}
              {day.offlineNote && (
                <span
                  title={t('components.dayCard.offlineNote')}
                  aria-label={t('components.dayCard.offlineNote')}
                >
                  📵
                </span>
              )}
            </p>
            <h3 className="truncate text-base font-semibold text-(--color-fg) sm:text-lg">
              {localised(day.title, loc)}
            </h3>
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-4 border-t border-(--color-border) px-5 py-4">
          <p className="text-sm text-(--color-muted)">{localised(day.summary, loc)}</p>

          {/* Anchor events — locked-in items */}
          {day.anchors && day.anchors.length > 0 && (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                {t('components.dayCard.anchors')}
              </p>
              <ul className="space-y-1 text-sm">
                {day.anchors.map((a, i) => {
                  const urgency = a.urgency
                    ? {
                        label: urgencyLabel(a.urgency),
                        variant: URGENCY_VARIANT[a.urgency],
                        className: URGENCY_CLASSNAME[a.urgency],
                      }
                    : null;
                  return (
                    <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                      <span aria-hidden>{ANCHOR_ICON[a.kind]}</span>
                      {a.time && (
                        <span className="font-mono text-xs text-(--color-muted)">{localised(a.time, loc)}</span>
                      )}
                      <span className="flex-1">{localised(a.label, loc)}</span>
                      {urgency && (
                        <Badge variant={urgency.variant} className={urgency.className}>
                          {urgency.label}
                        </Badge>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Primary plan */}
          {day.primaryPlan && (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                {t('components.dayCard.primaryPlan')}
              </p>
              <p className="text-sm">{localised(day.primaryPlan, loc)}</p>
            </section>
          )}

          {/* Alternatives */}
          {day.alternatives && day.alternatives.length > 0 && (
            <Accordion
              type="single"
              collapsible
              className="rounded-md border border-(--color-border) bg-(--color-bg)"
            >
              <AccordionItem value="alternatives" className="border-b-0">
                <AccordionTrigger className="rounded-md border-transparent px-3 py-2 text-xs font-semibold uppercase tracking-wide text-(--color-muted) hover:no-underline">
                  {t('components.dayCard.alternatives', {
                    count: day.alternatives.length,
                  })}
                </AccordionTrigger>
                <AccordionContent className="border-t border-(--color-border) px-3 py-3">
                  <ul className="space-y-3 text-sm">
                    {day.alternatives.map((alt, i) => (
                      <li key={i} className="space-y-1">
                        <p className="font-medium">{localised(alt.title, loc)}</p>
                        <p className="text-(--color-muted)">{localised(alt.summary, loc)}</p>
                        {alt.tradeoff && (
                          <p className="text-xs italic text-(--color-muted)">{localised(alt.tradeoff, loc)}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* Backup plan */}
          {day.backupPlan && (
            <section className="rounded-md border-l-2 border-amber-500/50 bg-amber-500/5 px-3 py-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                {t('components.dayCard.planB')}
              </p>
              <p className="text-sm">{localised(day.backupPlan, loc)}</p>
            </section>
          )}

          {/* Sights */}
          {day.sightIds.length > 0 && (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                {t('components.dayCard.sights')}
              </p>
              <ul className="space-y-1 text-sm">
                {day.sightIds.map((id) => {
                  const s = findById(sights, id);
                  if (!s)
                    return (
                      <li key={id} className="text-(--color-muted)">
                        {t('components.dayCard.unknownSight', { id })}
                      </li>
                    );
                  return (
                    <li key={id}>
                      → <Link href={`/sights/${s.slug}`}>{localised(s.name, loc)}</Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Transport */}
          {day.transport && day.transport.length > 0 && (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                {t('components.dayCard.transportSection')}
              </p>
              <ul className="space-y-1 text-sm">
                {day.transport.map((leg, i) => (
                  <li key={i}>
                    {transportLabel(leg.mode)}
                    {leg.from && leg.to ? ` ${localised(leg.from, loc)} → ${localised(leg.to, loc)}` : ''}
                    {leg.note ? ` — ${localised(leg.note, loc)}` : ''}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Operational meta — cash + offline */}
          <section className="flex flex-wrap gap-2">
            {typeof day.cashKZT === 'number' && day.cashKZT > 0 && (
              <Badge variant="outline" className="bg-(--color-bg) px-3 py-1">
                {t('components.dayCard.cashBadge', { amount: formatKZT(day.cashKZT) })}
              </Badge>
            )}
            {day.sleepCity && (
              <Badge variant="outline" className="bg-(--color-bg) px-3 py-1">
                {t('components.dayCard.sleepBadge', { city: localised(day.sleepCity, loc) })}
              </Badge>
            )}
          </section>

          {/* Lodging hint (new) — preferred over old accommodation field */}
          {day.lodgingHint ? (
            <section className="rounded-md border border-(--color-border) bg-(--color-bg) px-3 py-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                {t('components.dayCard.lodgingHint')}
              </p>
              <p className="text-sm">
                <span className="font-medium">📍 {localised(day.lodgingHint.area, loc)}</span>
                <span className="ml-2 text-(--color-muted)">
                  {t('components.dayCard.lodgingPrice', {
                    min: day.lodgingHint.priceRangeEUR[0],
                    max: day.lodgingHint.priceRangeEUR[1],
                  })}
                </span>
              </p>
              <p className="mt-1 text-xs text-(--color-muted)">
                {t('components.dayCard.lodgingBook', {
                  apps: day.lodgingHint.bookingApps.join(', '),
                })}
              </p>
              {day.lodgingHint.note && (
                <p className="mt-1 text-xs italic text-(--color-muted)">{localised(day.lodgingHint.note, loc)}</p>
              )}
            </section>
          ) : day.accommodation ? (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                {t('components.dayCard.accommodation')}
              </p>
              <p className="text-sm">
                🛏️ {localised(day.accommodation.city, loc)}
                {day.accommodation.name ? ` — ${localised(day.accommodation.name, loc)}` : ''}
                {day.accommodation.note ? ` (${localised(day.accommodation.note, loc)})` : ''}
              </p>
            </section>
          ) : null}

          {/* Offline note */}
          {day.offlineNote && (
            <p className="rounded-md border-l-2 border-blue-500/50 bg-blue-500/5 px-3 py-2 text-sm">
              {localised(day.offlineNote, loc)}
            </p>
          )}

          {/* Free-form notes */}
          {day.notes && (
            <p className="rounded-md bg-(--color-bg) p-3 text-sm text-(--color-muted)">
              {localised(day.notes, loc)}
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
