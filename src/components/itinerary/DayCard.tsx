import Link from 'next/link';
import { sights } from '@/data/sights';
import { findById } from '@/lib/filters';
import type { ItineraryDay, TransportMode } from '@/lib/types';

const TRANSPORT_FI: Record<TransportMode, string> = {
  plane: '✈️ Lento',
  train: '🚆 Juna',
  car: '🚗 Auto',
  bus: '🚌 Bussi',
  taxi: '🚕 Taksi',
  walk: '🚶 Kävely',
};

interface Props {
  day: ItineraryDay;
  /** Open the disclosure by default (e.g. the day matching today's date). */
  defaultOpen?: boolean;
  /** Highlight visually as the "today" card. */
  isToday?: boolean;
}

export default function DayCard({ day, defaultOpen, isToday }: Props) {
  const ring = isToday ? 'border-(--color-steppe) ring-2 ring-(--color-steppe)/30' : 'border-(--color-border)';

  return (
    <details
      id={`day-${day.day}`}
      open={defaultOpen}
      className={`group scroll-mt-20 rounded-lg border bg-(--color-card) ${ring}`}
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-(--color-muted)">
            Päivä {day.day}
            {day.date ? ` — ${day.date}` : ''}
            {isToday && (
              <span className="ml-2 rounded-full bg-(--color-steppe) px-2 py-0.5 text-[10px] text-white">
                Tänään
              </span>
            )}
          </p>
          <h3 className="truncate text-base font-semibold text-(--color-fg) sm:text-lg">
            {day.title}
          </h3>
        </div>
        <span
          aria-hidden
          className="shrink-0 text-(--color-muted) transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>

      <div className="space-y-3 border-t border-(--color-border) px-5 py-4">
        <p className="text-sm text-(--color-muted)">{day.summary}</p>

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

        {day.accommodation && (
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
        )}

        {day.notes && (
          <p className="rounded-md bg-(--color-bg) p-3 text-sm text-(--color-muted)">
            {day.notes}
          </p>
        )}
      </div>
    </details>
  );
}
