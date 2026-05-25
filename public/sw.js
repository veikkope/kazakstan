/**
 * Service worker — offline support for trip use.
 * Strategies:
 *   - App shell (top-level routes): precache on install
 *   - HTML navigations: network-first, fall back to cache, then to /
 *   - Same-origin static assets: cache-first
 *   - OSM map tiles: cache-first with LRU trim (bounded storage)
 */

const VERSION = 'v3';
const SHELL_CACHE = `shell-${VERSION}`;
const PAGES_CACHE = `pages-${VERSION}`;
const STATIC_CACHE = `static-${VERSION}`;
const TILES_CACHE = `tiles-${VERSION}`;
const REMOTE_IMG_CACHE = `remote-img-${VERSION}`;
const TILES_MAX_ENTRIES = 400;
const REMOTE_IMG_MAX_ENTRIES = 200;

// Precache the default-locale (fi) shell plus locale-independent assets.
// Non-default locales (/en, /ru, /kk) are covered at runtime by the
// network-first navigation handler below, which caches each visited page.
const SHELL_URLS = [
  '/',
  '/fi',
  '/fi/today',
  '/fi/map',
  '/fi/sights',
  '/fi/routes',
  '/fi/itinerary',
  '/fi/shortlist',
  '/fi/budget',
  '/fi/car-rental',
  '/fi/info',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/leaflet/marker-icon.png',
  '/leaflet/marker-icon-2x.png',
  '/leaflet/marker-shadow.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Use addAll with individual catches so one 404 doesn't break the install.
      await Promise.all(
        SHELL_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'reload' });
            if (res.ok) await cache.put(url, res);
          } catch {
            /* ignore — best effort precache */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const allowed = new Set([
        SHELL_CACHE,
        PAGES_CACHE,
        STATIC_CACHE,
        TILES_CACHE,
        REMOTE_IMG_CACHE,
      ]);
      await Promise.all(
        keys.filter((k) => !allowed.has(k)).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // OSM tile servers — cache-first, LRU-bounded.
  if (/\.tile\.openstreetmap\.org$/.test(url.hostname)) {
    event.respondWith(cacheFirstWithLimit(request, TILES_CACHE, TILES_MAX_ENTRIES));
    return;
  }

  // Wikimedia image hosts (sight photos via next/image) — cache-first, bounded.
  if (url.hostname === 'upload.wikimedia.org') {
    event.respondWith(
      cacheFirstWithLimit(request, REMOTE_IMG_CACHE, REMOTE_IMG_MAX_ENTRIES),
    );
    return;
  }

  // Next.js image optimizer endpoint — also bounded image cache.
  if (url.origin === self.location.origin && url.pathname.startsWith('/_next/image')) {
    event.respondWith(
      cacheFirstWithLimit(request, REMOTE_IMG_CACHE, REMOTE_IMG_MAX_ENTRIES),
    );
    return;
  }

  // Cross-origin (other): don't intercept (fonts, analytics, etc).
  if (url.origin !== self.location.origin) return;

  // HTML navigation — network-first.
  if (
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html')
  ) {
    event.respondWith(networkFirst(request, PAGES_CACHE));
    return;
  }

  // Static assets (Next.js bundles, images, fonts, leaflet markers) — cache-first.
  if (
    url.pathname.startsWith('/_next/') ||
    /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|webp|svg|ico|gif)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    return cached || Response.error();
  }
}

async function cacheFirstWithLimit(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
      await cache.put(request, response.clone());
      trimCache(cacheName, maxEntries);
    }
    return response;
  } catch {
    return cached || Response.error();
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    const shell = await caches.open(SHELL_CACHE);
    return (await shell.match(request)) || (await shell.match('/')) || Response.error();
  }
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const excess = keys.length - maxEntries;
  if (excess <= 0) return;
  // FIFO trim — Cache API has no native LRU.
  for (let i = 0; i < excess; i++) {
    await cache.delete(keys[i]);
  }
}
