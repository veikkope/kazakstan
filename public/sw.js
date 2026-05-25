/**
 * Service worker — offline support for trip use.
 *
 * Two tiers of caching:
 *   1. Runtime (reactive): pages / static / tiles / images are cached as you
 *      browse, with LRU bounds on the volatile tile + image caches.
 *   2. Trip download (proactive): the in-app "Download for offline" action
 *      fills dedicated, eviction-exempt trip caches with the WHOLE trip —
 *      every sight page, its JS/CSS/font assets and images, plus map tiles for
 *      the chosen regions — so it survives offline regardless of LRU pressure.
 *
 * Strategies:
 *   - App shell (default-locale routes + icons/markers): precache on install
 *   - HTML navigations: network-first → any cache → default-locale shell
 *   - Static assets / images: cache-first (checks every cache, incl. trip)
 *   - Map tiles: cache-first; trip tiles win, runtime tiles stay LRU-bounded
 */

const VERSION = 'v4';
const SHELL_CACHE = `shell-${VERSION}`;
const PAGES_CACHE = `pages-${VERSION}`;
const STATIC_CACHE = `static-${VERSION}`;
const TILES_CACHE = `tiles-${VERSION}`;
const REMOTE_IMG_CACHE = `remote-img-${VERSION}`;
// Proactively downloaded trip — kept separate so it's never LRU-evicted.
const TRIP_CACHE = `trip-${VERSION}`;
const TRIP_TILES_CACHE = `trip-tiles-${VERSION}`;

const TILES_MAX_ENTRIES = 400;
const REMOTE_IMG_MAX_ENTRIES = 200;
const TRIP_FETCH_CONCURRENCY = 6;

const DEFAULT_LOCALE = 'fi';
const LOCALES = ['fi', 'en', 'ru', 'kk'];
const OFFLINE_FALLBACK = `/${DEFAULT_LOCALE}`;

// Note: '/' is intentionally NOT precached — it 308-redirects to /<locale>,
// and a cached *redirected* response can't satisfy a navigation request
// (the browser rejects it). The default-locale shell is the fallback instead.
const SHELL_URLS = [
  OFFLINE_FALLBACK,
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

const ALLOWED_CACHES = new Set([
  SHELL_CACHE,
  PAGES_CACHE,
  STATIC_CACHE,
  TILES_CACHE,
  REMOTE_IMG_CACHE,
  TRIP_CACHE,
  TRIP_TILES_CACHE,
]);

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Best-effort: individual catches so one 404 can't abort the install.
      await Promise.all(
        SHELL_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'reload' });
            if (res.ok) await cache.put(url, res);
          } catch {
            /* ignore */
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
      await Promise.all(
        keys.filter((k) => !ALLOWED_CACHES.has(k)).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  const data = event.data;
  if (data === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (!data || typeof data !== 'object') return;
  if (data.type === 'CACHE_TRIP') {
    event.waitUntil(cacheTrip(data, event.source));
  } else if (data.type === 'CLEAR_TRIP') {
    event.waitUntil(clearTrip(event.source));
  } else if (data.type === 'TRIP_STATUS') {
    event.waitUntil(reportTripStatus(event.source));
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Map tiles (OSM light + Carto dark) — trip tiles first, then bounded runtime.
  if (
    /\.tile\.openstreetmap\.org$/.test(url.hostname) ||
    /\.basemaps\.cartocdn\.com$/.test(url.hostname)
  ) {
    event.respondWith(tileResponse(request));
    return;
  }

  // Wikimedia images (a few sights) — cache-first (any cache), bounded runtime.
  if (url.hostname === 'upload.wikimedia.org') {
    event.respondWith(
      cacheFirstWithLimit(request, REMOTE_IMG_CACHE, REMOTE_IMG_MAX_ENTRIES),
    );
    return;
  }

  // Other cross-origin: don't intercept.
  if (url.origin !== self.location.origin) return;

  // Next image optimizer endpoint — bounded image cache.
  if (url.pathname.startsWith('/_next/image')) {
    event.respondWith(
      cacheFirstWithLimit(request, REMOTE_IMG_CACHE, REMOTE_IMG_MAX_ENTRIES),
    );
    return;
  }

  // HTML navigation — network-first, fall back to any cache, then shell.
  if (
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html')
  ) {
    event.respondWith(navigateResponse(request));
    return;
  }

  // Same-origin static assets (incl. /images/sights/*.jpg) — cache-first.
  if (
    url.pathname.startsWith('/_next/') ||
    /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|webp|svg|ico|gif)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
});

// ---- response strategies ----

function localeFromCookie(request) {
  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  return m && LOCALES.includes(m[1]) ? m[1] : DEFAULT_LOCALE;
}

function hasLocalePrefix(pathname) {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

async function navigateResponse(request) {
  const url = new URL(request.url);
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(PAGES_CACHE);
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    // Offline. The locale proxy is server-only and can't run, so replicate its
    // redirect here: any locale-less path — notably the "/" start_url when the
    // PWA cold-launches — becomes /<locale> from the NEXT_LOCALE cookie.
    // Without this the app boots at a locale-less, route-less "/" and every
    // navigation falls back to the home page.
    if (!hasLocalePrefix(url.pathname)) {
      const loc = localeFromCookie(request);
      const target =
        url.pathname === '/' ? `/${loc}` : `/${loc}${url.pathname}${url.search}`;
      return Response.redirect(new URL(target, url.origin).href, 302);
    }
    const cached = await caches.match(request);
    if (cached) return cached;
    const shell = await caches.open(SHELL_CACHE);
    return (
      (await shell.match(`/${localeFromCookie(request)}`)) ||
      (await shell.match(OFFLINE_FALLBACK)) ||
      Response.error()
    );
  }
}

async function tileResponse(request) {
  // Downloaded trip tiles are eviction-exempt and win over the LRU cache.
  const trip = await caches.open(TRIP_TILES_CACHE);
  const tripHit = await trip.match(request);
  if (tripHit) return tripHit;
  return cacheFirstWithLimit(request, TILES_CACHE, TILES_MAX_ENTRIES);
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request); // searches every cache, incl. trip
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    return cached || Response.error();
  }
}

