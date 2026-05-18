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

export default function DayCard({ day }: { day: ItineraryDay }) {
  return (
    <article className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
      <header className="mb-3">
        <p className="text-xs uppercase tracking-wide text-(--color-muted)">
          Päivä {day.day}
          {day.date ? ` — ${day.date}` : ''}
        </p>
        <h3 className="text-lg font-semibold text-(--color-fg)">{day.title}</h3>
        <p className="mt-1 text-sm text-(--color-muted)">{day.summary}</p>
      </header>

      {day.sightIds.length > 0 && (
        <section className="mb-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            Kohteet
          </p>
          <ul className="space-y-1 text-sm">
            {day.sightIds.map((id) => {
              const s = findById(sights, id);
              if (!s) return <li key={id} className="text-(--color-muted)">⚠️ tuntematon: {id}</li>;
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
        <section className="mb-3">
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
        <section className="mb-3">
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
        <p className="mt-3 rounded-md bg-(--color-bg) p-3 text-sm text-(--color-muted)">
          {day.notes}
        </p>
      )}
    </article>
  );
}
