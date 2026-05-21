'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Tab {
  href: string;
  label: string;
  icon: string;
  /** Matchers used to detect active state. The tab is also active for any sub-route. */
  match: (path: string) => boolean;
}

const PRIMARY_TABS: Tab[] = [
  {
    href: '/tanaan',
    label: 'Tänään',
    icon: '☀️',
    match: (p) => p.startsWith('/tanaan'),
  },
  {
    href: '/kartta',
    label: 'Kartta',
    icon: '🗺️',
    match: (p) => p.startsWith('/kartta'),
  },
  {
    href: '/reittisuunnitelma',
    label: 'Päivät',
    icon: '📅',
    match: (p) => p.startsWith('/reittisuunnitelma'),
  },
  {
    href: '/shortlist',
    label: 'Shortlist',
    icon: '★',
    match: (p) => p.startsWith('/shortlist'),
  },
];

const MORE_LINKS = [
  { href: '/', label: 'Etusivu', icon: '🏠' },
  { href: '/nahtavyydet', label: 'Nähtävyydet', icon: '📍' },
  { href: '/reitit', label: 'Valmiit reitit', icon: '🧭' },
  { href: '/info', label: 'Käytännön info', icon: 'ℹ️' },
  { href: '/budjetti', label: 'Budjetti', icon: '💸' },
];

const MORE_PATHS = MORE_LINKS.map((l) => l.href);

export default function BottomNav() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);

  const moreActive = MORE_PATHS.some((p) => pathname.startsWith(p));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <nav
        aria-label="Pääsivut"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] sm:hidden"
      >
        <ul className="mx-auto grid max-w-6xl grid-cols-5">
          {PRIMARY_TABS.map((tab) => {
            const active = tab.match(pathname);
            return (
              <li key={tab.href} className="contents">
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] hover:no-underline ${
                    active
                      ? 'font-semibold text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {tab.icon}
                  </span>
                  <span className="leading-tight">{tab.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="contents">
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Lisää linkkejä"
                    className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] ${
                      moreActive && !open
                        ? 'font-semibold text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <Menu className="size-5" aria-hidden />
                    <span className="leading-tight">Lisää</span>
                  </button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">Lisää linkkejä</TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </nav>

      <SheetContent
        side="bottom"
        className="rounded-t-2xl bg-card pb-[env(safe-area-inset-bottom)] sm:hidden"
      >
        <SheetHeader>
          <SheetTitle>Lisää</SheetTitle>
        </SheetHeader>
        <div className="mx-auto w-full max-w-6xl px-4 pb-4">
          <ul className="grid grid-cols-2 gap-2">
            {MORE_LINKS.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <SheetClose asChild>
                    <Link
                      href={l.href}
                      className={`flex min-h-14 items-center gap-3 rounded-lg border px-3 py-2 text-sm hover:no-underline ${
                        active
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-card text-foreground'
                      }`}
                    >
                      <span className="text-xl" aria-hidden>
                        {l.icon}
                      </span>
                      <span>{l.label}</span>
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
