'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Sun,
  Map as MapIcon,
  CalendarDays,
  Star,
  Menu,
  Home,
  MapPin,
  Compass,
  Info,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Tab {
  href: string;
  label: string;
  Icon: LucideIcon;
  /** When true, the icon renders filled (Star, Heart-style) while active. */
  fillWhenActive?: boolean;
  /** The tab is also active for any sub-route. */
  match: (path: string) => boolean;
}

const PRIMARY_TABS: Tab[] = [
  {
    href: '/tanaan',
    label: 'Tänään',
    Icon: Sun,
    match: (p) => p.startsWith('/tanaan'),
  },
  {
    href: '/kartta',
    label: 'Kartta',
    Icon: MapIcon,
    match: (p) => p.startsWith('/kartta'),
  },
  {
    href: '/reittisuunnitelma',
    label: 'Päivät',
    Icon: CalendarDays,
    match: (p) => p.startsWith('/reittisuunnitelma'),
  },
  {
    href: '/shortlist',
    label: 'Shortlist',
    Icon: Star,
    fillWhenActive: true,
    match: (p) => p.startsWith('/shortlist'),
  },
];

interface MoreLink {
  href: string;
  label: string;
  Icon: LucideIcon;
}

const MORE_LINKS: MoreLink[] = [
  { href: '/', label: 'Etusivu', Icon: Home },
  { href: '/nahtavyydet', label: 'Nähtävyydet', Icon: MapPin },
  { href: '/reitit', label: 'Valmiit reitit', Icon: Compass },
  { href: '/info', label: 'Käytännön info', Icon: Info },
  { href: '/budjetti', label: 'Budjetti', Icon: Wallet },
];

function isMorePathActive(href: string, pathname: string): boolean {
  // Home only matches the exact root, otherwise '/' would match every path.
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function BottomNav() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);

  const onPrimaryTab = PRIMARY_TABS.some((t) => t.match(pathname));
  const onMorePage = MORE_LINKS.some((l) => isMorePathActive(l.href, pathname));
  const moreActive = !onPrimaryTab && onMorePage;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <nav
        aria-label="Pääsivut"
        // z-40 + isolate: rises above any in-page sticky/elevated elements
        // (DayCard accordions, sight cards) so it's never visually obscured.
        // bg-card/95 stays nearly opaque even if backdrop-filter is disabled
        // by the browser or by a transformed ancestor (Safari quirk).
        className="fixed inset-x-0 bottom-0 z-40 isolate border-t border-border/60 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 pb-[env(safe-area-inset-bottom)] sm:hidden"
      >
        <ul className="mx-auto grid max-w-6xl grid-cols-5">
          {PRIMARY_TABS.map((tab) => {
            const active = tab.match(pathname);
            const Icon = tab.Icon;
            return (
              <li key={tab.href} className="contents">
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative flex min-h-16 flex-col items-center justify-center gap-1 px-1 pt-2 pb-1.5 text-[11px] leading-none tracking-tight no-underline outline-none select-none transition-colors hover:no-underline focus-visible:[&_.nav-pill]:ring-2 focus-visible:[&_.nav-pill]:ring-ring focus-visible:[&_.nav-pill]:ring-offset-2 focus-visible:[&_.nav-pill]:ring-offset-card ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <span
                    className={`nav-pill flex h-8 w-16 items-center justify-center rounded-full transition-[background-color,transform] duration-150 group-active:scale-95 ${
                      active
                        ? 'bg-primary/15'
                        : 'bg-transparent group-active:bg-muted'
                    }`}
                  >
                    <Icon
                      className="size-[22px]"
                      strokeWidth={active ? 2.25 : 2}
                      fill={active && tab.fillWhenActive ? 'currentColor' : 'none'}
                      aria-hidden
                    />
                  </span>
                  <span className={active ? 'font-semibold' : ''}>{tab.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="contents">
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Lisää linkkejä"
                aria-expanded={open}
                className={`group relative flex min-h-16 flex-col items-center justify-center gap-1 px-1 pt-2 pb-1.5 text-[11px] leading-none tracking-tight outline-none select-none transition-colors focus-visible:[&_.nav-pill]:ring-2 focus-visible:[&_.nav-pill]:ring-ring focus-visible:[&_.nav-pill]:ring-offset-2 focus-visible:[&_.nav-pill]:ring-offset-card ${
                  moreActive && !open ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <span
                  className={`nav-pill flex h-8 w-16 items-center justify-center rounded-full transition-[background-color,transform] duration-150 group-active:scale-95 ${
                    moreActive && !open
                      ? 'bg-primary/15'
                      : 'bg-transparent group-active:bg-muted'
                  }`}
                >
                  <Menu
                    className="size-[22px]"
                    strokeWidth={moreActive && !open ? 2.25 : 2}
                    aria-hidden
                  />
                </span>
                <span className={moreActive && !open ? 'font-semibold' : ''}>
                  Lisää
                </span>
              </button>
            </SheetTrigger>
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
        <div className="mx-auto w-full max-w-6xl px-4 pb-6">
          <ul className="grid grid-cols-2 gap-2.5">
            {MORE_LINKS.map((l) => {
              const Icon = l.Icon;
              const active = isMorePathActive(l.href, pathname);
              return (
                <li key={l.href}>
                  <SheetClose asChild>
                    <Link
                      href={l.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-14 items-center gap-3 rounded-xl border px-3 py-3 text-sm no-underline transition-colors hover:no-underline ${
                        active
                          ? 'border-primary/30 bg-primary/10 text-foreground'
                          : 'border-border bg-card text-foreground hover:bg-muted/40'
                      }`}
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? 'bg-primary/15 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="font-medium">{l.label}</span>
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
