'use client';

import { LazyMotion, domAnimation } from 'motion/react';
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
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
