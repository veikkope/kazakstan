/**
 * Slippy-map tile math for pre-downloading offline map coverage.
 *
 * Tiles are addressed as {z}/{x}/{y} (XYZ scheme). We turn geographic
 * bounding boxes into the set of tiles covering them across a zoom range,
 * and build URLs that match EXACTLY what Leaflet will request at runtime —
 * including the same a/b/c subdomain hashing — so a precached tile is a
 * cache hit when the live map asks for it.
 */
import { sights } from '@/data/sights';
import type { Region } from '@/lib/types';

export interface TileCoord {
  x: number;
  y: number;
  z: number;
}

export interface Bbox {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

function lngLatToTileXY(lng: number, lat: number, z: number) {
  const n = 2 ** z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  );
  return { x: clamp(x, 0, n - 1), y: clamp(y, 0, n - 1) };
}

/** Bounding box of all sights matching `filter` (defaults to all), padded. */
export function bboxForSights(
  filter?: (region: Region) => boolean,
  padDeg = 0.2,
): Bbox | null {
  const pts = sights.filter((s) => (filter ? filter(s.region) : true));
  if (pts.length === 0) return null;
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const s of pts) {
    minLng = Math.min(minLng, s.coords.lng);
    maxLng = Math.max(maxLng, s.coords.lng);
    minLat = Math.min(minLat, s.coords.lat);
    maxLat = Math.max(maxLat, s.coords.lat);
  }
  return {
    minLng: minLng - padDeg,
    minLat: minLat - padDeg,
    maxLng: maxLng + padDeg,
    maxLat: maxLat + padDeg,
  };
}

/** All distinct tiles covering the given bboxes across [minZoom, maxZoom]. */
export function tilesForBboxes(
  bboxes: Bbox[],
  minZoom: number,
  maxZoom: number,
): TileCoord[] {
  const seen = new Set<string>();
  const out: TileCoord[] = [];
  for (let z = minZoom; z <= maxZoom; z++) {
    for (const b of bboxes) {
      const tl = lngLatToTileXY(b.minLng, b.maxLat, z); // north-west
      const br = lngLatToTileXY(b.maxLng, b.minLat, z); // south-east
      for (let x = Math.min(tl.x, br.x); x <= Math.max(tl.x, br.x); x++) {
        for (let y = Math.min(tl.y, br.y); y <= Math.max(tl.y, br.y); y++) {
          const key = `${z}/${x}/${y}`;
          if (!seen.has(key)) {
            seen.add(key);
            out.push({ x, y, z });
          }
        }
      }
    }
  }
  return out;
}

/**
 * Upper-bound tile count for the given bboxes/zooms WITHOUT materializing the
 * coordinate list — cheap enough to call live on every slider drag. Ignores
 * cross-bbox overlap, so it slightly over-counts (which is the safe direction
 * for a size estimate).
 */
export function countTilesForBboxes(
  bboxes: Bbox[],
  minZoom: number,
  maxZoom: number,
): number {
  let count = 0;
  for (let z = minZoom; z <= maxZoom; z++) {
    for (const b of bboxes) {
      const tl = lngLatToTileXY(b.minLng, b.maxLat, z);
      const br = lngLatToTileXY(b.maxLng, b.minLat, z);
      count += (Math.abs(br.x - tl.x) + 1) * (Math.abs(br.y - tl.y) + 1);
    }
  }
  return count;
}

// Leaflet picks a subdomain as subdomains[(x + y) % subdomains.length] with the
// default subdomains 'abc'. Replicate it so our URLs match the live requests.
const SUBDOMAINS = 'abc';

export function tileUrl(t: TileCoord, theme: 'light' | 'dark'): string {
  const s = SUBDOMAINS[(t.x + t.y) % SUBDOMAINS.length];
  return theme === 'dark'
    ? `https://${s}.basemaps.cartocdn.com/dark_all/${t.z}/${t.x}/${t.y}.png`
    : `https://${s}.tile.openstreetmap.org/${t.z}/${t.x}/${t.y}.png`;
}

export function tileUrls(tiles: TileCoord[], theme: 'light' | 'dark'): string[] {
  return tiles.map((t) => tileUrl(t, theme));
}

/** Rough average weight of a 256px PNG tile, for pre-download size estimates. */
export const APPROX_TILE_BYTES = 22 * 1024;

export function estimateTileBytes(count: number): number {
  return count * APPROX_TILE_BYTES;
}

/** Minimum zoom always included — gives a usable country-level overview cheaply. */
export const TILE_MIN_ZOOM = 5;
