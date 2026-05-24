'use client';

import { useSyncExternalStore } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import DayCard from '@/components/itinerary/DayCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { userItinerary } from '@/data/itinerary';
import { emergencyNumbers, embassies, emergencyPhrases } from '@/data/emergency';
import { STATIC_KZT_PER_EUR } from '@/data/budget';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { ItineraryDay } from '@/lib/types';

/** Local YYYY-MM-DD. */
function todayLocalISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Subscribe to date changes — tick every minute so /tanaan stays correct over midnight. */
function subscribeToDate(callback: () => void): () => void {
  const interval = setInterval(callback, 60_000);
  return () => clearInterval(interval);
}

function getClientDate(): string {
  return todayLocalISO();
}

function getServerDate(): null {
  return null;
}

function daysBetween(from: string, to: string): number {
  const a = new Date(from);
  const b = new Date(to);
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDateLocalised(iso: string, locale: string): string {
  const d = new Date(iso);
  // Map next-intl locale codes to BCP-47 — `kk` is already valid; `fi`/`en`/`ru` map 1:1.
  return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function TodayDashboard() {
  const today = useSyncExternalStore<string | null>(
    subscribeToDate,
    getClientDate,
    getServerDate,
  );

  if (today === null) {
    return <DashboardSkeleton />;
  }

  if (userItinerary.length === 0) {
    return <EmptyState />;
  }

  const sorted = [...userItinerary].sort((a, b) => a.day - b.day);
  const firstDay = sorted[0];
  const lastDay = sorted[sorted.length - 1];

  // Pre-trip: today is before day 1
  if (firstDay.date && today < firstDay.date) {
    return <PreTripView today={today} firstDay={firstDay} totalDays={sorted.length} />;
  }

  // Post-trip: today is after last day
  if (lastDay.date && today > lastDay.date) {
    return <PostTripView lastDate={lastDay.date} />;
  }

  // During trip: find matching day or nearest
  const todayDay = sorted.find((d) => d.date === today);
  const dayIndex = todayDay
    ? sorted.indexOf(todayDay)
    : sorted.findIndex((d) => d.date && d.date >= today);
  const day = todayDay ?? (dayIndex >= 0 ? sorted[dayIndex] : null);

  if (!day) {
    return <EmptyState />;
  }

  const prevDay = dayIndex > 0 ? sorted[dayIndex - 1] : null;
  const nextDay = dayIndex < sorted.length - 1 ? sorted[dayIndex + 1] : null;

  return (
    <TripView
      today={today}
      day={day}
      prevDay={prevDay}
      nextDay={nextDay}
      totalDays={sorted.length}
      isExactToday={!!todayDay}
    />
  );
}

// ============== Sub-views ==============

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-32 rounded-lg" />
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}

function EmptyState() {
  const t = useTranslations();
  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center">
      <p className="text-sm text-(--color-muted)">
        {t.rich('components.todayDashboard.emptyState', {
          link: (chunks) => <Link href="/itinerary">{chunks}</Link>,
        })}
      </p>
    </div>
  );
}

function PreTripView({
  today,
  firstDay,
  totalDays,
}: {
  today: string;
  firstDay: ItineraryDay;
  totalDays: number;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const daysLeft = firstDay.date ? daysBetween(today, firstDay.date) : null;

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-(--color-steppe) bg-(--color-steppe)/10 p-6">
        <p className="text-xs uppercase tracking-wide text-(--color-muted)">
          {t('components.todayDashboard.countdownLabel')}
        </p>
        <p className="mt-1 text-4xl font-bold text-(--color-steppe)">
          {daysLeft !== null
            ? t('components.todayDashboard.daysLeft', { count: daysLeft })
            : t('components.todayDashboard.daysLeftSoon')}
        </p>
        <p className="mt-2 text-sm text-(--color-muted)">
          {firstDay.date
            ? t('components.todayDashboard.tripStarts', {
                date: formatDateLocalised(firstDay.date, locale),
                total: totalDays,
              })
            : t('components.todayDashboard.tripStartsNoDate', { total: totalDays })}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          {t('components.todayDashboard.firstDayPreview')}
        </h2>
        <DayCard day={firstDay} defaultOpen />
      </section>

      <QuickLinks />
      <CurrencyBlock />
      <EmergencyQuickCard />
    </div>
  );
}

