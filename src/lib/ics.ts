/**
 * iCalendar (RFC 5545) generator for the trip itinerary. Output is plain
 * text that any calendar app (Google, Apple, Outlook, Fastmail, …) can
 * import — each day becomes a single all-day VEVENT.
 *
 * Why all-day instead of time-bound: the itinerary records dates without
 * stable per-day start/end times (some days are flights, some are hikes,
 * some are city days). All-day events sidestep timezone ambiguity and
 * still produce a usable "trip view" in calendar apps. The traveller can
 * see Asia/Almaty time elsewhere — this calendar is "where am I today".
 */
import type { ItineraryDay, Locale } from '@/lib/types';
import { localised } from '@/lib/i18n-helpers';
import { sights } from '@/data/sights';

const CRLF = '\r\n';
const MAX_LINE_OCTETS = 75;

/** RFC 5545 §3.3.11 — TEXT value escaping. */
function escapeText(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/**
 * Fold long content lines to ≤75 octets per RFC 5545 §3.1. Continuation
 * lines start with a single space. Counts UTF-8 octets, not codepoints,
 * to stay safe with Cyrillic / Kazakh content.
 */
function foldLine(line: string): string {
  const enc = new TextEncoder();
  const bytes = enc.encode(line);
  if (bytes.length <= MAX_LINE_OCTETS) return line;
  const dec = new TextDecoder();
  const out: string[] = [];
  let i = 0;
  while (i < bytes.length) {
    // First line: 75 octets. Continuations: 74 octets (leading space counts).
    const chunkSize = out.length === 0 ? MAX_LINE_OCTETS : MAX_LINE_OCTETS - 1;
    let end = Math.min(i + chunkSize, bytes.length);
    // Don't slice mid-multibyte-character — back off to the previous start byte.
    while (end < bytes.length && (bytes[end] & 0b1100_0000) === 0b1000_0000) end--;
    out.push(dec.decode(bytes.subarray(i, end)));
    i = end;
  }
  return out.map((s, idx) => (idx === 0 ? s : ' ' + s)).join(CRLF);
}

function formatDate(iso: string): string {
  return iso.replace(/-/g, '');
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function nowStamp(): string {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildDescription(day: ItineraryDay, loc: Locale): string {
  const parts: string[] = [];
  parts.push(localised(day.summary, loc));
  if (day.sightIds.length > 0) {
    const names = day.sightIds
      .map((id) => sights.find((s) => s.id === id))
      .filter((s): s is (typeof sights)[number] => Boolean(s))
      .map((s) => '• ' + localised(s.name, loc));
    if (names.length > 0) {
      parts.push('');
      parts.push(names.join('\n'));
    }
  }
  return parts.join('\n');
}

export function buildItineraryIcs(days: ItineraryDay[], loc: Locale): string {
  const stamp = nowStamp();
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kazakstan-trip//Itinerary//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const day of days) {
    // `date` is optional on ItineraryDay (preset templates often skip it).
    // Skip undated days — a calendar event without DTSTART is useless.
    if (!day.date) continue;
    const dtstart = formatDate(day.date);
    const dtend = formatDate(addDays(day.date, 1)); // exclusive end
    const summary = `${t(loc, 'day')} ${day.day} — ${localised(day.title, loc)}`;
    const location = day.city ? localised(day.city, loc) : '';
    const description = buildDescription(day, loc);

    lines.push(
      'BEGIN:VEVENT',
      foldLine(`UID:kz-day-${day.day}-${dtstart}@kazakstan.trip`),
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      foldLine(`SUMMARY:${escapeText(summary)}`),
      foldLine(`LOCATION:${escapeText(location)}`),
      foldLine(`DESCRIPTION:${escapeText(description)}`),
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join(CRLF) + CRLF;
}

// Tiny inline i18n — keeps the lib free of next-intl runtime dependency.
function t(loc: Locale, key: 'day'): string {
  const dict: Record<Locale, Record<'day', string>> = {
    fi: { day: 'Päivä' },
    en: { day: 'Day' },
    ru: { day: 'День' },
    kk: { day: 'Күн' },
  };
  return dict[loc][key];
}
