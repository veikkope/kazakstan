'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  clearTrip as swClearTrip,
  downloadTrip,
  getTripStatus,
  isOfflineDownloadSupported,
  readManifest,
  requestPersistentStorage,
  storageEstimate,
  type DownloadProgress,
  type TripManifest,
} from '@/lib/offline';
import { cn } from '@/lib/utils';

/**
 * App-wide offline-download state.
 *
 * The download is owned here (in the layout) rather than in the /today card so
 * it survives route changes — the user can keep browsing while it runs — and a
 * single persistent toast reports progress on every page. Only consumers of
 * this context re-render on progress; the rest of the tree is untouched because
 * the provider's `children` prop is referentially stable.
 */
export type TripState = 'none' | 'ready' | 'stale';

interface OfflineContextValue {
  supported: boolean;
  manifest: TripManifest | null;
  tripState: TripState;
  estimate: { usage: number; quota: number } | null;
  busy: 'download' | 'clear' | null;
  progress: DownloadProgress | null;
  startDownload: (locale: string, tiles: string[]) => Promise<void>;
  clear: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextValue | null>(null);

export function useOffline(): OfflineContextValue {
  const ctx = useContext(OfflineContext);
  if (!ctx) throw new Error('useOffline must be used within <OfflineProvider>');
  return ctx;
}

const TOAST_ID = 'offline-trip-download';

export default function OfflineProvider({ children }: { children: ReactNode }) {
  const t = useTranslations('components.offline');
  const [supported, setSupported] = useState(true);
  const [manifest, setManifest] = useState<TripManifest | null>(null);
  const [tripState, setTripState] = useState<TripState>('none');
  const [estimate, setEstimate] = useState<{ usage: number; quota: number } | null>(null);
  const [busy, setBusy] = useState<'download' | 'clear' | null>(null);
  const [progress, setProgress] = useState<DownloadProgress | null>(null);

  const refresh = useCallback(async () => {
    const m = readManifest();
    setManifest(m);
    setEstimate(await storageEstimate());
    const status = await getTripStatus();
    if (m && status && status.pages > 0) setTripState('ready');
    else if (m) setTripState('stale');
    else setTripState('none');
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (!isOfflineDownloadSupported()) {
        if (!cancelled) setSupported(false);
        return;
      }
      await requestPersistentStorage();
      if (!cancelled) await refresh();
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const renderToast = useCallback(
    (p: DownloadProgress) => {
      const indeterminate = p.phase === 'preparing';
      const pct = !indeterminate && p.total > 0 ? Math.round((p.done / p.total) * 100) : 0;
      toast.custom(
        () => (
          <DownloadToast
            title={indeterminate ? t('preparing') : t('downloadingTitle')}
            pct={pct}
            indeterminate={indeterminate}
          />
        ),
        { id: TOAST_ID, duration: Infinity },
      );
    },
    [t],
  );

  const startDownload = useCallback(
    async (locale: string, tiles: string[]) => {
      if (busy) return;
      setBusy('download');
      const initial: DownloadProgress = { phase: 'preparing', done: 0, total: 0, bytes: 0 };
      setProgress(initial);
      renderToast(initial);
      try {
        await downloadTrip(locale, tiles, (p) => {
          setProgress(p);
          renderToast(p);
        });
        await refresh();
        toast.success(t('doneToast'), { id: TOAST_ID, duration: 4000 });
      } catch (err) {
        toast.error(
          err instanceof Error && err.message === 'offline-unavailable'
            ? t('unavailableToast')
            : t('errorToast'),
          { id: TOAST_ID, duration: 5000 },
        );
      } finally {
        setBusy(null);
        setProgress(null);
      }
    },
    [busy, refresh, renderToast, t],
  );

  const clear = useCallback(async () => {
    if (busy) return;
    setBusy('clear');
    try {
      await swClearTrip();
      await refresh();
      toast.success(t('clearToast'));
    } finally {
      setBusy(null);
    }
  }, [busy, refresh, t]);

  return (
    <OfflineContext.Provider
      value={{ supported, manifest, tripState, estimate, busy, progress, startDownload, clear }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

function DownloadToast({
  title,
  pct,
  indeterminate,
}: {
  title: string;
  pct: number;
  indeterminate: boolean;
}) {
  return (
    <div className="flex w-[min(76vw,248px)] items-center gap-2.5 rounded-lg border border-border bg-popover px-3 py-2.5 text-popover-foreground shadow-md">
      <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1.5">
          <span className="truncate text-xs font-medium">{title}</span>
          {!indeterminate && (
            <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{pct}%</span>
          )}
        </div>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              'h-full rounded-full bg-primary',
              indeterminate ? 'w-1/3 animate-pulse' : 'transition-[width] duration-300',
            )}
            style={indeterminate ? undefined : { width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
