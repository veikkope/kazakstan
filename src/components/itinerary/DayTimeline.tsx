import DayCard from './DayCard';
import type { ItineraryDay } from '@/lib/types';

export default function DayTimeline({ days }: { days: ItineraryDay[] }) {
  if (days.length === 0) {
    return (
      <p className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center text-sm text-(--color-muted)">
        Ei vielä päiviä — kopioi runko valmiista reiteistä tai lisää käsin tiedostoon{' '}
        <code>src/data/itinerary.ts</code>.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {[...days]
        .sort((a, b) => a.day - b.day)
        .map((d) => (
          <DayCard key={d.day} day={d} />
        ))}
    </div>
  );
}
