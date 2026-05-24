import { defineRouting } from 'next-intl/routing';

/**
 * i18n routing configuration — single source of truth for supported locales.
 *
 * Canonical language is `fi` (project owners' primary). All four locales are
 * "first-class" — TypeScript enforces complete coverage of every localized
 * field via `Record<Locale, string>` in `src/lib/types.ts`, so a missing
 * translation surfaces at compile time, not in production.
 *
 * URL strategy: every page lives under `/<locale>/...`. The middleware
 * redirects the bare `/` based on `Accept-Language` + the `NEXT_LOCALE`
 * cookie. Page paths are English on every locale (international convention)
 * — translation lives in UI strings and content, not in the URL.
 */
export const routing = defineRouting({
  locales: ['fi', 'en', 'ru', 'kk'] as const,
  defaultLocale: 'fi',
  // Always prefix even the default locale — clean, predictable, no special-case
  // for "/" vs "/fi/" routing logic in components and analytics.
  localePrefix: 'always',
  // Persist user choice for a year. Locale switching writes the cookie via
  // next-intl's <Link> + router helpers automatically.
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  },
});

export type Locale = (typeof routing.locales)[number];

/** Human-readable labels for the language switcher. Native script. */
export const localeLabels: Record<Locale, string> = {
  fi: 'Suomi',
  en: 'English',
  ru: 'Русский',
  kk: 'Қазақша',
};
