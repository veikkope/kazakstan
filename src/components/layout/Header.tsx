'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import CommandPalette from './CommandPalette';

const nav = [
  { href: '/tanaan', label: 'Tänään' },
  { href: '/kartta', label: 'Kartta' },
  { href: '/nahtavyydet', label: 'Nähtävyydet' },
  { href: '/reitit', label: 'Valmiit reitit' },
  { href: '/reittisuunnitelma', label: 'Reittisuunnitelma' },
  { href: '/shortlist', label: 'Shortlist' },
  { href: '/info', label: 'Info' },
  { href: '/budjetti', label: 'Budjetti' },
];

export default function Header() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    // Mobile compact: 48px total (py-1.5 + h-9). Desktop: 56px (py-3 + h-8)
    // with full inline navigation. Mobile relies on BottomNav for primary nav.
    <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-3">
        <Link
          href="/"
          aria-label="Etusivu"
          className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-[15px] font-semibold text-foreground no-underline hover:bg-muted hover:no-underline sm:h-8 sm:text-base"
        >
          <span aria-hidden className="text-base">🇰🇿</span>
          <span>Kazakstan</span>
        </Link>

        {/* Desktop nav — hidden on mobile (BottomNav handles primary nav there). */}
        <nav
          aria-label="Päänavigaatio"
          className="hidden flex-wrap items-center gap-1 text-sm sm:flex"
        >
          {nav.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              size="sm"
              className="hover:text-primary"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Search/command palette. Icon-only square on mobile, full label
            + ⌘K kbd on desktop. The icon-only mobile target is 36px (h-9
            w-9) — a clear secondary action; the BottomNav covers primary. */}
        <Button
          variant="outline"
          onClick={() => setPaletteOpen(true)}
          aria-label="Hae kohteita"
          className="ml-auto size-9 px-0 sm:h-8 sm:w-auto sm:gap-2 sm:px-2.5"
        >
          <Search className="size-4" aria-hidden />
          <span className="hidden sm:inline">Hae</span>
          <KbdGroup className="hidden sm:flex">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
}
