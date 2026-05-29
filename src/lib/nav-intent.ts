/**
 * Back/forward navigation detector — lets mount-driven entrance animations
 * skip themselves on a history *restore* (browser back/forward, swipe gesture)
 * while still playing on a forward/first navigation.
 *
 * Why this exists: App Router re-mounts a page's client tree on every
 * navigation, including back. Any `motion` component with `initial` (the
 * /sights grid stagger and the sights `template.tsx` crossfade) therefore
 * resets to opacity:0 and re-animates when you return to a page — so the
 * cached content paints instantly, then visibly flashes back in. Returning
 * should feel like a stable restore, not a fresh entrance.
 *
 * Mechanism: record the timestamp of the last `popstate` (the only way to
 * "return" here — there is no in-app back link). A mount within
 * `TRAVERSAL_WINDOW_MS` of a popstate is treated as a traversal and skips its
 * entrance animation. We use a self-expiring timestamp rather than a boolean
 * flag on purpose: a lingering flag could be inherited by an unrelated later
 * forward navigation (e.g. back to /map, then a fresh push into /sights) and
 * wrongly suppress its animation. The window auto-clears, so the worst case is
 * a single skipped nicety if you push forward within ~half a second of a back.
 *
 * `isBackNav()` is a read-only check safe to call during render; it never
 * mutates, so multiple readers in the same render (template + grid) all agree.
 */

const TRAVERSAL_WINDOW_MS = 500;

let lastPopAt = Number.NEGATIVE_INFINITY;
let attached = false;

function ensureListener(): void {
  if (attached || typeof window === 'undefined') return;
  attached = true;
  // Fires for browser back/forward buttons and edge-swipe gestures. Next's
  // own router also handles popstate; ordering doesn't matter since we only
  // stamp a timestamp that's read at the next mount.
  window.addEventListener('popstate', () => {
    lastPopAt = performance.now();
  });
}

ensureListener();

/**
 * True when the current mount is the result of a history traversal (back /
 * forward) that happened within the last `TRAVERSAL_WINDOW_MS`. Returns false
 * during SSR and for forward/first navigations.
 */
export function isBackNav(): boolean {
  if (typeof window === 'undefined') return false;
  return performance.now() - lastPopAt < TRAVERSAL_WINDOW_MS;
}
