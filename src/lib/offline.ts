/**
 * Client-side orchestration for the "Download trip for offline" feature.
 *
 * Flow:
 *   1. Discover the app's hashed JS/CSS/font assets by fetching a sample of
 *      pages and parsing their HTML (one per distinct route segment — they
 *      share chunks). The map's Leaflet bundle is a runtime dynamic import not
 *      present in the HTML, so we additionally warm it in a hidden iframe.
 *   2. Hand the full URL set (pages + assets + images) plus the chosen tile
 *      URLs to the service worker, which fetches them into eviction-exempt
 *      trip caches and reports progress back.
 *   3. Persist a small manifest in localStorage for the UI.
 *
 * No service worker is registered in development, so these helpers degrade to
 * a no-op (the UI surfaces that the feature needs the built/installed app).
 */
import { sights } from '@/data/sights';
import { presets } from '@/data/presets';

const SHELL_SEGMENTS = [
  'today',
  'map',
  'sights',
  'routes',
  'itinerary',
  'shortlist',
  'budget',
  'car-rental',
  'info',
] as const;

const MANIFEST_KEY = 'kz-offline-trip';
const DOWNLOAD_TIMEOUT_MS = 10 * 60 * 1000;

export interface TripManifest {
  locale: string;
  pages: number;
  images: number;
  tiles: number;
  bytes: number;
  at: number;
}

export interface DownloadProgress {
  phase: 'preparing' | 'downloading' | 'done';
  done: number;
  total: number;
  bytes: number;
}

// ---- URL building ----

export function tripPageUrls(locale: string): string[] {
  const urls = new Set<string>([`/${locale}`]);
  for (const seg of SHELL_SEGMENTS) urls.add(`/${locale}/${seg}`);
  for (const s of sights) urls.add(`/${locale}/sights/${s.slug}`);
  for (const p of presets) urls.add(`/${locale}/routes/${p.id}`);
  return [...urls];
}

export function tripImageUrls(): string[] {
  const urls = new Set<string>();
  for (const s of sights) if (s.image) urls.add(s.image);
  return [...urls];
}

// ---- service worker plumbing ----

async function activeServiceWorker(): Promise<ServiceWorker | null> {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  const ready = navigator.serviceWorker.ready
    .then((reg) => reg.active)
    .catch(() => null);
  // In dev there's no registration, so `ready` never settles — cap the wait.
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
  return Promise.race([ready, timeout]);
}

export function isOfflineDownloadSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'serviceWorker' in navigator &&
    'caches' in window
  );
}

// ---- asset discovery ----

function discoveryPages(locale: string): string[] {
  // One page per distinct route segment is enough — dynamic params share chunks.
  const pages = [`/${locale}`, ...SHELL_SEGMENTS.map((s) => `/${locale}/${s}`)];
  if (sights[0]) pages.push(`/${locale}/sights/${sights[0].slug}`);
  if (presets[0]) pages.push(`/${locale}/routes/${presets[0].id}`);
  return pages;
}

async function discoverAssets(locale: string): Promise<string[]> {
  const assets = new Set<string>();
  await Promise.all(
    discoveryPages(locale).map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'reload' });
        if (!res.ok) return;
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('script[src], link[href]').forEach((el) => {
          const u = el.getAttribute('src') ?? el.getAttribute('href') ?? '';
          if (u.startsWith('/_next/')) assets.add(u);
        });
      } catch {
        /* ignore — a missing discovery page just means fewer assets warmed */
      }
    }),
  );
  return [...assets];
}

function warmInIframe(url: string, timeoutMs: number): Promise<void> {
  return new Promise<void>((resolve) => {
    if (typeof document === 'undefined') return resolve();
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    // 0×0, inert, at the viewport origin: it still loads and runs (so the
    // map's dynamic Leaflet chunk is fetched + cached) but can't steal focus or
    // nudge scroll the way an off-screen 1px iframe does on mobile Safari.
    iframe.style.cssText =
      'position:fixed;left:0;top:0;width:0;height:0;opacity:0;border:0;pointer-events:none;';
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      iframe.remove();
      resolve();
    };
    // After load, give dynamic imports (Leaflet) a moment to fetch before cleanup.
    iframe.onload = () => setTimeout(finish, 2500);
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(finish, timeoutMs);
  });
}

