'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
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
import { useOffline } from '@/components/offline/OfflineProvider';
import { tripAudioUrls } from '@/lib/offline';
import { cn } from '@/lib/utils';

const MAX_ZOOM_MIN = 8;
const MAX_ZOOM_MAX = 12;
const MAX_ZOOM_DEFAULT = 10;

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 MB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function OfflineManager() {
  const t = useTranslations('components.offline');
  const locale = useLocale();
  const loc = asLocale(locale);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  // App-wide download state — owned by OfflineProvider so it survives
  // navigation and a global toast can report progress on any page.
  const { supported, manifest, tripState, estimate, busy, progress, startDownload, clear } =
    useOffline();

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
  const audioCount = useMemo(() => tripAudioUrls().length, []);

  function toggleRegion(region: Region) {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region],
    );
  }

  function handleDownload() {
    if (busy) return;
    const tiles =
      includeTiles && bboxes.length
        ? tileUrls(tilesForBboxes(bboxes, TILE_MIN_ZOOM, maxZoom), theme)
        : [];
    void startDownload(locale, tiles);
  }

  const downloading = busy === 'download';
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
            {/* Status line + content breakdown */}
            <div className="space-y-1">
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
              {manifest && tripState === 'ready' && (
                <p className="text-xs text-muted-foreground">
                  {t('breakdown', {
                    pages: manifest.pages,
                    images: manifest.images,
                    audio: manifest.audio,
                    tiles: manifest.tiles,
                  })}
                </p>
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
              {t('includesNote', { sights: sightsWithImages, audio: audioCount })}
            </p>

            {/* Progress (also mirrored in a global toast, so it shows on any page) */}
            {downloading && progress && (
              <div className="space-y-1.5" role="status" aria-live="polite">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-full rounded-full bg-primary',
                      progress.phase === 'preparing'
                        ? 'w-1/3 animate-pulse'
                        : 'transition-[width] duration-300',
                    )}
                    style={progress.phase === 'preparing' ? undefined : { width: `${percent}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {progress.phase === 'preparing'
                    ? t('preparing')
                    : t('downloading', { done: progress.done, total: progress.total })}
                </p>
                <p className="text-xs text-muted-foreground">{t('keepBrowsing')}</p>
              </div>
            )}

            {/* Actions — aria-disabled (not the `disabled` attr) keeps focus on
                the button, avoiding the iOS Safari scroll-to-top that fires when
                a focused element is disabled. */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="default"
                aria-disabled={busy !== null}
                onClick={handleDownload}
                className={cn(busy !== null && 'opacity-70')}
              >
                {downloading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : tripState === 'none' ? (
                  <CloudDownload className="size-4" aria-hidden />
                ) : (
                  <RefreshCw className="size-4" aria-hidden />
                )}
                {tripState === 'none' ? t('download') : t('update')}
              </Button>
              {tripState !== 'none' && (
                <Button
                  variant="outline"
                  aria-disabled={busy !== null}
                  onClick={() => {
                    if (busy) return;
                    void clear();
                  }}
                  className={cn(busy !== null && 'opacity-70')}
                >
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
