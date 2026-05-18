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
          <span className="text-sm text-(--color-muted)">{region.fi}</span>
          {sight.status === 'draft' && (
            <span className="rounded-full bg-(--color-sand) px-2 py-0.5 text-xs uppercase tracking-wide text-(--color-fg)">
              Luonnos — odottaa vahvistusta
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{sight.name}</h1>
          <ShortlistButton sightId={sight.id} variant="full" />
        </div>
        {sight.nameLocal && (
          <p className="text-sm text-(--color-muted)">{sight.nameLocal}</p>
        )}
        {sight.ratings && (
          <div>
            <OverallStars ratings={sight.ratings} size="lg" />
          </div>
        )}
        <p className="max-w-2xl text-lg text-(--color-muted)">
          {sight.shortDescription}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
              Kuvaus
            </h2>
            <p className="whitespace-pre-line text-(--color-fg)">{sight.description}</p>
          </section>

          {sight.historicalContext && (
            <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
                Historia
              </h2>
              <p className="text-sm">{sight.historicalContext}</p>
            </section>
          )}

          {sight.practicalTips && sight.practicalTips.length > 0 && (
            <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
                Käytännön vinkit
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {sight.practicalTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </section>
          )}

          {nearby.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
                Lähellä tätä
              </h2>
              <NearbyList items={nearby} />
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
              Arvosanat
            </h2>
            {sight.ratings ? (
              <>
                <StarRating ratings={sight.ratings} />
                <p className="mt-3 text-[11px] text-(--color-muted)">
                  Arvioitu {sight.ratings.ratedAt}
                </p>
              </>
            ) : (
              <RatingPlaceholder />
            )}
          </section>

          <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
              Pikatiedot
            </h2>
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
          </section>

          <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
              Sijainti
            </h2>
            <p className="text-sm text-(--color-muted)">
              {sight.coords.lat.toFixed(4)}, {sight.coords.lng.toFixed(4)}
            </p>
            <Link
              href={`/kartta?id=${sight.id}`}
              className="mt-3 inline-flex min-h-11 items-center rounded-md bg-(--color-steppe) px-4 text-sm text-white hover:bg-(--color-steppe-dark) hover:no-underline"
            >
              Avaa kartalla →
            </Link>
          </section>
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
      <dt className="text-(--color-muted)">{label}</dt>
      <dd className="text-right text-(--color-fg)">{value}</dd>
    </div>
  );
}
