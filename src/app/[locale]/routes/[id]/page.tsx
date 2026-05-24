import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { presets } from '@/data/presets';
import DayTimeline from '@/components/itinerary/DayTimeline';
import { formatEUR } from '@/lib/currency';
import { asLocale, localised } from '@/lib/i18n-helpers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return presets.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const preset = presets.find((p) => p.id === id);
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  if (!preset) return { title: t('pages.routeDetail.metaNotFound') };
  return {
    title: t('pages.routeDetail.metaTitle', { title: localised(preset.title, loc) }),
    description: localised(preset.shortDescription, loc),
  };
}

export default async function PresetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const preset = presets.find((p) => p.id === id);
  if (!preset) notFound();
  const t = await getTranslations();
  const loc = asLocale(await getLocale());

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-2 px-2 text-muted-foreground">
          <Link href="/routes">{t('pages.routeDetail.backLink')}</Link>
        </Button>
        <h1 className="text-balance text-3xl font-bold tracking-tight">{localised(preset.title, loc)}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {localised(preset.shortDescription, loc)}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <InfoTile label={t('pages.routeDetail.tileWhoFor')} value={localised(preset.whoFor, loc)} />
        <InfoTile
          label={t('pages.routeDetail.tileDuration')}
          value={t('pages.routeDetail.durationValue', { count: preset.durationDays })}
        />
        <InfoTile
          label={t('pages.routeDetail.tileBudget')}
          value={`${formatEUR(preset.estimatedBudgetEUR.low)} – ${formatEUR(preset.estimatedBudgetEUR.mid)}`}
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('pages.routeDetail.highlightsHeading')}
        </h2>
        <ul className="grid gap-1 text-sm sm:grid-cols-2">
          {preset.highlights.map((h, i) => (
            <li key={i}>• {localised(h, loc)}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('pages.routeDetail.dayByDayHeading')}
        </h2>
        <DayTimeline days={preset.days} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t('pages.routeDetail.useAsTemplateTitle')}</CardTitle>
          <CardDescription>
            {t.rich('pages.routeDetail.useAsTemplateBody', {
              id: preset.id,
              code: (chunks) => <code>{chunks}</code>,
            })}
          </CardDescription>
        </CardHeader>
      </Card>
    </article>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm">
      <CardContent>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm">{value}</p>
      </CardContent>
    </Card>
  );
}
