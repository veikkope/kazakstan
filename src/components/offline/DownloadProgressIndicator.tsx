'use client';

import { CloudDownload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useOffline } from '@/components/offline/OfflineProvider';
import { cn } from '@/lib/utils';

const SIZE = 56;
const STROKE = 4;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating circular progress for the offline trip download.
 *
 * Pinned to the bottom-right corner and lifted above the mobile BottomNav by
 * `--bottom-nav-h` plus the iOS safe-area inset, so it never sits on top of
 * the nav (Chromium-on-Safari issue with sonner's bottom offset). Mounted
 * globally by OfflineProvider, the indicator survives route changes — the
 * user can keep browsing while the download runs in the background.
 *
 * Non-interactive (information only); the terminal success/error states are
 * surfaced via sonner toasts that OfflineProvider fires on completion.
 */
export default function DownloadProgressIndicator() {
  const t = useTranslations('components.offline');
  const { busy, progress } = useOffline();

  if (busy !== 'download' || !progress) return null;

  // Treat a zero `total` as still indeterminate: the SW emits the first
  // `downloading` event with the real total, but we don't want a 0% snap
  // between "preparing" and the first concrete tick.
  const indeterminate = progress.phase === 'preparing' || progress.total === 0;
  const pct = indeterminate
    ? 0
    : Math.min(100, Math.round((progress.done / progress.total) * 100));

  // Indeterminate: quarter-arc visible, whole SVG spins. Determinate: dash
  // offset shrinks toward zero (full circle) — a CSS transition smooths it.
  const dashOffset = indeterminate
    ? CIRCUMFERENCE * 0.75
    : CIRCUMFERENCE * (1 - pct / 100);

  const label = indeterminate ? t('preparing') : `${t('downloadingTitle')} ${pct}%`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="pointer-events-none fixed right-3 z-50 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+0.75rem)] sm:right-5 sm:bottom-5"
    >
      <div className="relative grid size-14 place-items-center rounded-full border border-border bg-popover/95 text-popover-foreground shadow-lg backdrop-blur supports-[backdrop-filter]:bg-popover/85">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className={cn('absolute inset-0', indeterminate && 'motion-safe:animate-spin')}
          aria-hidden
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-border"
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            className="stroke-primary transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>
        {indeterminate ? (
          <CloudDownload className="size-5 text-primary" aria-hidden />
        ) : (
          <span className="text-[11px] font-semibold tabular-nums text-foreground">
            {pct}%
          </span>
        )}
      </div>
    </div>
  );
}
