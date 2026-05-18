import Link from 'next/link';
import { sights } from '@/data/sights';
import { categoryMeta } from '@/data/categories';

export default function HomePage() {
  const featured = sights.filter((s) => s.featured && s.status === 'verified');
  const drafts = sights.filter((s) => s.status === 'draft');

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-(--color-muted)">
          Reissuopas itsellesi ja kaverille
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Suunnitellaan reissu Kazakstaniin.
        </h1>
        <p className="max-w-2xl text-lg text-(--color-muted)">
          Tämä on päätöstyökalu — selaa kohteita kartalla, vertaa valmiita reittejä, ja
          tallenna suosikit shortlistille. Jaa nykyinen näkymä kaverille linkillä.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <PathCard
          href="/kartta"
          title="Selaa kartalla"
          description="Interaktiivinen kartta + filtterit. Klikkaa kohteita ja lisää shortlistille."
          accent="steppe"
        />
        <PathCard
          href="/reitit"
          title="Valmiit reittirungot"
          description="3 erilaista pohjaa: 5, 7 ja 10 päivän versiot. Hyvä lähtökohta."
          accent="sand"
        />
        <PathCard
          href="/info"
          title="Käytännön info"
          description="Viisumi, valuutta, kuljetukset, ennen lähtöä -checklist."
          accent="accent"
        />
      </section>

      {featured.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Klassikkokohteet</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <li
                key={s.id}
                className="rounded-lg border border-(--color-border) bg-(--color-card) p-4"
              >
                <p className="text-xs uppercase tracking-wide text-(--color-muted)">
                  {categoryMeta[s.category].emoji} {categoryMeta[s.category].fi}
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  <Link href={`/nahtavyydet/${s.slug}`}>{s.name}</Link>
                </h3>
                <p className="mt-1 text-sm text-(--color-muted)">{s.shortDescription}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {drafts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Myöhemmin lisättävät / vahvistettavat</h2>
          <p className="text-sm text-(--color-muted)">
            Nämä eivät vielä näy kartalla — odottavat varmistusta.
          </p>
          <ul className="text-sm">
            {drafts.map((s) => (
              <li key={s.id}>• {s.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function PathCard({
  href,
  title,
  description,
  accent,
}: {
  href: string;
  title: string;
  description: string;
  accent: 'steppe' | 'sand' | 'accent';
}) {
  const accentBorder =
    accent === 'steppe'
      ? 'border-(--color-steppe)'
      : accent === 'sand'
        ? 'border-(--color-sand-dark)'
        : 'border-(--color-accent)';
  return (
    <Link
      href={href}
      className={`block rounded-lg border-2 ${accentBorder} bg-(--color-card) p-5 transition hover:-translate-y-0.5 hover:no-underline`}
    >
      <h3 className="text-lg font-semibold text-(--color-fg)">{title} →</h3>
      <p className="mt-2 text-sm text-(--color-muted)">{description}</p>
    </Link>
  );
}
