import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

/**
 * Per-request locale resolution + message loading. Called by next-intl on
 * every server render. We import messages lazily (dynamic import) so each
 * route bundles only the active locale — keeps the client bundle small on
 * mobile where the trip is actually used.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
