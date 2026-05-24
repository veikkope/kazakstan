import { CalendarRange } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import DayCard from './DayCard';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { ItineraryDay } from '@/lib/types';

/** Local YYYY-MM-DD — avoids UTC drift around midnight in CET/CEST. */
function todayLocalISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default async function DayTimeline({ days }: { days: ItineraryDay[] }) {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  if (days.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CalendarRange />
          </EmptyMedia>
          <EmptyTitle>{t('components.dayTimeline.emptyTitle')}</EmptyTitle>
          <EmptyDescription>
            {t.rich('components.dayTimeline.emptyDescription', {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/routes">{t('components.dayTimeline.browseRoutes')}</Link>
          </Button>
        </EmptyContent>
      </Empty>
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
          {t('components.dayTimeline.jumpToToday', {
            day: todayDay.day,
            title: localised(todayDay.title, loc),
          })}
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
