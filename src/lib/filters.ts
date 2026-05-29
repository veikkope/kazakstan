import type { Activity, Category, Region, Sight } from './types';

export function filterByCategories(sights: Sight[], categories: Category[]): Sight[] {
  if (categories.length === 0) return sights;
  const set = new Set(categories);
  return sights.filter((s) => set.has(s.category));
}

export function filterByRegions(sights: Sight[], regions: Region[]): Sight[] {
  if (regions.length === 0) return sights;
  const set = new Set(regions);
  return sights.filter((s) => set.has(s.region));
}

/**
 * Activity is a cross-cutting tag orthogonal to category, so this composes
 * with `filterByCategories` via straight AND (caller chains both). Sights
 * without an `activity` are excluded when any activity filter is active —
 * that's the point of the filter (e.g. "show me only hikes").
 */
export function filterByActivities(sights: Sight[], activities: Activity[]): Sight[] {
  if (activities.length === 0) return sights;
  const set = new Set(activities);
  return sights.filter((s) => s.activity !== undefined && set.has(s.activity));
}

export function findBySlug(sights: Sight[], slug: string): Sight | undefined {
  return sights.find((s) => s.slug === slug);
}

export function findById(sights: Sight[], id: string): Sight | undefined {
  return sights.find((s) => s.id === id);
}
