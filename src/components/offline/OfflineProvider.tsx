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
import DownloadProgressIndicator from '@/components/offline/DownloadProgressIndicator';

/**
 * App-wide offline-download state.
 *
 * The download is owned here (in the layout) rather than in the /today card so
 * it survives route changes — the user can keep browsing while it runs — and a
 * floating <DownloadProgressIndicator> renders the ring on every page. Only
 * consumers of this context re-render on progress; the rest of the tree is
 * untouched because the provider's `children` prop is referentially stable.
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
      // Persistent storage is requested at download time (see startDownload) —
      // some browsers (notably Firefox) prompt the user, so we want a fresh
      // user activation to back the request, not a passive mount.
      if (!cancelled) await refresh();
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const startDownload = useCallback(
    async (locale: string, tiles: string[]) => {
      if (busy) return;
      setBusy('download');
      // Ride the user click into the persistence request — browsers grant it
      // far more reliably with a fresh activation than at passive mount, and
      // a trip cache that survives storage pressure is the whole point.
      void requestPersistentStorage();
      setProgress({ phase: 'preparing', done: 0, total: 0, bytes: 0 });
      try {
        await downloadTrip(locale, tiles, setProgress);
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
    [busy, refresh, t],
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
      <DownloadProgressIndicator />
    </OfflineContext.Provider>
  );
}
