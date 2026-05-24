import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { sights } from '@/data/sights';
import { categoryMeta, regionMeta } from '@/data/categories';
import { excludeDrafts, findBySlug } from '@/lib/filters';
import { nearestSights } from '@/lib/distance';
import NearbyList from '@/components/sights/NearbyList';
import ShortlistButton from '@/components/sights/ShortlistButton';
import SightActionBar from '@/components/sights/SightActionBar';
import SightImage from '@/components/sights/SightImage';
import NavigateMenu from '@/components/navigation/NavigateMenu';
import StarRating, { RatingPlaceholder } from '@/components/sights/StarRating';
import OverallStars from '@/components/sights/OverallStars';
import { formatKZT } from '@/lib/currency';
import { asLocale, getSightFields, localised } from '@/lib/i18n-helpers';
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
  const t = await getTranslations();
  if (!sight) return { title: t('pages.sightDetail.notFoundTitle') };
  const loc = asLocale(await getLocale());
  return {
    title: t('pages.sightDetail.metaTitle', { name: localised(sight.name, loc) }),
    description: localised(sight.shortDescription, loc),
  };
}

const MONTH_KEYS = [
  '',
  'pages.sightDetail.monthJan',
  'pages.sightDetail.monthFeb',
  'pages.sightDetail.monthMar',
  'pages.sightDetail.monthApr',
  'pages.sightDetail.monthMay',
  'pages.sightDetail.monthJun',
  'pages.sightDetail.monthJul',
  'pages.sightDetail.monthAug',
  'pages.sightDetail.monthSep',
  'pages.sightDetail.monthOct',
  'pages.sightDetail.monthNov',
  'pages.sightDetail.monthDec',
] as const;

export default async function SightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sight = findBySlug(sights, slug);
  if (!sight) notFound();

  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  const fields = getSightFields(sight, loc);
  const cat = categoryMeta[sight.category];
  const catLabel = localised(cat.label, loc);
  const region = regionMeta[sight.region];
  const regionLabel = localised(region.label, loc);
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
            {cat.emoji} {catLabel}
          </span>
          <span className="text-sm text-muted-foreground">{regionLabel}</span>
          {sight.status === 'draft' && (
            <Badge
              variant="outline"
              className="border-(--color-sand-dark) text-(--color-sand-dark) uppercase tracking-wide"
            >
              {t('pages.sightDetail.draftBadge')}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-balance text-3xl font-bold tracking-tight">{fields.name}</h1>
          <ShortlistButton sightId={sight.id} sightName={fields.name} variant="full" />
          {/*
            Desktop-only navigate menu — mobile/tablet get the same control
            from the fixed-bottom SightActionBar (which is hidden lg:hidden).
          */}
          <div className="hidden lg:inline-flex">
            <NavigateMenu
              coords={sight.coords}
              label={fields.name}
              region={sight.region}
              variant="outline"
              size="sm"
              triggerText={t('pages.sightDetail.navigator')}
            />
          </div>
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
          {fields.shortDescription}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t('pages.sightDetail.descriptionHeading')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-foreground">{fields.description}</p>
            </CardContent>
          </Card>

          {fields.historicalContext && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {t('pages.sightDetail.historyHeading')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{fields.historicalContext}</p>
              </CardContent>
            </Card>
          )}

          {fields.practicalTips.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {t('pages.sightDetail.tipsHeading')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {fields.practicalTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {nearby.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t('pages.sightDetail.nearbyHeading')}
              </h2>
              <NearbyList items={nearby} />
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t('pages.sightDetail.ratingsHeading')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sight.ratings ? (
                <>
                  <StarRating ratings={sight.ratings} />
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    {t('pages.sightDetail.ratedOn', { date: sight.ratings.ratedAt })}
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
                {t('pages.sightDetail.quickFactsHeading')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                {fields.city && (
                  <Row label={t('pages.sightDetail.city')} value={fields.city} />
                )}
                {sight.timeNeededHours !== undefined && (
                  <Row
                    label={t('pages.sightDetail.timeNeeded')}
                    value={t('pages.sightDetail.hours', { hours: sight.timeNeededHours })}
                  />
                )}
                {sight.difficulty && (
                  <Row
                    label={t('pages.sightDetail.difficulty')}
                    value={
                      sight.difficulty === 'easy'
                        ? t('pages.sightDetail.difficultyEasy')
                        : sight.difficulty === 'moderate'
                          ? t('pages.sightDetail.difficultyModerate')
                          : t('pages.sightDetail.difficultyHard')
                    }
                  />
                )}
                {sight.budgetLevel && (
                  <Row
                    label={t('pages.sightDetail.budgetLevel')}
                    value={
                      sight.budgetLevel === 'low'
                        ? t('pages.sightDetail.budgetLow')
                        : sight.budgetLevel === 'mid'
                          ? t('pages.sightDetail.budgetMid')
                          : t('pages.sightDetail.budgetHigh')
                    }
                  />
                )}
                {sight.costKZT !== undefined && (
                  <Row
                    label={t('pages.sightDetail.cost')}
                    value={sight.costKZT === 'free' ? t('pages.sightDetail.free') : formatKZT(sight.costKZT)}
                  />
                )}
                {fields.openingHours && (
                  <Row label={t('pages.sightDetail.openingHours')} value={fields.openingHours} />
                )}
                {sight.needsCar !== undefined && (
                  <Row
                    label={t('pages.sightDetail.needsCar')}
                    value={sight.needsCar ? t('common.yes') : t('common.no')}
                  />
                )}
                {sight.needsGuide !== undefined && (
                  <Row
                    label={t('pages.sightDetail.needsGuide')}
                    value={sight.needsGuide ? t('common.yes') : t('common.no')}
                  />
                )}
                {sight.travelTimeFromAlmatyHours !== undefined && (
                  <Row
                    label={t('pages.sightDetail.travelFromAlmaty')}
                    value={t('pages.sightDetail.approxHours', { hours: sight.travelTimeFromAlmatyHours })}
                  />
                )}
                {sight.travelTimeFromAstanaHours !== undefined && (
                  <Row
                    label={t('pages.sightDetail.travelFromAstana')}
                    value={t('pages.sightDetail.approxHours', { hours: sight.travelTimeFromAstanaHours })}
                  />
                )}
                {sight.bestMonths && sight.bestMonths.length > 0 && (
                  <Row
                    label={t('pages.sightDetail.bestTime')}
                    value={sight.bestMonths.map((m) => t(MONTH_KEYS[m])).join(', ')}
                  />
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t('pages.sightDetail.locationHeading')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {sight.coords.lat.toFixed(4)}, {sight.coords.lng.toFixed(4)}
              </p>
              <Link
                href={`/map?id=${sight.id}`}
                className="mt-3 inline-flex min-h-11 items-center rounded-md bg-(--color-steppe) px-4 text-sm text-white hover:bg-(--color-steppe-dark) hover:no-underline"
              >
                {t('pages.sightDetail.openOnMap')}
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
