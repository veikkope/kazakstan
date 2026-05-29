'use client';

import { usePathname } from '@/i18n/navigation';
import { useScrollMemory } from '@/lib/scroll-memory';

/**
 * Mount-and-forget wrapper for `useScrollMemory(pathname)`. Use this in
 * a server component (where the hook can't run directly) or as a
 * one-liner in any page to opt that route into per-pathname scroll
 * save/restore. See `src/lib/scroll-memory.ts` for the underlying
 * mechanism.
 */
export default function ScrollMemory() {
  useScrollMemory(usePathname());
  return null;
}
