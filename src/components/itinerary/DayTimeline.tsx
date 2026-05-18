import DayCard from './DayCard';
import type { ItineraryDay } from '@/lib/types';

/** Local YYYY-MM-DD — avoids UTC drift around midnight in CET/CEST. */
function todayLocalISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function DayTimeline({ days }: { days: ItineraryDay[] }) {
  if (days.length === 0) {
    return (
      <p className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center text-sm text-(--color-muted)">
        Ei vielä päiviä — kopioi runko valmiista reiteistä tai lisää käsin tiedostoon{' '}
        <code>src/data/itinerary.ts</code>.
      </p>
    );
  }

  const sorted = [...days].sort((a, b) => a.day - b.day);
  const today = todayLocalISO();
  const todayDay = sorted.find((d) => d.date === today);

  return (
    <div className="space-y-4">
      {todayDay && (
        <a
          href={`#day-${todayDay.day}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-steppe) bg-(--color-steppe)/10 px-4 text-sm font-medium text-(--color-steppe) hover:bg-(--color-steppe)/20 hover:no-underline"
        >
          ↓ Tänään — päivä {todayDay.day}: {todayDay.title}
        </a>
      )}

      <div className="space-y-3">
        {sorted.map((d, i) => (
          <DayCard
            key={d.day}
            day={d}
            isToday={d.date === today}
            defaultOpen={todayDay ? d.date === today : i === 0}
          />
        ))}
      </div>
    </div>
  );
}
