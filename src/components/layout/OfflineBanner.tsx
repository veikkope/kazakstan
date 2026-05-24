'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function OfflineBanner() {
  const t = useTranslations();
  const [offline, setOffline] = useState(false);

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

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-(--color-sand-dark) bg-(--color-sand) px-4 py-2 text-center text-xs text-(--color-fg)"
    >
      {t('components.offlineBanner.message')}
    </div>
  );
}
