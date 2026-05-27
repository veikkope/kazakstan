'use client';

import { useState } from 'react';
import { CalendarPlus, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { userItinerary } from '@/data/itinerary';
import { buildItineraryIcs } from '@/lib/ics';
import { asLocale } from '@/lib/i18n-helpers';

/**
 * Exports the itinerary as a .ics file. Prefers the Level 2 Web Share API
 * (opens the native share sheet so the user can drop the file into their
 * spouse's WhatsApp / AirDrop / Calendar app in one tap), falls back to a
 * plain download elsewhere. iOS Safari 15+ and Chrome Android 89+ support
 * file shares; desktop browsers usually fall through.
 */
export default function CalendarExportButton() {
  const t = useTranslations('components.calendarExport');
  const loc = asLocale(useLocale());
  const [busy, setBusy] = useState(false);

  async function handleExport() {
    if (busy) return;
    setBusy(true);
    try {
      const ics = buildItineraryIcs(userItinerary, loc);
      const filename = `kazakstan-trip-${loc}.ics`;
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const file = new File([blob], filename, { type: 'text/calendar' });

      // Web Share Level 2 — only attempt if the browser will accept this file.
      if (
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({ files: [file], title: t('shareTitle') });
          return;
        } catch (err) {
          // User cancelled the share sheet — not an error worth surfacing.
          if (err instanceof Error && err.name === 'AbortError') return;
          // Any other failure falls through to the download path.
        }
      }

      // Fallback: trigger a download via an ephemeral object URL.
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      toast.success(t('downloadedToast'));
    } catch {
      toast.error(t('errorToast'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleExport}
      aria-disabled={busy}
      className={busy ? 'opacity-70' : undefined}
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" aria-hidden />
      ) : (
        <CalendarPlus className="size-4" aria-hidden />
      )}
      {t('button')}
    </Button>
  );
}
