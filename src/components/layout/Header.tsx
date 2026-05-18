import Link from 'next/link';

const nav = [
  { href: '/', label: 'Etusivu' },
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
    <header className="border-b border-(--color-border) bg-(--color-card)">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-(--color-fg) hover:no-underline">
          🇰🇿 Kazakstan
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {nav.slice(1).map((item) => (
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
