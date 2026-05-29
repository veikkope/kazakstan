'use client';

import { useLayoutEffect } from 'react';

/**
 * Forces an instant scroll-to-top on mount.
 *
 * Mounted on detail routes (e.g. `/sights/[slug]`) because Next.js App Router's
 * native scroll-to-top reads CSS `scroll-behavior`, which is set to `smooth`
 * globally (globals.css). On a long mobile sights list, soft-navigating into a
 * detail page would smooth-animate the viewport across thousands of pixels —
 * users see a chaotic in-flight state and often land mid-page. Explicit
 * `behavior: 'instant'` overrides the CSS so the detail page always paints with
 * the hero in view.
 *
 * `useLayoutEffect` runs before paint, eliminating any flash of the old scroll
 * position. The component renders nothing.
 */
export default function ScrollToTopOnMount() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  return null;
}
