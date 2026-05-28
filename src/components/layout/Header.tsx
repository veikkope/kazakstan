'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Link } from '@/i18n/navigation';
import CommandPalette from './CommandPalette';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

// Keep route paths separate from labels — labels are translated via
// `t(navKey)`, while paths are constant English slugs across locales.
const NAV_ITEMS = [
  { href: '/today', navKey: 'today' },
  { href: '/map', navKey: 'map' },
  { href: '/sights', navKey: 'sights' },
  { href: '/routes', navKey: 'routes' },
  { href: '/itinerary', navKey: 'itinerary' },
  { href: '/shortlist', navKey: 'shortlist' },
  { href: '/info', navKey: 'info' },
  { href: '/budget', navKey: 'budget' },
] as const;

export default function Header() {
  const t = useTranslations();
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    // Mobile compact: 48px total (py-1.5 + h-9). Desktop: 56px (py-3 + h-8)
    // with full inline navigation. Mobile relies on BottomNav for primary nav.
    //
    // `viewTransitionName` anchors the header during route transitions: the
    // sight-image morph (and any other view transition) animates the page
    // body but the header stays pinned. The matching CSS in globals.css
    // disables its animation and hides the old snapshot to avoid a flash.
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-3">
        <Link
          href="/"
          aria-label={t('nav.home')}
          className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-[15px] font-semibold text-foreground no-underline hover:bg-muted hover:no-underline sm:h-8 sm:text-base"
        >
          <span aria-hidden className="text-base">🇰🇿</span>
          <span>{t('brand.name')}</span>
        </Link>

        {/* Desktop nav — hidden on mobile (BottomNav handles primary nav there). */}
        <nav
          aria-label={t('nav.ariaPrimary')}
          className="hidden flex-wrap items-center gap-1 text-sm sm:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              size="sm"
              className="hover:text-primary"
            >
              <Link href={item.href}>{t(`nav.${item.navKey}`)}</Link>
            </Button>
          ))}
        </nav>

        {/* Right-aligned action cluster: search first (primary), language
            switcher second (occasional). `ml-auto` on the wrapper keeps
            them anchored to the right while the nav flexes on the left. */}
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={() => setPaletteOpen(true)}
            aria-label={t('components.header.searchAriaLabel')}
            className="size-9 px-0 sm:h-8 sm:w-auto sm:gap-2 sm:px-2.5"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden sm:inline">{t('components.header.searchButton')}</span>
            <KbdGroup className="hidden sm:flex">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
}
