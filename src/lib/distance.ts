import type { Coords, Sight } from './types';

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function haversineKm(a: Coords, b: Coords): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export interface NearbyResult {
  sight: Sight;
  distanceKm: number;
}

export function nearestSights(
  origin: Sight,
  candidates: Sight[],
  limit = 5,
): NearbyResult[] {
  return candidates
    .filter((s) => s.id !== origin.id)
    .map((sight) => ({ sight, distanceKm: haversineKm(origin.coords, sight.coords) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}
