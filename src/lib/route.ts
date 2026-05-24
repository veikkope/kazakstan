import type { Coords, Region } from './types';
import { haversineKm } from './distance';

/**
 * Maximum number of stops Google Maps' Directions URL API will honor.
 * The spec allows `origin` + up to 9 `waypoints` + `destination` = 11 points.
 * https://developers.google.com/maps/documentation/urls/get-started#directions-action
 */
export const GMAPS_MAX_STOPS = 11;

/**
 * Below this point count we solve TSP exactly via Held–Karp DP. Above it we
 * fall back to nearest-neighbour + a small 2-opt pass. 10 keeps DP under
 * 2^10 * 10^2 ≈ 100k ops, well under 1 ms.
 */
const EXACT_TSP_THRESHOLD = 10;

export interface RoutePoint {
  /** Stable id of the underlying sight — caller maps this back to display data. */
  id: string;
  coords: Coords;
  /** Display label embedded in the Google Maps URL (becomes the pin label). */
  label: string;
}

export interface OrderedRoute {
  /** Points in visiting order — first is origin, last is destination. */
  points: RoutePoint[];
  /** Total straight-line distance in km. Sanity-check only — not a road estimate. */
  totalKm: number;
}

/**
 * Order a set of points into a path that minimises total straight-line
 * distance, starting from `originIndex` (default 0). The first point in the
 * input is treated as anchor unless `originIndex` is provided.
 *
 * Why an open-tour (not a TSP cycle): users will navigate point-to-point and
 * stop at the last one, not return. Returning to origin would inflate the
 * route on the map.
 */
export function orderRoute(
  points: readonly RoutePoint[],
  originIndex = 0,
): OrderedRoute {
  if (points.length === 0) return { points: [], totalKm: 0 };
  if (points.length === 1) return { points: [points[0]], totalKm: 0 };

  const ordered =
    points.length <= EXACT_TSP_THRESHOLD
      ? heldKarpOpenTour(points, originIndex)
      : nearestNeighbour(points, originIndex);

  // Always polish with 2-opt — it's O(n²) per pass and cheap, and it cleans
  // up the rare crossings that NN can leave behind. Held–Karp output is
  // already optimal so 2-opt is a no-op there; harmless overhead.
  const polished = twoOpt(ordered);
  return { points: polished, totalKm: pathLengthKm(polished) };
}

function pathLengthKm(points: readonly RoutePoint[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineKm(points[i - 1].coords, points[i].coords);
  }
  return total;
}

/**
 * Held–Karp DP for open-tour TSP: find the minimum-cost path that starts at
 * `originIndex`, visits every other point exactly once, and ends anywhere.
 * dp[mask][last] = min cost to visit `mask` ending at `last`.
 */
function heldKarpOpenTour(
  points: readonly RoutePoint[],
  originIndex: number,
): RoutePoint[] {
  const n = points.length;
  const dist: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = haversineKm(points[i].coords, points[j].coords);
      dist[i][j] = d;
      dist[j][i] = d;
    }
  }

  const SIZE = 1 << n;
  const dp: number[][] = Array.from({ length: SIZE }, () =>
    new Array(n).fill(Infinity),
  );
  const parent: number[][] = Array.from({ length: SIZE }, () =>
    new Array(n).fill(-1),
  );
  const startMask = 1 << originIndex;
  dp[startMask][originIndex] = 0;

  for (let mask = 0; mask < SIZE; mask++) {
    if ((mask & startMask) === 0) continue;
    for (let last = 0; last < n; last++) {
      if ((mask & (1 << last)) === 0) continue;
      const cost = dp[mask][last];
      if (!Number.isFinite(cost)) continue;
      for (let next = 0; next < n; next++) {
        if (mask & (1 << next)) continue;
        const nextMask = mask | (1 << next);
        const candidate = cost + dist[last][next];
        if (candidate < dp[nextMask][next]) {
          dp[nextMask][next] = candidate;
          parent[nextMask][next] = last;
        }
      }
    }
  }

  const fullMask = SIZE - 1;
  let bestEnd = originIndex;
  let bestCost = Infinity;
  for (let end = 0; end < n; end++) {
    if (dp[fullMask][end] < bestCost) {
      bestCost = dp[fullMask][end];
      bestEnd = end;
    }
  }

  const order: number[] = [];
  let mask = fullMask;
  let cur = bestEnd;
  while (cur !== -1) {
    order.push(cur);
    const prev = parent[mask][cur];
    mask &= ~(1 << cur);
    cur = prev;
  }
  order.reverse();
  return order.map((i) => points[i]);
}

