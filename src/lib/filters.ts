import type { Category, Region, Sight } from './types';

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

export function findBySlug(sights: Sight[], slug: string): Sight | undefined {
  return sights.find((s) => s.slug === slug);
}

export function findById(sights: Sight[], id: string): Sight | undefined {
  return sights.find((s) => s.id === id);
}
