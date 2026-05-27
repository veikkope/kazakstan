/**
 * Tiny haptic-feedback helper for native-feel touch interactions. Triggers
 * `navigator.vibrate` on Android/Chromium, no-ops on iOS Safari and desktop
 * (which do not implement the Vibration API).
 *
 * The user can disable globally via `setHapticEnabled(false)` — persisted in
 * localStorage so the choice survives reloads. We default to ENABLED because
 * the patterns below are subtle (10–80 ms) and consistent with native UI.
 */

const STORAGE_KEY = 'kz-haptic-enabled';
const DEFAULT_ENABLED = true;

function isSupported(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
}

export function isHapticEnabled(): boolean {
  if (!isSupported()) return false;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === null ? DEFAULT_ENABLED : v === '1';
  } catch {
    return DEFAULT_ENABLED;
  }
}

export function setHapticEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    /* ignore — private mode or storage full; haptics are non-essential. */
  }
}

function vibrate(pattern: number | number[]): void {
  if (!isHapticEnabled()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* ignore — some browsers throw if the page isn't visible. */
  }
}

/** Single short pulse — toggle, tap, tab switch. */
export function hapticTap(): void {
  vibrate(10);
}

/** Double-pulse — a discrete action completed (added/removed, sent). */
export function hapticSuccess(): void {
  vibrate([10, 40, 20]);
}

/** Triple-pulse — something destructive is about to happen. */
export function hapticWarning(): void {
  vibrate([25, 50, 25]);
}
