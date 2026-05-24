'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  /** Committed value (e.g. from URL state). Local typing state syncs from this. */
  value: string;
  /** Called after the user stops typing for `debounceMs` (default 250). */
  onChange: (next: string) => void;
  /** Number of matches under the current query, used for the polite a11y announcement. */
  resultCount?: number;
  /** Total number of items in the dataset — included in the announcement when no query. */
  totalCount?: number;
  placeholder?: string;
  className?: string;
  /** Debounce window for URL commits. */
  debounceMs?: number;
  /** Auto-focus on mount — off by default to avoid mobile keyboard popping on entry. */
  autoFocus?: boolean;
}

/**
 * Sticky-friendly search input with debounced URL commits.
 *
 * Why two layers of state:
 * - `local` reflects what the user is currently typing — feels instant.
 * - `value` (from props) reflects what's committed to URL state.
 * Local commits to URL via `onChange` after `debounceMs` of idle.
 * External value changes (back/forward, paste-link) flow back into local
 * via the sync effect, but only when they're not already in sync — that
 * guard prevents the debounce-commit/external-sync loop.
 *
 * Why type="search":
 * - Mobile keyboards show a "Search" key instead of "Go" / Enter.
 * - Browsers expose a clear button slot via WebKit — we hide it to keep
 *   visuals consistent with our own X button (see globals.css).
 */
export default function SearchInput({
  value,
  onChange,
  resultCount,
  totalCount,
  placeholder,
  className,
  debounceMs = 250,
  autoFocus = false,
}: SearchInputProps) {
  const t = useTranslations();
  const resolvedPlaceholder = placeholder ?? t('components.searchInput.placeholder');
  const inputId = useId();
  const statusId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [local, setLocal] = useState(value);

  // Pull external (URL) value back into the input when it changes from
  // outside the component — back/forward, paste-link, programmatic update.
  // Implemented via "deriving state during render" (React docs pattern)
  // rather than useEffect → avoids the cascading-render warning and is
  // strictly correct under React 19 strict mode.
  const [lastSyncedValue, setLastSyncedValue] = useState(value);
  if (value !== lastSyncedValue) {
    setLastSyncedValue(value);
    setLocal(value);
  }

  // Debounced commit. Skip when local already matches the committed value
  // so external-sync doesn't re-trigger an onChange.
  useEffect(() => {
    if (local === value) return;
    const handle = window.setTimeout(() => onChange(local), debounceMs);
    return () => window.clearTimeout(handle);
  }, [local, value, onChange, debounceMs]);

  function clear() {
    setLocal('');
    // Commit instantly — clearing should feel immediate, not debounced.
    onChange('');
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape' && local !== '') {
      e.preventDefault();
      clear();
    }
  }

  // Compose the polite live-region message. Only meaningful when the query
  // is non-empty; otherwise we don't want a screen reader announcing
  // counts every time the dataset rerenders.
  const trimmedQuery = local.trim();
  const announcement =
    trimmedQuery.length > 0 && typeof resultCount === 'number'
      ? resultCount === 0
        ? t('components.searchInput.noResultsAnnouncement', { query: trimmedQuery })
        : t('components.searchInput.resultsAnnouncement', { count: resultCount, query: trimmedQuery })
      : '';

  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={inputId} className="sr-only">
        {t('components.searchInput.label')}
      </label>
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoFocus={autoFocus}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={resolvedPlaceholder}
          aria-describedby={statusId}
          // 16px font on mobile prevents iOS Safari from zooming the page
          // when the input is focused. h-11 = 44px → meets WCAG tap-target.
          className="h-11 w-full rounded-full border border-border bg-background pr-10 pl-10 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 md:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        />
        {local.length > 0 && (
          <button
            type="button"
            onClick={clear}
            aria-label={t('components.searchInput.clearAria')}
            // Centered 32×32 hit area — comfortable tap, doesn't dwarf input.
            className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>
      {/*
        Single live region: empty when no active query (screen readers stay
        quiet); short, informative when a query is active. `aria-live=polite`
        + `aria-atomic` makes the whole message re-read on change.
      */}
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement ||
          (typeof totalCount === 'number' ? t('components.searchInput.totalAnnouncement', { count: totalCount }) : '')}
      </p>
    </div>
  );
}
