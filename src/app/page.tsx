import Link from 'next/link';
import { sights } from '@/data/sights';
import { categoryMeta } from '@/data/categories';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function HomePage() {
  const featured = sights.filter((s) => s.featured && s.status === 'verified');
  const drafts = sights.filter((s) => s.status === 'draft');

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          Reissuopas itsellesi ja kaverille
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight">
          Suunnitellaan reissu Kazakstaniin.
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
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
              <li key={s.id}>
                <Card size="sm">
                  <CardHeader>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {categoryMeta[s.category].emoji} {categoryMeta[s.category].fi}
                    </p>
                    <CardTitle className="text-lg font-semibold">
                      <Link href={`/nahtavyydet/${s.slug}`}>{s.name}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{s.shortDescription}</CardDescription>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      {drafts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Myöhemmin lisättävät / vahvistettavat</h2>
          <p className="text-sm text-muted-foreground">
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
      className="block transition-all duration-200 hover:-translate-y-1 hover:no-underline hover:shadow-md rounded-xl"
    >
      <Card className={`h-full border-2 ${accentBorder} ring-0 p-5 gap-2`}>
        <CardTitle className="text-lg font-semibold">{title} →</CardTitle>
        <CardDescription>{description}</CardDescription>
      </Card>
    </Link>
  );
}
