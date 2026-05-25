import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * next-intl locale proxy — Next.js 16 `proxy` file convention (formerly
 * `middleware`): detects locale from cookie → Accept-Language → defaultLocale,
 * then either rewrites or redirects to the prefixed URL.
 *
 * The matcher excludes API routes, static files, and Next.js internals so
 * we don't waste a redirect on every chunk fetch.
 */
export default createMiddleware(routing);

export const config = {
  // Match every path except:
  // - /api/* (no API routes today, but reserve the convention)
  // - /_next/* (Next.js internals)
  // - /_vercel/* (Vercel internals)
  // - files with an extension (images, fonts, etc.)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
