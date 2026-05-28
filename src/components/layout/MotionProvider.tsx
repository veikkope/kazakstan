'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * App-level LazyMotion provider.
 *
 * Wrapping the tree once here means every page-level `m.*` component
 * shares the same `domAnimation` feature bundle (~4.6kb), instead of
 * each page re-loading the same features. `strict` would force every
 * descendant to use `m.*` (not `motion.*`); we omit it to allow MapView
 * or third-party code to use `motion.*` without throwing — but our own
 * components always use `m.*` to keep the bundle minimal.
 *
 * `MotionConfig reducedMotion="user"` makes every motion/react animation
 * in the tree honour the OS-level `prefers-reduced-motion` setting
 * automatically — translations and scales collapse to instant, opacity
 * still crossfades. Saves wiring `useReducedMotion()` per component
 * (SightCard stagger, day-card slide-ins, command-palette open, etc.)
 * and keeps the WCAG 2.3.3 surface consistent.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
