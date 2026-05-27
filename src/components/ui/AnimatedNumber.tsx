'use client';

import { useEffect, useRef } from 'react';
import { animate, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { m } from 'motion/react';

/**
 * Animates a numeric value with an ease-out curve. First mount counts up
 * from 0 → `value`; subsequent `value` changes animate from the currently
 * displayed number, so a 5 → 4 update doesn't flash back to 0.
 *
 * Respects `prefers-reduced-motion`: renders the target value instantly.
 * SSR-safe — server renders 0 (the motion value's initial), the client
 * animates to `value` on mount. An aria-label exposes the real number to
 * screen readers so the decorative count-up isn't an a11y regression.
 */
export default function AnimatedNumber({
  value,
  duration = 900,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  // Tracks mount across renders without setState — the lint rule against
  // set-state-in-effect doesn't fire for refs, and we don't need a re-render
  // when mount completes (the motion value already drives the DOM update).
  const mountedRef = useRef(false);

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      mountedRef.current = true;
      return;
    }
    const start = mountedRef.current ? mv.get() : 0;
    mv.set(start);
    const controls = animate(mv, value, {
      duration: duration / 1000,
      ease: [0.2, 0, 0, 1],
    });
    mountedRef.current = true;
    return () => controls.stop();
  }, [value, duration, reduce, mv]);

  return (
    <m.span aria-label={String(value)} className={className}>
      {rounded}
    </m.span>
  );
}
