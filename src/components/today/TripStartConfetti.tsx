'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'kz-trip-start-celebrated';

/**
 * Fires a single celebratory confetti burst the first time the user lands
 * on /today on day 1 of the trip. Persists a flag in localStorage so the
 * surprise doesn't repeat on every visit during the day. Respects
 * `prefers-reduced-motion` — that user gets nothing.
 */
export default function TripStartConfetti({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      // Private mode — fire once per session and accept the "no persistence".
    }

    // Two staggered bursts from the bottom corners, biased upward, in the
    // steppe-blue + sand palette. Kept short so it doesn't overstay.
    const colors = ['#2563eb', '#1d4ed8', '#d4b483', '#a98654', '#16a34a'];
    const fire = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 45,
        ticks: 200,
        gravity: 0.9,
        scalar: 0.9,
        origin,
        colors,
        disableForReducedMotion: true,
      });

    fire({ x: 0.15, y: 0.85 });
    const t = setTimeout(() => fire({ x: 0.85, y: 0.85 }), 180);

    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }

    return () => clearTimeout(t);
  }, [active]);

  return null;
}
