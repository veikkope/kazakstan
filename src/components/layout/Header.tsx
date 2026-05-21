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
    <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-2 px-4 py-3">
        <Button asChild variant="ghost" className="font-semibold">
          <Link href="/">🇰🇿 Kazakstan</Link>
        </Button>
        {/* Desktop nav. Mobile uses BottomNav. */}
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
        <Button
          variant="outline"
          size="sm"
          className="ml-auto gap-2"
          aria-label="Avaa komentopaletti"
          onClick={() => setPaletteOpen(true)}
        >
          <Search className="size-4" />
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
