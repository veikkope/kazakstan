'use client';

import { Suspense } from 'react';
import { Check, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, localeLabels, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * Locale switcher rendered in the Header.
 *
 * - Uses `next-intl`'s locale-aware router → swapping locales preserves the
 *   active pathname and query string. The new locale is persisted via the
 *   `NEXT_LOCALE` cookie set by `routing.localeCookie`.
 * - Compact: icon-only on mobile (36×36 tap target), icon + native script
 *   label on desktop. Dropdown lists all four locales in native script.
 * - `modal={false}` matches NavigateMenu's choice so opening the menu
 *   doesn't lock body scroll on the sticky header.
 * - Wrapped in Suspense because `useSearchParams` triggers CSR bailout for
 *   static prerender otherwise (it lives in the always-rendered Header, so
 *   every static page would deopt without this boundary).
 */
function LanguageSwitcherInner() {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function switchTo(next: Locale) {
    if (next === locale) return;
    const query = searchParams.toString();
    // pathname here is the locale-stripped path (next-intl convention);
    // router.replace prepends the new locale prefix automatically.
    const target = query ? `${pathname}?${query}` : pathname;
    router.replace(target, { locale: next });
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label={t('label')}
          className="size-9 px-0 sm:h-8 sm:w-auto sm:gap-1.5 sm:px-2.5"
        >
          <Languages className="size-4" aria-hidden />
          <span className="hidden sm:inline">{localeLabels[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {routing.locales.map((l) => {
          const isActive = l === locale;
          return (
            <DropdownMenuItem
              key={l}
              onClick={() => switchTo(l)}
              className="cursor-pointer gap-2"
              aria-current={isActive ? 'true' : undefined}
            >
              <Check
                className={cn('size-4', !isActive && 'opacity-0')}
                aria-hidden
              />
              <span className={cn(isActive && 'font-semibold')}>
                {localeLabels[l]}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function LanguageSwitcher() {
  // Skeleton trigger preserves layout while Suspense awaits useSearchParams.
  return (
    <Suspense
      fallback={
        <Button
          variant="outline"
          aria-hidden
          className="size-9 px-0 sm:h-8 sm:w-auto sm:gap-1.5 sm:px-2.5"
          disabled
        >
          <Languages className="size-4" aria-hidden />
        </Button>
      }
    >
      <LanguageSwitcherInner />
    </Suspense>
  );
}
