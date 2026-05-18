import Link from 'next/link';

const nav = [
  { href: '/kartta', label: 'Kartta' },
  { href: '/nahtavyydet', label: 'Nähtävyydet' },
  { href: '/reitit', label: 'Valmiit reitit' },
  { href: '/reittisuunnitelma', label: 'Reittisuunnitelma' },
  { href: '/shortlist', label: 'Shortlist' },
  { href: '/info', label: 'Info' },
  { href: '/budjetti', label: 'Budjetti' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-(--color-border) bg-(--color-card)/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="text-lg font-semibold text-(--color-fg) hover:no-underline"
        >
          🇰🇿 Kazakstan
        </Link>
        {/* Desktop nav. Mobile uses BottomNav. */}
        <nav className="hidden flex-wrap gap-x-4 gap-y-1 text-sm sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-(--color-fg) hover:text-(--color-steppe)"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