// ---- public API ----

export async function downloadTrip(
  locale: string,
  tiles: string[],
  onProgress: (p: DownloadProgress) => void,
): Promise<TripManifest> {
  const sw = await activeServiceWorker();
  if (!sw) throw new Error('offline-unavailable');

  onProgress({ phase: 'preparing', done: 0, total: 0, bytes: 0 });

  // Warm the map's runtime-imported Leaflet chunk (not in any page's HTML).
  await warmInIframe(`/${locale}/map`, 8000).catch(() => {});
  const assets = await discoverAssets(locale);

  const pages = tripPageUrls(locale);
  const images = tripImageUrls();
  const urls = [...new Set([...pages, ...assets, ...images])];

  const result = await new Promise<{ bytes: number }>((resolve, reject) => {
    const onMessage = (event: MessageEvent) => {
      const d = event.data;
      if (!d || typeof d !== 'object') return;
      if (d.type === 'CACHE_TRIP_PROGRESS') {
        onProgress({ phase: 'downloading', done: d.done, total: d.total, bytes: d.bytes });
      } else if (d.type === 'CACHE_TRIP_DONE') {
        cleanup();
        resolve({ bytes: d.bytes ?? 0 });
      }
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('timeout'));
    }, DOWNLOAD_TIMEOUT_MS);
    function cleanup() {
      clearTimeout(timer);
      navigator.serviceWorker.removeEventListener('message', onMessage);
    }
    navigator.serviceWorker.addEventListener('message', onMessage);
    sw.postMessage({ type: 'CACHE_TRIP', urls, tiles });
  });

  const manifest: TripManifest = {
    locale,
    pages: pages.length,
    images: images.length,
    tiles: tiles.length,
    bytes: result.bytes,
    at: Date.now(),
  };
  writeManifest(manifest);
  onProgress({
    phase: 'done',
    done: urls.length + tiles.length,
    total: urls.length + tiles.length,
    bytes: result.bytes,
  });
  return manifest;
}

export async function clearTrip(): Promise<void> {
  clearManifest();
  const sw = await activeServiceWorker();
  sw?.postMessage({ type: 'CLEAR_TRIP' });
}

export async function getTripStatus(): Promise<{ pages: number; tiles: number } | null> {
  const sw = await activeServiceWorker();
  if (!sw) return null;
  return new Promise((resolve) => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === 'TRIP_STATUS_RESULT') {
        cleanup();
        resolve({ pages: event.data.pages, tiles: event.data.tiles });
      }
    };
    const timer = setTimeout(() => {
      cleanup();
      resolve(null);
    }, 4000);
    function cleanup() {
      clearTimeout(timer);
      navigator.serviceWorker.removeEventListener('message', onMessage);
    }
    navigator.serviceWorker.addEventListener('message', onMessage);
    sw.postMessage({ type: 'TRIP_STATUS' });
  });
}

export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (navigator.storage?.persist) {
      if (await navigator.storage.persisted()) return true;
      return await navigator.storage.persist();
    }
  } catch {
    /* ignore */
  }
  return false;
}

export async function storageEstimate(): Promise<{ usage: number; quota: number } | null> {
  try {
    if (navigator.storage?.estimate) {
      const e = await navigator.storage.estimate();
      return { usage: e.usage ?? 0, quota: e.quota ?? 0 };
    }
  } catch {
    /* ignore */
  }
  return null;
}

// ---- manifest persistence ----

export function readManifest(): TripManifest | null {
  try {
    const raw = localStorage.getItem(MANIFEST_KEY);
    return raw ? (JSON.parse(raw) as TripManifest) : null;
  } catch {
    return null;
  }
}

function writeManifest(m: TripManifest): void {
  try {
    localStorage.setItem(MANIFEST_KEY, JSON.stringify(m));
  } catch {
    /* ignore */
  }
}

function clearManifest(): void {
  try {
    localStorage.removeItem(MANIFEST_KEY);
  } catch {
    /* ignore */
  }
}
