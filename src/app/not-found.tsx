import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-4 py-12 text-center">
      <h1 className="text-3xl font-bold">404 — Ei löytynyt</h1>
      <p className="text-(--color-muted)">
        Tätä sivua ei ole olemassa. Ehkä tarkoitit:
      </p>
      <ul className="space-y-1 text-sm">
        <li>
          <Link href="/">Etusivu</Link>
        </li>
        <li>
          <Link href="/kartta">Kartta</Link>
        </li>
        <li>
          <Link href="/nahtavyydet">Nähtävyydet</Link>
        </li>
        <li>
          <Link href="/reitit">Valmiit reitit</Link>
        </li>
      </ul>
    </div>
  );
}
