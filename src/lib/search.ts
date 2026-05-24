import { categoryMeta, regionMeta } from '@/data/categories';
import type { Sight, TranslatableString } from './types';

/**
 * Lightweight, dependency-free search for the sights dataset.
 *
 * Design notes:
 * - 66 sights × short strings → no Fuse.js, no indexing library, no worker.
 * - Diacritic-insensitive (NFD normalize + strip combining marks) so
 *   "almatys" matches "Almatyssa" and Russian/Kazakh translit accents
 *   (Аққөл → akkol) are forgiven.
 * - Token AND-match: every whitespace-separated token must appear somewhere
 *   in the index. Lets the user combine like "kanjoni almaty" naturally.
 * - Substring-match per token — fuzzy ranking added later if the dataset
 *   grows past a few hundred items.
 * - Multi-locale: each translatable field's all 4 locale variants are
 *   concatenated into the index, so a query in any supported language
 *   ("Чарын", "Charyn", "Шарын") matches the same sight.
 */

/** Flatten a `TranslatableString` to all available locale strings joined. */
function flattenTranslatable(value: TranslatableString | undefined): string {
  if (value === undefined) return '';
  if (typeof value === 'string') return value;
  // Concat every locale value so the index matches queries in any language.
  return `${value.fi} ${value.en} ${value.ru} ${value.kk}`;
}

/** Flatten an array of `TranslatableString`s, joined by spaces. */
function flattenTranslatableArray(
  values: readonly TranslatableString[] | undefined,
): string {
  if (!values) return '';
  return values.map(flattenTranslatable).join(' ');
}

/** NFD normalize, strip combining marks, locale-aware lowercase. */
export function normalize(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fi');
}

/**
 * Generic text matcher — exported for non-Sight call sites (e.g. matching
 * navigation labels in the command palette). Same AND-token semantics as
 * `matchesQuery`, just on a raw string instead of a Sight's pre-built index.
 */
export function matchesText(text: string, tokens: readonly string[]): boolean {
  if (tokens.length === 0) return true;
  const haystack = normalize(text);
  return tokens.every((t) => haystack.includes(t));
}

/**
 * Build a single concatenated searchable string for a sight. Includes every
 * field a traveller might recall: name (FI + local script), tags, short
 * description, city, plus translated category and region labels.
 *
 * Joined with " | " so token boundaries are preserved even when fields run
 * together visually.
 */
function buildIndex(sight: Sight): string {
  const parts: string[] = [
    flattenTranslatable(sight.name),
    sight.nameLocal ?? '',
    flattenTranslatable(sight.city),
    flattenTranslatable(sight.shortDescription),
    // Long description is included — pays for itself with matches like
    // "uponnut metsä" → Kaindy, "lumileopardi" → Aksu-Zhabagly. The
    // WeakMap cache absorbs the build cost; per-query token scan stays
    // O(n) on a ~few-kb string which is essentially free.
    flattenTranslatable(sight.description),
    flattenTranslatable(sight.historicalContext),
    // Category + region labels across all 4 locales — lets users find
    // "природа", "nature", "luonto", "табиғат" interchangeably.
    flattenTranslatable(categoryMeta[sight.category].label),
    flattenTranslatable(regionMeta[sight.region].label),
    flattenTranslatableArray(sight.practicalTips),
    ...(sight.tags ?? []),
  ];
  return normalize(parts.filter(Boolean).join(' | '));
}

/**
 * Per-sight memoization. Keyed by Sight identity (stable for the lifetime
 * of the module) so we pay the build cost once per process.
 */
const indexCache = new WeakMap<Sight, string>();

function getIndex(sight: Sight): string {
  let cached = indexCache.get(sight);
  if (cached === undefined) {
    cached = buildIndex(sight);
    indexCache.set(sight, cached);
  }
  return cached;
}

/** Split a raw query into normalized non-empty tokens. */
export function tokenizeQuery(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

export function matchesQuery(sight: Sight, tokens: readonly string[]): boolean {
  if (tokens.length === 0) return true;
  const index = getIndex(sight);
  // AND semantics: every token must appear. `every` short-circuits, so the
  // most selective token (usually the first the user typed) terminates fast.
  return tokens.every((t) => index.includes(t));
}

/**
 * High-level filter — preferred entry point for components. Trims the
 * query first so leading/trailing whitespace from auto-correct doesn't
 * empty the result set unexpectedly.
 */
export function filterBySearch(sights: Sight[], query: string): Sight[] {
  const trimmed = query.trim();
  if (trimmed.length === 0) return sights;
  const tokens = tokenizeQuery(trimmed);
  if (tokens.length === 0) return sights;
  return sights.filter((s) => matchesQuery(s, tokens));
}