function nearestNeighbour(
  points: readonly RoutePoint[],
  originIndex: number,
): RoutePoint[] {
  const visited = new Set<number>([originIndex]);
  const order: number[] = [originIndex];
  while (order.length < points.length) {
    const last = order[order.length - 1];
    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = 0; i < points.length; i++) {
      if (visited.has(i)) continue;
      const d = haversineKm(points[last].coords, points[i].coords);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    visited.add(bestIdx);
    order.push(bestIdx);
  }
  return order.map((i) => points[i]);
}

/**
 * In-place 2-opt: repeatedly reverse a segment if doing so shortens the path.
 * Anchored on index 0 (the origin is fixed); the open-tour end is free.
 */
function twoOpt(input: readonly RoutePoint[]): RoutePoint[] {
  if (input.length < 4) return [...input];
  const route = [...input];
  let improved = true;
  // Cap iterations defensively — convergence is normally <5 passes for n ≤ 20.
  let guard = 20;
  while (improved && guard-- > 0) {
    improved = false;
    for (let i = 1; i < route.length - 2; i++) {
      for (let j = i + 1; j < route.length - 1; j++) {
        const a = route[i - 1].coords;
        const b = route[i].coords;
        const c = route[j].coords;
        const d = route[j + 1].coords;
        const before = haversineKm(a, b) + haversineKm(c, d);
        const after = haversineKm(a, c) + haversineKm(b, d);
        if (after + 1e-9 < before) {
          reverseSegment(route, i, j);
          improved = true;
        }
      }
    }
  }
  return route;
}

function reverseSegment<T>(arr: T[], from: number, to: number): void {
  while (from < to) {
    const tmp = arr[from];
    arr[from] = arr[to];
    arr[to] = tmp;
    from++;
    to--;
  }
}

/**
 * Build a Google Maps Directions deep link. Works on every platform:
 * - iOS Safari → opens Google Maps app if installed, else web
 * - Android → opens Google Maps app
 * - Desktop → opens maps.google.com in a tab
 *
 * Origin is intentionally omitted by default → Google Maps prompts the user
 * for "Your location", which is the right behaviour when navigating on the
 * road. Pass `originAsFirst: true` to fix the first point as origin instead
 * (e.g. when planning at home from a known starting city).
 *
 * Throws if `points` is empty. Caller must enforce GMAPS_MAX_STOPS.
 */
