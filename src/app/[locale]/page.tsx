import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { sights } from '@/data/sights';
import { categoryMeta } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default async function HomePage() {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  const featured = sights.filter((s) => s.featured);

  return (
    <div className="space-y-12">
      <section className="kz-mesh-hero relative space-y-3 overflow-hidden rounded-2xl px-4 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          {t('pages.home.eyebrow')}
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight">
          {t('pages.home.title')}
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
          {t('pages.home.intro')}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <PathCard
          href="/map"
          title={t('pages.home.pathMapTitle')}
          description={t('pages.home.pathMapDescription')}
          accent="steppe"
        />
        <PathCard
          href="/routes"
          title={t('pages.home.pathRoutesTitle')}
          description={t('pages.home.pathRoutesDescription')}
          accent="sand"
        />
        <PathCard
          href="/info"
          title={t('pages.home.pathInfoTitle')}
          description={t('pages.home.pathInfoDescription')}
          accent="accent"
        />
      </section>

      {featured.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {t('pages.home.featuredHeading')}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <li key={s.id}>
                <Card size="sm">
                  <CardHeader>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {categoryMeta[s.category].emoji} {localised(categoryMeta[s.category].label, loc)}
                    </p>
                    <CardTitle className="text-lg font-semibold">
                      <Link href={`/sights/${s.slug}`}>{localised(s.name, loc)}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{localised(s.shortDescription, loc)}</CardDescription>
                  </CardContent>
                </Card>
              </li>
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
