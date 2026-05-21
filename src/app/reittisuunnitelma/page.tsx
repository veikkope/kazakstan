import Link from 'next/link';
import DayTimeline from '@/components/itinerary/DayTimeline';
import { userItinerary } from '@/data/itinerary';

export default function ReittisuunnitelmaPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Oma reittisuunnitelma</h1>
        <p className="max-w-2xl text-muted-foreground">
          Tämä on teidän oma reittirungonne. Aluksi tyhjä — täytä päivät kun reitti
          lukittuu, tai kopioi runko{' '}
          <Link href="/reitit">valmiista reiteistä</Link>.
        </p>
      </div>

      <DayTimeline days={userItinerary} />
    </div>
  );
}