function PostTripView({ lastDate }: { lastDate: string }) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center">
        <p className="text-4xl">🏡</p>
        <p className="mt-2 text-lg font-semibold">
          {t('components.todayDashboard.tripEnded')}
        </p>
        <p className="mt-1 text-sm text-(--color-muted)">
          {t('components.todayDashboard.lastTripDate', {
            date: formatDateLocalised(lastDate, locale),
          })}
        </p>
        <p className="mt-3 text-sm">
          <Link href="/itinerary">
            {t('components.todayDashboard.browseBack')}
          </Link>
        </p>
      </section>
    </div>
  );
}

function TripView({
  today,
  day,
  prevDay,
  nextDay,
  totalDays,
  isExactToday,
}: {
  today: string;
  day: ItineraryDay;
  prevDay: ItineraryDay | null;
  nextDay: ItineraryDay | null;
  totalDays: number;
  isExactToday: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const loc = asLocale(locale);
  const dayCity = day.city ? localised(day.city, loc) : undefined;
  const daySleepCity = day.sleepCity ? localised(day.sleepCity, loc) : undefined;
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-(--color-steppe) bg-(--color-steppe)/10 p-5">
        <p className="text-xs uppercase tracking-wide text-(--color-muted)">
          {isExactToday
            ? t('components.todayDashboard.todayLabel')
            : t('components.todayDashboard.nextDayLabel')}{' '}
          — {formatDateLocalised(today, locale)}
        </p>
        <p className="mt-1 text-2xl font-bold">
          {t('components.todayDashboard.dayCount', { day: day.day, total: totalDays })}
        </p>
        {dayCity && (
          <p className="mt-1 text-sm">
            📍 <span className="font-medium">{dayCity}</span>
            {daySleepCity && daySleepCity !== dayCity && (
              <span className="text-(--color-muted)"> · 🛏️ {daySleepCity}</span>
            )}
          </p>
        )}
        {!isExactToday && day.date && (
          <p className="mt-2 text-xs text-(--color-muted)">
            {t('components.todayDashboard.previewStarts', {
              date: formatDateLocalised(day.date, locale),
            })}
          </p>
        )}
      </section>

      <DayCard day={day} defaultOpen isToday={isExactToday} />

      {/* Tomorrow preview */}
      {nextDay && (
        <Accordion
          type="single"
          collapsible
          className="rounded-lg border border-(--color-border) bg-(--color-card)"
        >
          <AccordionItem value="tomorrow" className="border-b-0">
            <AccordionTrigger className="rounded-lg border-transparent px-5 py-3 text-sm hover:no-underline">
              <span className="flex flex-wrap items-center gap-x-2">
                <span className="text-xs uppercase tracking-wide text-(--color-muted)">
                  {t('components.todayDashboard.tomorrow')}
                </span>
                <span className="font-medium">{localised(nextDay.title, loc)}</span>
                {nextDay.earlyWakeRisk && (
                  <span
                    title={t('components.todayDashboard.earlyWake')}
                    aria-label={t('components.todayDashboard.earlyWake')}
                  >
                    ⏰
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="border-t border-(--color-border) px-5 py-3 text-sm text-(--color-muted)">
              {localised(nextDay.summary, loc)}
              {nextDay.anchors && nextDay.anchors.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs">
                  {nextDay.anchors.map((a, i) => (
                    <li key={i}>
                      {a.time && <span className="font-mono">{localised(a.time, loc)}</span>} {localised(a.label, loc)}
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Day navigation */}
      <nav className="flex gap-2">
        {prevDay && (() => {
          const prevTitle = localised(prevDay.title, loc);
          return (
            <Link
              href={`/itinerary#day-${prevDay.day}`}
              className="flex-1 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-xs hover:no-underline"
            >
              {t('components.todayDashboard.prevDayNav', {
                day: prevDay.day,
                title:
                  prevTitle.slice(0, 30) + (prevTitle.length > 30 ? '…' : ''),
              })}
            </Link>
          );
        })()}
        {nextDay && (() => {
          const nextTitle = localised(nextDay.title, loc);
          return (
            <Link
              href={`/itinerary#day-${nextDay.day}`}
              className="flex-1 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-right text-xs hover:no-underline"
            >
              {t('components.todayDashboard.nextDayNav', {
                day: nextDay.day,
                title:
                  nextTitle.slice(0, 30) + (nextTitle.length > 30 ? '…' : ''),
              })}
            </Link>
          );
        })()}
      </nav>

      <QuickLinks />
      <CurrencyBlock />
      <EmergencyQuickCard />
    </div>
  );
}

// ============== Reusable blocks ==============

function QuickLinks() {
  const t = useTranslations();
  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <Link
        href="/map"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        🗺️ {t('components.todayDashboard.quickLinks.map')}
      </Link>
      <Link
        href="/itinerary"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        📅 {t('components.todayDashboard.quickLinks.allDays')}
      </Link>
      <Link
        href="/info"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        ℹ️ {t('components.todayDashboard.quickLinks.info')}
      </Link>
      <Link
        href="/budget"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        💸 {t('components.todayDashboard.quickLinks.budget')}
      </Link>
    </section>
  );
}

function CurrencyBlock() {
  const t = useTranslations();
  return (
    <section className="rounded-md border border-(--color-border) bg-(--color-card) px-4 py-3 text-sm">
      <p className="text-xs uppercase tracking-wide text-(--color-muted)">
        {t('components.todayDashboard.currencyLabel')}
      </p>
      <p className="mt-1">
        <span className="font-mono font-medium">
          {t('components.todayDashboard.currencyRate', { rate: STATIC_KZT_PER_EUR })}
        </span>
        <span className="ml-2 text-xs text-(--color-muted)">
          {t('components.todayDashboard.currencyHint')}
        </span>
      </p>
    </section>
  );
}

function EmergencyQuickCard() {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-lg border border-red-500/30 bg-red-500/5"
    >
      <AccordionItem value="emergency" className="border-b-0">
        <AccordionTrigger className="rounded-lg border-transparent px-4 py-3 text-sm font-semibold text-red-700 hover:no-underline">
          {t('components.todayDashboard.emergency.openCard')}
        </AccordionTrigger>
        <AccordionContent className="space-y-3 border-t border-red-500/20 px-4 py-3 text-sm">
        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            {t('components.todayDashboard.emergency.numbers')}
          </p>
          <ul className="space-y-1">
            {emergencyNumbers.map((c) => {
              const label = localised(c.label, loc);
              return (
                <li key={label}>
                  <a href={`tel:${c.value.replace(/\s+/g, '')}`} className="font-mono font-medium">
                    {c.value}
                  </a>
                  <span className="ml-2 text-(--color-muted)">{label}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            {t('components.todayDashboard.emergency.embassy')}
          </p>
          <ul className="space-y-1">
            {embassies.map((e) => {
              const label = localised(e.label, loc);
              return (
                <li key={label}>
                  <p>
                    <a href={`tel:${e.value.replace(/\s+/g, '')}`} className="font-mono font-medium">
                      {e.value}
                    </a>
                  </p>
                  <p className="text-xs text-(--color-muted)">{label}</p>
                  {e.note && <p className="text-xs italic text-(--color-muted)">{localised(e.note, loc)}</p>}
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            {t('components.todayDashboard.emergency.phrases')}
          </p>
          <ul className="space-y-1 text-xs">
            {emergencyPhrases.slice(0, 4).map((p, i) => (
              <li key={i}>
                <span className="font-medium">{p.fi}</span>
                {p.ru && <span className="ml-2 text-(--color-muted)">{p.ru}</span>}
              </li>
            ))}
          </ul>
          <p className="mt-1 text-xs">
            <Link href="/info">
              {t('components.todayDashboard.emergency.allPhrasesLink')}
            </Link>
          </p>
        </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
