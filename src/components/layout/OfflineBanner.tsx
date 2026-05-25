'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function OfflineBanner() {
  const t = useTranslations();
  const [offline, setOffline] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // navigator.onLine is unreliable for "real" connectivity but good enough
    // as a hint — pages still load from cache when offline.
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  // Publish the banner's live height as --offline-banner-h so the locked
  // mobile map view (src/app/[locale]/map/page.tsx) can subtract it from its
  // viewport-height calc — otherwise the banner pushes the map down under the
  // BottomNav. ResizeObserver keeps it correct if the text wraps on narrow
  // screens or rotation changes the width.
  useEffect(() => {
    const root = document.documentElement;
    if (!offline) {
      root.style.setProperty('--offline-banner-h', '0px');
      return;
    }
    const measure = () =>
      root.style.setProperty(
        '--offline-banner-h',
        `${ref.current?.offsetHeight ?? 0}px`,
      );
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => {
      ro.disconnect();
      root.style.setProperty('--offline-banner-h', '0px');
    };
  }, [offline]);

  if (!offline) return null;

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className="border-b border-(--color-sand-dark) bg-(--color-sand) px-4 py-2 text-center text-xs text-(--color-fg)"
    >
      {t('components.offlineBanner.message')}
    </div>
  );
}
