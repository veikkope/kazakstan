'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * Persist + restore window scroll position per logical key.
 *
 * The Next.js App Router does attempt scroll restoration on POP, but
 * the restore fires synchronously *once* and silently fails when the
 * document is briefly shorter than the saved Y — e.g. a Suspense
 * fallback flashing during hydration after a router-cache miss, motion
 * stagger reserving layout but rendering empty for a frame, or
 * `experimental.viewTransition` shifting the timing. The user then
 * ends up at the top of the list instead of where they left off.
 *
 * This hook bypasses that by saving the scroll position on every frame
 * the user scrolls (rAF-throttled), and on mount retries the restore
 * for up to RESTORE_DEADLINE_MS — long enough for async-streamed
 * content to grow the page past the saved Y, short enough that a
 * genuinely shorter page (different filter state) doesn't pin the user
 * indefinitely.
 *
 * Storage: sessionStorage — scoped to the tab, cleared on close, which
 * matches the user mental model of "previous browsing state in this
 * session". Namespaced under PREFIX so a future feature using the same
 * keys doesn't collide.
 */

const PREFIX = 'kz-scroll-v1:';
const RESTORE_DEADLINE_MS = 1000;

// useLayoutEffect would warn during SSR; fall back to useEffect on the
// server so the warning doesn't leak into build logs. Client always
// picks layout-effect so the restore runs before paint and there's no
// visible jump from top → saved Y.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useScrollMemory(key: string): void {
  useIsomorphicLayoutEffect(() => {
    const storageKey = PREFIX + key;

    // ---------- Restore phase ----------
    const raw = sessionStorage.getItem(storageKey);
    const savedY = raw ? Number(raw) : NaN;
    let restoreCancelled = false;

    // User input cancels the in-flight restore so we don't fight the
    // user mid-scroll. `scroll` is deliberately excluded — our own
    // scrollTo() emits it and would otherwise self-cancel the first
    // attempt before it ever lands.
    const cancelEvents = ['touchstart', 'mousedown', 'wheel', 'keydown'] as const;
    const cancelRestore = () => {
      restoreCancelled = true;
    };

    if (Number.isFinite(savedY) && savedY > 0) {
      for (const evt of cancelEvents) {
        window.addEventListener(evt, cancelRestore, {
          once: true,
          passive: true,
        });
      }

      const deadline = performance.now() + RESTORE_DEADLINE_MS;
      const attempt = () => {
        if (restoreCancelled) return;
        const maxY =
          document.documentElement.scrollHeight - window.innerHeight;
        if (maxY >= savedY) {
          // `behavior: 'instant'` overrides the global
          // `scroll-behavior: smooth` so the restore is a hard jump,
          // not a multi-second smooth animation across the page.
          window.scrollTo({ top: savedY, behavior: 'instant' });
        } else if (performance.now() < deadline) {
          requestAnimationFrame(attempt);
        } else {
          // Page never grew tall enough (e.g. the user changed filter
          // state in the URL between leaving and returning). Pin to
          // the farthest reachable point so the user still lands near
          // their previous spot rather than reset to the top.
          window.scrollTo({ top: Math.max(0, maxY), behavior: 'instant' });
        }
      };
      attempt();
    }

    // ---------- Save phase ----------
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        sessionStorage.setItem(storageKey, String(window.scrollY));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      for (const evt of cancelEvents) {
        window.removeEventListener(evt, cancelRestore);
      }
      if (rafId !== null) cancelAnimationFrame(rafId);
      // Snapshot once more on unmount so a navigation that fires mid
      // rAF-debounce still captures the final Y — the pending rAF was
      // just cancelled, so without this we'd persist a slightly stale
      // value from the previous frame.
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };
  }, [key]);
}
