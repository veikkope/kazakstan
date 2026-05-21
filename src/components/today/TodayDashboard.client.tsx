'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
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

function formatDateFi(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fi-FI', { weekday: 'long', day: 'numeric', month: 'long' });
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
  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center">
      <p className="text-sm text-(--color-muted)">
        Ei reittisuunnitelmaa. Lisää päiviä{' '}
        <Link href="/reittisuunnitelma">reittisuunnitelmaan</Link>.
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
  const daysLeft = firstDay.date ? daysBetween(today, firstDay.date) : null;

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-(--color-steppe) bg-(--color-steppe)/10 p-6">
        <p className="text-xs uppercase tracking-wide text-(--color-muted)">Lähtöön</p>
        <p className="mt-1 text-4xl font-bold text-(--color-steppe)">
          {daysLeft !== null ? `${daysLeft} päivää` : 'pian'}
        </p>
        <p className="mt-2 text-sm text-(--color-muted)">
          Reissu alkaa {firstDay.date && formatDateFi(firstDay.date)} — {totalDays} päivän kokonaisuus
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Lähtöpäivän esikatselu</h2>
        <DayCard day={firstDay} defaultOpen />
      </section>

      <QuickLinks />
      <CurrencyBlock />
      <EmergencyQuickCard />
    </div>
  );
}

function PostTripView({ lastDate }: { lastDate: string }) {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-6 text-center">
        <p className="text-4xl">🏡</p>
        <p className="mt-2 text-lg font-semibold">Reissu päättyi</p>
        <p className="mt-1 text-sm text-(--color-muted)">
          Viimeinen matkapäivä oli {formatDateFi(lastDate)}.
        </p>
        <p className="mt-3 text-sm">
          <Link href="/reittisuunnitelma">Selaa päiviä takaisin</Link>
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
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-(--color-steppe) bg-(--color-steppe)/10 p-5">
        <p className="text-xs uppercase tracking-wide text-(--color-muted)">
          {isExactToday ? 'Tänään' : 'Seuraava päivä'} — {formatDateFi(today)}
        </p>
        <p className="mt-1 text-2xl font-bold">
          Päivä {day.day} / {totalDays}
        </p>
        {day.city && (
          <p className="mt-1 text-sm">
            📍 <span className="font-medium">{day.city}</span>
            {day.sleepCity && day.sleepCity !== day.city && (
              <span className="text-(--color-muted)"> · 🛏️ {day.sleepCity}</span>
            )}
          </p>
        )}
        {!isExactToday && day.date && (
          <p className="mt-2 text-xs text-(--color-muted)">
            Esikatselu — päivä alkaa {formatDateFi(day.date)}
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
                  Huomenna
                </span>
                <span className="font-medium">{nextDay.title}</span>
                {nextDay.earlyWakeRisk && (
                  <span title="Aikainen herätys" aria-label="Aikainen herätys">
                    ⏰
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="border-t border-(--color-border) px-5 py-3 text-sm text-(--color-muted)">
              {nextDay.summary}
              {nextDay.anchors && nextDay.anchors.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs">
                  {nextDay.anchors.map((a, i) => (
                    <li key={i}>
                      {a.time && <span className="font-mono">{a.time}</span>} {a.label}
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
        {prevDay && (
          <Link
            href={`/reittisuunnitelma#day-${prevDay.day}`}
            className="flex-1 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-xs hover:no-underline"
          >
            ← Päivä {prevDay.day}: {prevDay.title.slice(0, 30)}
            {prevDay.title.length > 30 && '…'}
          </Link>
        )}
        {nextDay && (
          <Link
            href={`/reittisuunnitelma#day-${nextDay.day}`}
            className="flex-1 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-right text-xs hover:no-underline"
          >
            Päivä {nextDay.day}: {nextDay.title.slice(0, 30)}
            {nextDay.title.length > 30 && '…'} →
          </Link>
        )}
      </nav>

      <QuickLinks />
      <CurrencyBlock />
      <EmergencyQuickCard />
    </div>
  );
}

// ============== Reusable blocks ==============

function QuickLinks() {
  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <Link
        href="/kartta"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        🗺️ Kartta
      </Link>
      <Link
        href="/reittisuunnitelma"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        📅 Kaikki päivät
      </Link>
      <Link
        href="/info"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        ℹ️ Info
      </Link>
      <Link
        href="/budjetti"
        className="flex min-h-14 items-center gap-2 rounded-md border border-(--color-border) bg-(--color-card) px-3 py-2 text-sm hover:no-underline"
      >
        💸 Budjetti
      </Link>
    </section>
  );
}

function CurrencyBlock() {
  return (
    <section className="rounded-md border border-(--color-border) bg-(--color-card) px-4 py-3 text-sm">
      <p className="text-xs uppercase tracking-wide text-(--color-muted)">Valuutta</p>
      <p className="mt-1">
        <span className="font-mono font-medium">1 € ≈ {STATIC_KZT_PER_EUR} ₸</span>
        <span className="ml-2 text-xs text-(--color-muted)">staattinen — tarkista ennen lähtöä</span>
      </p>
    </section>
  );
}

function EmergencyQuickCard() {
  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-lg border border-red-500/30 bg-red-500/5"
    >
      <AccordionItem value="emergency" className="border-b-0">
        <AccordionTrigger className="rounded-lg border-transparent px-4 py-3 text-sm font-semibold text-red-700 hover:no-underline">
          🆘 Hätäkortti — avaa
        </AccordionTrigger>
        <AccordionContent className="space-y-3 border-t border-red-500/20 px-4 py-3 text-sm">
        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            Hätänumerot
          </p>
          <ul className="space-y-1">
            {emergencyNumbers.map((c) => (
              <li key={c.label}>
                <a href={`tel:${c.value.replace(/\s+/g, '')}`} className="font-mono font-medium">
                  {c.value}
                </a>
                <span className="ml-2 text-(--color-muted)">{c.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            Suomen edustusto
          </p>
          <ul className="space-y-1">
            {embassies.map((e) => (
              <li key={e.label}>
                <p>
                  <a href={`tel:${e.value.replace(/\s+/g, '')}`} className="font-mono font-medium">
                    {e.value}
                  </a>
                </p>
                <p className="text-xs text-(--color-muted)">{e.label}</p>
                {e.note && <p className="text-xs italic text-(--color-muted)">{e.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
            Hätäfraasit
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
            <Link href="/info">Kaikki fraasit info-sivulla →</Link>
          </p>
        </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
