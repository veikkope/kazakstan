'use client';

import Link from 'next/link';
import { sights } from '@/data/sights';
import { findById } from '@/lib/filters';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { ItineraryDay, TransportMode, BookingUrgency, AnchorKind } from '@/lib/types';

const TRANSPORT_FI: Record<TransportMode, string> = {
  plane: '✈️ Lento',
  train: '🚆 Juna',
  car: '🚗 Auto',
  bus: '🚌 Bussi',
  taxi: '🚕 Taksi',
  walk: '🚶 Kävely',
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

type UrgencyMeta = {
  label: string;
  variant: 'destructive' | 'secondary' | 'outline' | 'default';
  className?: string;
};

const URGENCY_META: Record<BookingUrgency, UrgencyMeta> = {
  now: { label: 'Varaa heti', variant: 'destructive' },
  'week-before': {
    label: 'Varaa viikkoa ennen',
    variant: 'secondary',
    className: 'bg-amber-500/15 text-amber-700',
  },
  'on-arrival': {
    label: 'Varaa paikan päällä',
    variant: 'secondary',
    className: 'bg-blue-500/15 text-blue-700',
  },
  'walk-in': {
    label: 'Walk-in OK',
    variant: 'secondary',
    className: 'bg-emerald-500/15 text-emerald-700',
  },
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
  const itemValue = `day-${day.day}`;
  const ring = isToday
    ? 'border-(--color-steppe) ring-2 ring-(--color-steppe)/30'
    : 'border-(--color-border)';

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
                Päivä {day.day}
                {day.date ? ` — ${day.date}` : ''}
              </span>
              {day.city && (
                <span className="font-medium normal-case text-(--color-fg)">
                  · {day.city}
                </span>
              )}
              {isToday && (
                <Badge className="bg-(--color-steppe) text-white">Tänään</Badge>
              )}
              {day.earlyWakeRisk && (
                <span title="Aikainen herätys" aria-label="Aikainen herätys">
                  ⏰
                </span>
              )}
              {day.driverNeeded && (
                <span title="Kuljettaja tarvitaan" aria-label="Kuljettaja tarvitaan">
                  🚙
                </span>
              )}
              {day.offlineNote && (
                <span title="Offline-huomio" aria-label="Offline-huomio">
                  📵
                </span>
              )}
            </p>
            <h3 className="truncate text-base font-semibold text-(--color-fg) sm:text-lg">
              {day.title}
            </h3>
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-4 border-t border-(--color-border) px-5 py-4">
          <p className="text-sm text-(--color-muted)">{day.summary}</p>

          {/* Anchor events — locked-in items */}
          {day.anchors && day.anchors.length > 0 && (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                Ankkurit
              </p>
              <ul className="space-y-1 text-sm">
                {day.anchors.map((a, i) => {
                  const urgency = a.urgency ? URGENCY_META[a.urgency] : null;
                  return (
                    <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                      <span aria-hidden>{ANCHOR_ICON[a.kind]}</span>
                      {a.time && (
                        <span className="font-mono text-xs text-(--color-muted)">{a.time}</span>
                      )}
                      <span className="flex-1">{a.label}</span>
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
                Pää-suunnitelma
              </p>
              <p className="text-sm">{day.primaryPlan}</p>
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
                  Vaihtoehdot ({day.alternatives.length})
                </AccordionTrigger>
                <AccordionContent className="border-t border-(--color-border) px-3 py-3">
                  <ul className="space-y-3 text-sm">
                    {day.alternatives.map((alt, i) => (
                      <li key={i} className="space-y-1">
                        <p className="font-medium">{alt.title}</p>
                        <p className="text-(--color-muted)">{alt.summary}</p>
                        {alt.tradeoff && (
                          <p className="text-xs italic text-(--color-muted)">{alt.tradeoff}</p>
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
                Plan B
              </p>
              <p className="text-sm">{day.backupPlan}</p>
            </section>
          )}

          {/* Sights */}
          {day.sightIds.length > 0 && (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                Kohteet
              </p>
              <ul className="space-y-1 text-sm">
                {day.sightIds.map((id) => {
                  const s = findById(sights, id);
                  if (!s)
                    return (
                      <li key={id} className="text-(--color-muted)">
                        ⚠️ tuntematon: {id}
                      </li>
                    );
                  return (
                    <li key={id}>
                      → <Link href={`/nahtavyydet/${s.slug}`}>{s.name}</Link>
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
                Liikkuminen
              </p>
              <ul className="space-y-1 text-sm">
                {day.transport.map((leg, i) => (
                  <li key={i}>
                    {TRANSPORT_FI[leg.mode]}
                    {leg.from && leg.to ? ` ${leg.from} → ${leg.to}` : ''}
                    {leg.note ? ` — ${leg.note}` : ''}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Operational meta — cash + offline */}
          <section className="flex flex-wrap gap-2">
            {typeof day.cashKZT === 'number' && day.cashKZT > 0 && (
              <Badge variant="outline" className="bg-(--color-bg) px-3 py-1">
                💰 Käteistä ~{formatKZT(day.cashKZT)}
              </Badge>
            )}
            {day.sleepCity && (
              <Badge variant="outline" className="bg-(--color-bg) px-3 py-1">
                🛏️ Yö: {day.sleepCity}
              </Badge>
            )}
          </section>

          {/* Lodging hint (new) — preferred over old accommodation field */}
          {day.lodgingHint ? (
            <section className="rounded-md border border-(--color-border) bg-(--color-bg) px-3 py-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                Majoitusvinkki
              </p>
              <p className="text-sm">
                <span className="font-medium">📍 {day.lodgingHint.area}</span>
                <span className="ml-2 text-(--color-muted)">
                  €{day.lodgingHint.priceRangeEUR[0]}–{day.lodgingHint.priceRangeEUR[1]} / yö
                </span>
              </p>
              <p className="mt-1 text-xs text-(--color-muted)">
                Varaa: {day.lodgingHint.bookingApps.join(', ')}
              </p>
              {day.lodgingHint.note && (
                <p className="mt-1 text-xs italic text-(--color-muted)">{day.lodgingHint.note}</p>
              )}
            </section>
          ) : day.accommodation ? (
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                Yöpyminen
              </p>
              <p className="text-sm">
                🛏️ {day.accommodation.city}
                {day.accommodation.name ? ` — ${day.accommodation.name}` : ''}
                {day.accommodation.note ? ` (${day.accommodation.note})` : ''}
              </p>
            </section>
          ) : null}

          {/* Offline note */}
          {day.offlineNote && (
            <p className="rounded-md border-l-2 border-blue-500/50 bg-blue-500/5 px-3 py-2 text-sm">
              {day.offlineNote}
            </p>
          )}

          {/* Free-form notes */}
          {day.notes && (
            <p className="rounded-md bg-(--color-bg) p-3 text-sm text-(--color-muted)">
              {day.notes}
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
