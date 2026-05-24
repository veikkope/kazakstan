import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation helpers. Always import `Link`, `redirect`,
 * `usePathname`, `useRouter`, `getPathname` from here — they auto-prefix
 * the active locale, so call sites stay locale-agnostic (`<Link href="/map">`
 * resolves to `/fi/map`, `/en/map`, etc. depending on context).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
