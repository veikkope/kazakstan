import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sights } from '@/data/sights';
import { categoryMeta, regionMeta } from '@/data/categories';
import { excludeDrafts, findBySlug } from '@/lib/filters';
import { nearestSights } from '@/lib/distance';
import NearbyList from '@/components/sights/NearbyList';
import ShortlistButton from '@/components/sights/ShortlistButton';
import SightActionBar from '@/components/sights/SightActionBar';
import SightImage from '@/components/sights/SightImage';
import StarRating, { RatingPlaceholder } from '@/components/sights/StarRating';
import OverallStars from '@/components/sights/OverallStars';
import { formatKZT } from '@/lib/currency';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function generateStaticParams() {
  return sights.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sight = findBySlug(sights, slug);
  if (!sight) return { title: 'Kohdetta ei löytynyt' };
  return {
    title: `${sight.name} — Kazakstan-reissu`,
    description: sight.shortDescription,
  };
}

const MONTHS_FI = ['', 'tam', 'hel', 'maa', 'huh', 'tou', 'kes', 'hei', 'elo', 'syy', 'lok', 'mar', 'jou'];

export default async function SightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sight = findBySlug(sights, slug);
  if (!sight) notFound();

  const cat = categoryMeta[sight.category];
  const region = regionMeta[sight.region];
  // Nearby: aina rajaa draftit pois.
  const nearby = nearestSights(sight, excludeDrafts(sights), 5);

  return (
    <>
    <article className="space-y-8 pb-20 lg:pb-0">
      <SightImage
        sight={sight}
        sizes="(min-width: 1024px) 1024px, 100vw"
        aspect="aspect-[16/9] sm:aspect-[21/9]"
        className="rounded-lg"
        priority
      />
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-xs uppercase tracking-wide text-white"
            style={{ backgroundColor: cat.color }}
          >
            {cat.emoji} {cat.fi}
          </span>
          <span className="text-sm text-muted-foreground">{region.fi}</span>
          {sight.status === 'draft' && (
            <Badge
              variant="outline"
              className="border-(--color-sand-dark) text-(--color-sand-dark) uppercase tracking-wide"
            >
              Luonnos — odottaa vahvistusta
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-balance text-3xl font-bold tracking-tight">{sight.name}</h1>
          <ShortlistButton sightId={sight.id} sightName={sight.name} variant="full" />
        </div>
        {sight.nameLocal && (
          <p className="text-sm text-muted-foreground">{sight.nameLocal}</p>
        )}
        {sight.ratings && (
          <div>
            <OverallStars ratings={sight.ratings} size="lg" />
          </div>
        )}
        <p className="max-w-2xl text-lg text-muted-foreground">
          {sight.shortDescription}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Kuvaus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-foreground">{sight.description}</p>
            </CardContent>
          </Card>

          {sight.historicalContext && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Historia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{sight.historicalContext}</p>
              </CardContent>
            </Card>
          )}

          {sight.practicalTips && sight.practicalTips.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Käytännön vinkit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {sight.practicalTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {nearby.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Lähellä tätä
              </h2>
              <NearbyList items={nearby} />
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Arvosanat
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sight.ratings ? (
                <>
                  <StarRating ratings={sight.ratings} />
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    Arvioitu {sight.ratings.ratedAt}
                  </p>
                </>
              ) : (
                <RatingPlaceholder />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Pikatiedot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                {sight.city && (
                  <Row label="Kaupunki" value={sight.city} />
                )}
                {sight.timeNeededHours !== undefined && (
                  <Row label="Vierailuaika" value={`${sight.timeNeededHours} h`} />
                )}
                {sight.difficulty && (
                  <Row
                    label="Vaativuus"
                    value={
                      sight.difficulty === 'easy'
                        ? 'helppo'
                        : sight.difficulty === 'moderate'
                          ? 'keskitaso'
                          : 'vaativa'
                    }
                  />
                )}
                {sight.budgetLevel && (
                  <Row
                    label="Hintataso"
                    value={
                      sight.budgetLevel === 'low'
                        ? 'edullinen'
                        : sight.budgetLevel === 'mid'
                          ? 'keskitaso'
                          : 'kallis'
                    }
                  />
                )}
                {sight.costKZT !== undefined && (
                  <Row
                    label="Sisäänpääsy"
                    value={sight.costKZT === 'free' ? 'Maksuton' : formatKZT(sight.costKZT)}
                  />
                )}
                {sight.openingHours && (
                  <Row label="Aukiolo" value={sight.openingHours} />
                )}
                {sight.needsCar !== undefined && (
                  <Row label="Vaatii auton" value={sight.needsCar ? 'Kyllä' : 'Ei'} />
                )}
                {sight.needsGuide !== undefined && (
                  <Row
                    label="Suositellaan opasta"
                    value={sight.needsGuide ? 'Kyllä' : 'Ei'}
                  />
                )}
                {sight.travelTimeFromAlmatyHours !== undefined && (
                  <Row
                    label="Matka Almatysta"
                    value={`~${sight.travelTimeFromAlmatyHours} h`}
                  />
                )}
                {sight.travelTimeFromAstanaHours !== undefined && (
                  <Row
                    label="Matka Astanasta"
                    value={`~${sight.travelTimeFromAstanaHours} h`}
                  />
                )}
                {sight.bestMonths && sight.bestMonths.length > 0 && (
                  <Row
                    label="Paras aika"
                    value={sight.bestMonths.map((m) => MONTHS_FI[m]).join(', ')}
                  />
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Sijainti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {sight.coords.lat.toFixed(4)}, {sight.coords.lng.toFixed(4)}
              </p>
              <Link
                href={`/kartta?id=${sight.id}`}
                className="mt-3 inline-flex min-h-11 items-center rounded-md bg-(--color-steppe) px-4 text-sm text-white hover:bg-(--color-steppe-dark) hover:no-underline"
              >
                Avaa kartalla →
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
    <SightActionBar sight={sight} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}
