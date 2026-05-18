/**
 * Native share if available (mobile share sheet), clipboard fallback otherwise.
 *
 * Resolves to:
 *   - 'shared'    — user completed the native share sheet
 *   - 'copied'    — clipboard fallback succeeded
 *   - 'cancelled' — user dismissed the native share sheet
 *   - 'error'     — both paths failed (no support + clipboard blocked)
 */
export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'error';

export interface ShareInput {
  url: string;
  title?: string;
  text?: string;
}

export async function shareUrl({ url, title, text }: ShareInput): Promise<ShareResult> {
  if (typeof navigator === 'undefined') return 'error';

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ url, title, text });
      return 'shared';
    } catch (err) {
      // AbortError = user cancelled; bubble that up so the UI can stay quiet.
      if (err instanceof Error && err.name === 'AbortError') return 'cancelled';
      // Fall through to clipboard on any other failure.
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch {
      return 'error';
    }
  }

  return 'error';
}
