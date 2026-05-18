'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Tab {
  href: string;
  label: string;
  icon: string;
  /** Matchers used to detect active state. The tab is also active for any sub-route. */
  match: (path: string) => boolean;
}

const PRIMARY_TABS: Tab[] = [
  {
    href: '/',
    label: 'Etusivu',
    icon: '🏠',
    match: (p) => p === '/',
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
  { href: '/nahtavyydet', label: 'Nähtävyydet', icon: '📍' },
  { href: '/reitit', label: 'Valmiit reitit', icon: '🧭' },
  { href: '/info', label: 'Käytännön info', icon: 'ℹ️' },
  { href: '/budjetti', label: 'Budjetti', icon: '💸' },
];

const MORE_PATHS = MORE_LINKS.map((l) => l.href);

export default function BottomNav() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // ESC closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const moreActive = MORE_PATHS.some((p) => pathname.startsWith(p));

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div
        role="dialog"
        aria-label="Lisää linkkejä"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-(--color-border) bg-(--color-card) pb-[env(safe-area-inset-bottom)] shadow-lg transition-transform duration-200 sm:hidden ${
          open ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Lisää</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sulje"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-(--color-muted)"
            >
              ✕
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-2">
            {MORE_LINKS.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className={`flex min-h-14 items-center gap-3 rounded-lg border px-3 py-2 text-sm hover:no-underline ${
                      active
                        ? 'border-(--color-steppe) bg-(--color-steppe)/10 text-(--color-fg)'
                        : 'border-(--color-border) bg-(--color-card) text-(--color-fg)'
                    }`}
                  >
                    <span className="text-xl" aria-hidden>
                      {l.icon}
                    </span>
                    <span>{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <nav
        aria-label="Pääsivut"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-(--color-border) bg-(--color-card) pb-[env(safe-area-inset-bottom)] sm:hidden"
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
                      ? 'font-semibold text-(--color-steppe)'
                      : 'text-(--color-muted)'
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
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="bottom-nav-more"
              className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] ${
                moreActive && !open
                  ? 'font-semibold text-(--color-steppe)'
                  : 'text-(--color-muted)'
              }`}
            >
              <span className="text-lg leading-none" aria-hidden>
                ☰
              </span>
              <span className="leading-tight">Lisää</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
