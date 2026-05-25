import type {
  Locale,
  LocalizedString,
  Sight,
  TranslatableString,
} from './types';

/**
 * Resolve a `LocalizedString` to a plain string for the given locale.
 * Falls back to `fi` (canonical) if the locale key is empty.
 * Accepts `undefined` for ergonomic chaining — returns `''` in that case.
 */
export function localised(
  value: TranslatableString | undefined,
  locale: Locale,
): string {
  if (value === undefined) return '';
  return value[locale] || value.fi || '';
}

/** Map an array of `TranslatableString`s to plain strings for the locale. */
export function localisedArray(
  values: readonly TranslatableString[] | undefined,
  locale: Locale,
): string[] {
  if (!values) return [];
  return values.map((v) => localised(v, locale));
}

/**
 * Type guard — useful when a generic value might be either shape and the
 * caller wants to log/branch on the structural difference (e.g., during
 * migration diagnostics).
 */
export function isLocalizedString(value: unknown): value is LocalizedString {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.fi === 'string' &&
    typeof v.en === 'string' &&
    typeof v.ru === 'string' &&
    typeof v.kk === 'string'
  );
}

/**
 * Sight fields resolved to a single locale. Components that render sight
 * content take this as input so they don't have to call `localised()` per
 * field. Optional fields stay optional — `undefined` collapses cleanly to
 * conditional rendering.
 */
export interface LocalisedSightFields {
  name: string;
  shortDescription: string;
  description: string;
  city?: string;
  imageAlt?: string;
  openingHours?: string;
  bestSeason?: string;
  historicalContext?: string;
  practicalTips: string[];
}

/**
 * Project a `Sight` onto its locale-resolved string fields. Centralises the
 * fan-out so adding a new translatable field on `Sight` only requires
 * touching this function — every consumer picks the change up for free.
 */
export function getSightFields(sight: Sight, locale: Locale): LocalisedSightFields {
  return {
    name: localised(sight.name, locale),
    shortDescription: localised(sight.shortDescription, locale),
    description: localised(sight.description, locale),
    city: sight.city !== undefined ? localised(sight.city, locale) : undefined,
    imageAlt: sight.imageAlt !== undefined ? localised(sight.imageAlt, locale) : undefined,
    openingHours:
      sight.openingHours !== undefined ? localised(sight.openingHours, locale) : undefined,
    bestSeason:
      sight.bestSeason !== undefined ? localised(sight.bestSeason, locale) : undefined,
    historicalContext:
      sight.historicalContext !== undefined
        ? localised(sight.historicalContext, locale)
        : undefined,
    practicalTips: localisedArray(sight.practicalTips, locale),
  };
}

/**
 * Narrow a runtime string to a `Locale`. Use at boundaries where the
 * locale comes from a URL param or next-intl context (typed as `string`).
 * Falls back to `'fi'` for unknown values — preferred over throwing here
 * because next-intl's proxy should already have rejected bad locales
 * upstream; this is a defensive last line.
 */
export function asLocale(value: string | undefined): Locale {
  if (value === 'fi' || value === 'en' || value === 'ru' || value === 'kk') {
    return value;
  }
  return 'fi';
}
