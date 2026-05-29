'use client';

import { m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { isBackNav } from '@/lib/nav-intent';

/**
 * Page transition for the /sights subtree.
 *
 * A `template.tsx` is re-keyed (remounted) by the App Router on every
 * navigation whose path segment changes — i.e. `/sights ↔ /sights/<slug>` and
 * `detail ↔ detail` — but NOT on search-param changes. Filters and search live
 * in the query string (see `src/lib/url-state.ts`), so this animation fires
 * exactly when the user opens a sight or goes back, and never on a filter
 * keystroke. That's the boundary the old setup got wrong: the grid's entrance
 * animation only replayed on a *client* navigation, so the morph appeared to
 * "only work the second time".
 *
 * Why a template and not React's `<ViewTransition>`: the installed React
 * (19.2) does not export `ViewTransition`, so `experimental.viewTransition`
 * is not a stable option here. A template is the documented, dependency-free
 * App Router primitive and degrades to an instant swap under reduced motion.
 *
 * Why opacity-only (a crossfade, not a transform slide): the detail page
 * renders a `position: fixed` action bar (`SightActionBar`) and the index has
 * a `position: sticky` filter bar. A `transform` on this wrapper would become
 * the containing block for those `fixed` descendants and mis-position them.
 * Opacity creates a stacking context but no containing block, so it's safe —
 * and it still reads as a smooth crossfade between the grid and the detail.
 *
 * The crossfade is suppressed on a history *restore* (back/forward) via
 * `isBackNav()`: returning to a page should be an instant, stable restore, not
 * a re-entrance. Forward navigations (opening a sight) still crossfade.
 */
export default function SightsTemplate({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const skip = reduce || isBackNav();
  return (
    <m.div
      initial={skip ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}