async function cacheFirstWithLimit(request, cacheName, maxEntries) {
  const cached = await caches.match(request); // searches every cache, incl. trip
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
      trimCache(cacheName, maxEntries);
    }
    return response;
  } catch {
    return cached || Response.error();
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

// ---- trip download (proactive offline provisioning) ----

async function cacheTrip(data, client) {
  const urls = Array.isArray(data.urls) ? data.urls : [];
  const tiles = Array.isArray(data.tiles) ? data.tiles : [];
  const total = urls.length + tiles.length;
  let done = 0;
  let failed = 0;
  let bytes = 0;

  const post = (type) =>
    client && client.postMessage({ type, done, total, failed, bytes });

  const tripCache = await caches.open(TRIP_CACHE);
  const tripTiles = await caches.open(TRIP_TILES_CACHE);

  // Pages / assets / images. Same-origin → real response (check .ok and size);
  // cross-origin (e.g. Wikimedia) → opaque no-cors response, stored as-is.
  await runPool(urls, TRIP_FETCH_CONCURRENCY, async (u) => {
    try {
      const crossOrigin =
        new URL(u, self.location.origin).origin !== self.location.origin;
      const res = await fetch(u, crossOrigin ? { mode: 'no-cors' } : { cache: 'reload' });
      if (crossOrigin) {
        await tripCache.put(u, res);
      } else if (res.ok) {
        bytes += await responseBytes(res.clone());
        await tripCache.put(u, res);
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
    done++;
    if (done % 8 === 0) post('CACHE_TRIP_PROGRESS');
  });

  // Map tiles — cross-origin, opaque.
  await runPool(tiles, TRIP_FETCH_CONCURRENCY, async (u) => {
    try {
      const res = await fetch(u, { mode: 'no-cors' });
      await tripTiles.put(u, res);
    } catch {
      failed++;
    }
    done++;
    if (done % 8 === 0) post('CACHE_TRIP_PROGRESS');
  });

  post('CACHE_TRIP_DONE');
}

async function responseBytes(res) {
  const len = res.headers.get('content-length');
  if (len) return Number(len) || 0;
  try {
    return (await res.arrayBuffer()).byteLength;
  } catch {
    return 0;
  }
}

async function runPool(items, concurrency, worker) {
  let i = 0;
  const runners = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (i < items.length) {
        const idx = i++;
        await worker(items[idx]);
      }
    },
  );
  await Promise.all(runners);
}

async function clearTrip(client) {
  await caches.delete(TRIP_CACHE);
  await caches.delete(TRIP_TILES_CACHE);
  if (client) client.postMessage({ type: 'TRIP_CLEARED' });
}

async function reportTripStatus(client) {
  const tripCache = await caches.open(TRIP_CACHE);
  const tripTiles = await caches.open(TRIP_TILES_CACHE);
  const pages = (await tripCache.keys()).length;
  const tiles = (await tripTiles.keys()).length;
  if (client) {
    client.postMessage({ type: 'TRIP_STATUS_RESULT', pages, tiles });
  }
}