export function buildGoogleMapsRouteUrl(
  points: readonly RoutePoint[],
  options: { originAsFirst?: boolean } = {},
): string {
  if (points.length === 0) {
    throw new Error('buildGoogleMapsRouteUrl: points must not be empty');
  }

  const params = new URLSearchParams();
  params.set('api', '1');
  params.set('travelmode', 'driving');

  const dest = points[points.length - 1];
  const destValue = `${dest.coords.lat},${dest.coords.lng}`;
  params.set('destination', destValue);

  const middle = options.originAsFirst ? points.slice(1, -1) : points.slice(0, -1);

  if (options.originAsFirst && points.length >= 2) {
    const origin = points[0];
    params.set('origin', `${origin.coords.lat},${origin.coords.lng}`);
  }

  if (middle.length > 0) {
    const waypoints = middle
      .map((p) => `${p.coords.lat},${p.coords.lng}`)
      .join('|');
    params.set('waypoints', waypoints);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/* ============================================================
 * Multi-navigator support
 * ------------------------------------------------------------
 * Each navigator has its own URL grammar:
 *   - Google Maps: api=1, lat,lng, pipe-separated waypoints
 *   - Yandex Maps: rtext=p1~p2~p3 (lat,lng) — empty first slot = current location
 *   - 2GIS:        /points/|lng,lat|lng,lat — note: lng FIRST, city subdomain
 *   - Apple Maps:  daddr=lat,lng — single destination only, no waypoints API
 *
 * Apple Maps is included for completeness but multi-stop is impossible via
 * the public web URL. We open it pointed at the FIRST point of the route so
 * iOS users at least get started; UI surfaces a "(vain 1. kohde)" hint.
 * ============================================================ */

export type NavigatorId = 'google' | 'yandex' | '2gis' | 'apple';

export interface NavigatorMeta {
  /** Display label shown in menu items. */
  label: string;
  /** True if the navigator honours all waypoints; false → first point only. */
  fullMultiStop: boolean;
}

export const NAVIGATOR_META: Record<NavigatorId, NavigatorMeta> = {
  google: { label: 'Google Maps', fullMultiStop: true },
  yandex: { label: 'Yandex Maps', fullMultiStop: true },
  '2gis': { label: '2GIS', fullMultiStop: true },
  apple: { label: 'Apple Maps', fullMultiStop: false },
};

export const NAVIGATOR_ORDER: NavigatorId[] = ['google', 'yandex', '2gis', 'apple'];

/**
 * 2GIS uses per-city subdomains in the URL path. There is no global-routes
 * endpoint, so we pick the closest covered city. Turkistan is small enough
 * that 2GIS routes through Shymkent's catalogue most reliably.
 */
const REGION_TO_2GIS_CITY: Record<Region, string> = {
  almaty: 'almaty',
  'almaty-region': 'almaty',
  astana: 'astana',
  turkistan: 'shymkent',
  shymkent: 'shymkent',
  aktau: 'aktau',
  other: 'almaty',
};

export function buildYandexRouteUrl(points: readonly RoutePoint[]): string {
  if (points.length === 0) {
    throw new Error('buildYandexRouteUrl: points must not be empty');
  }
  // Leading empty segment ("~p1~p2") tells Yandex "from current location".
  // The app/web both accept this and prompt the user for permission.
  const rtext = ['', ...points.map((p) => `${p.coords.lat},${p.coords.lng}`)].join(
    '~',
  );
  const params = new URLSearchParams();
  params.set('rtext', rtext);
  params.set('rtt', 'auto');
  return `https://yandex.com/maps/?${params.toString()}`;
}

export function buildTwoGisRouteUrl(
  points: readonly RoutePoint[],
  region: Region = 'almaty',
): string {
  if (points.length === 0) {
    throw new Error('buildTwoGisRouteUrl: points must not be empty');
  }
  const city = REGION_TO_2GIS_CITY[region] ?? 'almaty';
  // 2GIS path format: /<city>/directions/points/<seg>|<seg>|<seg>
  // First empty segment = "from current location". Coordinates are lng,lat
  // (longitude first — opposite of Google/Yandex).
  const segments = ['', ...points.map((p) => `${p.coords.lng},${p.coords.lat}`)];
  // Pipes in the path are technically reserved; encode to %7C for safety.
  // Coordinate commas and dots are fine unencoded in the path component.
  const path = segments.join('%7C');
  return `https://2gis.kz/${city}/directions/points/${path}`;
}

/**
 * Apple Maps web URL only supports a single destination — no waypoints API.
 * For multi-stop input we navigate to the FIRST point of the optimised
 * route so the user can start moving; the calling UI is responsible for
 * communicating the limitation.
 */
export function buildAppleMapsRouteUrl(points: readonly RoutePoint[]): string {
  if (points.length === 0) {
    throw new Error('buildAppleMapsRouteUrl: points must not be empty');
  }
  const target = points[0];
  const params = new URLSearchParams();
  params.set('daddr', `${target.coords.lat},${target.coords.lng}`);
  params.set('dirflg', 'd');
  return `https://maps.apple.com/?${params.toString()}`;
}

export interface BuildNavigatorUrlOptions {
  /** Used by 2GIS to pick the city subdomain. */
  region?: Region;
}

/** Single entry point used by the UI — picks the right builder per nav id. */
export function buildNavigatorRouteUrl(
  nav: NavigatorId,
  points: readonly RoutePoint[],
  options: BuildNavigatorUrlOptions = {},
): string {
  switch (nav) {
    case 'google':
      return buildGoogleMapsRouteUrl(points);
    case 'yandex':
      return buildYandexRouteUrl(points);
    case '2gis':
      return buildTwoGisRouteUrl(points, options.region);
    case 'apple':
      return buildAppleMapsRouteUrl(points);
  }
}
