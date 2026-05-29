import { useEffect } from 'react';

/**
 * Hold a Screen Wake Lock while a route is mounted. Used on `/map` and
 * `/today` where the user actively follows the screen — navigating in the car
 * or reading the day-by-day plan on a hike. Without this the device sleeps
 * after the OS-configured idle timeout (usually 30–60 s) and the passenger
 * has to keep tapping to wake it.
 *
 * Browsers release locks when the tab loses focus. The visibilitychange
 * listener re-acquires after a brief lock-screen peek so a notification
 * check doesn't kill the lock for the rest of the session.
 *
 * No-op on browsers without the API: Safari <16.4 in-browser, Safari <18.4
 * in PWA mode. iOS PWA support shipped in 18.4 — for older iOS users on the
 * home-screen app this is a graceful no-op (their device sleeps as before).
 */
export function useWakeLock(enabled: boolean = true): void {
  useEffect(() => {
    if (!enabled) return;
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) return;

    let sentinel: WakeLockSentinel | null = null;

    const acquire = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        sentinel = await navigator.wakeLock.request('screen');
      } catch {
        // Battery-saver, low-battery, or OS-level denial. All benign — the
        // user just gets default sleep behaviour back.
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && !sentinel) {
        void acquire();
      }
    };

    void acquire();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      sentinel?.release().catch(() => {});
      sentinel = null;
    };
  }, [enabled]);
}
