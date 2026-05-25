'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  Check,
  CloudDownload,
  HardDriveDownload,
  Loader2,
  Map as MapIcon,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sights } from '@/data/sights';
import { regionMeta } from '@/data/categories';
import type { Region } from '@/lib/types';
import { asLocale, localised } from '@/lib/i18n-helpers';
import {
  bboxForSights,
  countTilesForBboxes,
  estimateTileBytes,
  TILE_MIN_ZOOM,
  tileUrls,
  tilesForBboxes,
  type Bbox,
} from '@/lib/tiles';
import {
  clearTrip,
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

const MAX_ZOOM_MIN = 8;
const MAX_ZOOM_MAX = 12;
const MAX_ZOOM_DEFAULT = 10;

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 MB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

type TripState = 'none' | 'ready' | 'stale';

export default function OfflineManager() {
  const t = useTranslations('components.offline');
  const locale = useLocale();
  const loc = asLocale(locale);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const [supported, setSupported] = useState(true);
  const [manifest, setManifest] = useState<TripManifest | null>(null);
  const [tripState, setTripState] = useState<TripState>('none');
  const [estimate, setEstimate] = useState<{ usage: number; quota: number } | null>(null);
  const [busy, setBusy] = useState<'download' | 'clear' | null>(null);
  const [progress, setProgress] = useState<DownloadProgress | null>(null);

  // Regions that actually contain sights, with their counts.
  const regions = useMemo(() => {
    const counts = new Map<Region, number>();
    for (const s of sights) counts.set(s.region, (counts.get(s.region) ?? 0) + 1);
    return (Object.keys(regionMeta) as Region[])
      .filter((r) => (counts.get(r) ?? 0) > 0)
      .map((r) => ({ region: r, count: counts.get(r) ?? 0 }));
  }, []);

  const [selectedRegions, setSelectedRegions] = useState<Region[]>(() =>
    regions.map((r) => r.region),
  );
  const [includeTiles, setIncludeTiles] = useState(true);
  const [maxZoom, setMaxZoom] = useState(MAX_ZOOM_DEFAULT);

  const refreshStatus = async () => {
    setManifest(readManifest());
    setEstimate(await storageEstimate());
    const status = await getTripStatus();
    const m = readManifest();
    if (m && status && status.pages > 0) setTripState('ready');
    else if (m) setTripState('stale');
    else setTripState('none');
  };

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (!isOfflineDownloadSupported()) {
        if (!cancelled) setSupported(false);
        return;
      }
      await requestPersistentStorage();
      if (!cancelled) await refreshStatus();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const bboxes = useMemo<Bbox[]>(() => {
    const out: Bbox[] = [];
    for (const r of selectedRegions) {
      const b = bboxForSights((reg) => reg === r);
      if (b) out.push(b);
    }
    return out;
  }, [selectedRegions]);

  const tileCount = useMemo(
    () => (includeTiles && bboxes.length ? countTilesForBboxes(bboxes, TILE_MIN_ZOOM, maxZoom) : 0),
    [includeTiles, bboxes, maxZoom],
  );

  const sightsWithImages = useMemo(() => sights.filter((s) => s.image).length, []);

  function toggleRegion(region: Region) {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region],
    );
  }

  async function handleDownload() {
    setBusy('download');
    setProgress({ phase: 'preparing', done: 0, total: 0, bytes: 0 });
    try {
      const tiles =
        includeTiles && bboxes.length
          ? tileUrls(tilesForBboxes(bboxes, TILE_MIN_ZOOM, maxZoom), theme)
          : [];
      await downloadTrip(locale, tiles, setProgress);
      await refreshStatus();
      toast.success(t('doneToast'));
    } catch (err) {
      toast.error(
        err instanceof Error && err.message === 'offline-unavailable'
          ? t('unavailableToast')
          : t('errorToast'),
      );
    } finally {
      setBusy(null);
      setProgress(null);
    }
  }

  async function handleClear() {
    setBusy('clear');
    try {
      await clearTrip();
      await refreshStatus();
      toast.success(t('clearToast'));
    } finally {
      setBusy(null);
    }
  }

  const percent =
    progress && progress.total > 0
      ? Math.min(100, Math.round((progress.done / progress.total) * 100))
      : 0;

  const dateLabel = manifest
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(manifest.at)
    : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <HardDriveDownload className="size-5 text-primary" aria-hidden />
          {t('title')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t('description')}</p>
      </CardHeader>

      <CardContent className="space-y-5">
        {!supported ? (
          <p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            {t('unsupported')}
          </p>
        ) : (
          <>
            {/* Status line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              {tripState === 'ready' && (
                <span className="inline-flex items-center gap-1.5 font-medium text-(--color-accent)">
                  <Check className="size-4" aria-hidden />
                  {t('statusReady', { date: dateLabel })}
                </span>
              )}
              {tripState === 'stale' && (
                <span className="font-medium text-(--color-sand-dark)">{t('statusStale')}</span>
              )}
              {tripState === 'none' && (
                <span className="text-muted-foreground">{t('statusNone')}</span>
              )}
              {manifest && tripState === 'ready' && (
                <span className="text-muted-foreground">· {formatBytes(manifest.bytes)}</span>
              )}
            </div>

            {/* Map tiles options */}
            <div className="space-y-3 rounded-lg border border-border p-3">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={includeTiles}
                  onChange={(e) => setIncludeTiles(e.target.checked)}
                  className="size-4 accent-[var(--color-steppe)]"
                />
                <MapIcon className="size-4 text-muted-foreground" aria-hidden />
                {t('tilesToggle')}
              </label>

              {includeTiles && (
                <div className="space-y-3 pl-1">
                  <div className="flex flex-wrap gap-1.5">
                    {regions.map(({ region, count }) => {
                      const active = selectedRegions.includes(region);
                      return (
                        <button
                          key={region}
                          type="button"
                          onClick={() => toggleRegion(region)}
                          aria-pressed={active}
                          className={cn(
                            'rounded-full border px-2.5 py-1 text-xs transition-colors',
                            active
                              ? 'border-primary/40 bg-primary/10 text-foreground'
                              : 'border-border text-muted-foreground hover:bg-muted',
                          )}
                        >
                          {localised(regionMeta[region].label, loc)}
                          <span className="ml-1 opacity-60">{count}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{t('detail')}</span>
                    <input
                      type="range"
                      min={MAX_ZOOM_MIN}
                      max={MAX_ZOOM_MAX}
                      step={1}
                      value={maxZoom}
                      onChange={(e) => setMaxZoom(Number(e.target.value))}
                      className="h-1 flex-1 accent-[var(--color-steppe)]"
                      aria-label={t('detail')}
                    />
                    <span className="w-7 text-right text-xs tabular-nums text-muted-foreground">
                      z{maxZoom}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {t('tilesEstimate', {
                      count: tileCount.toLocaleString(locale),
                      size: formatBytes(estimateTileBytes(tileCount)),
                    })}
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              {t('includesNote', { sights: sightsWithImages })}
            </p>

            {/* Progress */}
            {busy === 'download' && progress && (
              <div className="space-y-1.5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-300"
                    style={{ width: `${progress.phase === 'preparing' ? 6 : percent}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {progress.phase === 'preparing'
                    ? t('preparing')
                    : t('downloading', { done: progress.done, total: progress.total })}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleDownload} disabled={busy !== null}>
                {busy === 'download' ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : tripState === 'none' ? (
                  <CloudDownload className="size-4" aria-hidden />
                ) : (
                  <RefreshCw className="size-4" aria-hidden />
                )}
                {tripState === 'none' ? t('download') : t('update')}
              </Button>
              {tripState !== 'none' && (
                <Button variant="outline" onClick={handleClear} disabled={busy !== null}>
                  <Trash2 className="size-4" aria-hidden />
                  {t('clear')}
                </Button>
              )}
            </div>

            {estimate && estimate.quota > 0 && (
              <p className="text-xs text-muted-foreground">
                {t('storage', {
                  used: formatBytes(estimate.usage),
                  total: formatBytes(estimate.quota),
                })}
              </p>
            )}

            <p className="border-t border-border pt-3 text-xs text-muted-foreground">
              {t('mapTip')}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
