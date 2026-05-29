import { getTranslations } from 'next-intl/server';
import DayTimeline from '@/components/itinerary/DayTimeline';
import CalendarExportButton from '@/components/itinerary/CalendarExportButton';
import { userItinerary } from '@/data/itinerary';
import { Link } from '@/i18n/navigation';

export default async function ReittisuunnitelmaPage() {
  const t = await getTranslations();
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{t('pages.itinerary.title')}</h1>
          <p className="max-w-2xl text-muted-foreground">
            {t.rich('pages.itinerary.intro', {
              routes: (chunks) => <Link href="/routes">{chunks}</Link>,
            })}
          </p>
        </div>
        <CalendarExportButton />
      </div>

      <DayTimeline days={userItinerary} />
    </div>
  );
}
