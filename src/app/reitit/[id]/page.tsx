import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { presets } from '@/data/presets';
import DayTimeline from '@/components/itinerary/DayTimeline';
import { formatEUR } from '@/lib/currency';
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
  if (!preset) return { title: 'Reittiä ei löytynyt' };
  return {
    title: `${preset.title} — Kazakstan-reissu`,
    description: preset.shortDescription,
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

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-2 px-2 text-muted-foreground">
          <Link href="/reitit">← Valmiit reittirungot</Link>
        </Button>
        <h1 className="text-balance text-3xl font-bold tracking-tight">{preset.title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {preset.shortDescription}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <InfoTile label="Kenelle" value={preset.whoFor} />
        <InfoTile label="Kesto" value={`${preset.durationDays} päivää`} />
        <InfoTile
          label="Budjettiarvio / hlö"
          value={`${formatEUR(preset.estimatedBudgetEUR.low)} – ${formatEUR(preset.estimatedBudgetEUR.mid)}`}
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Kohokohdat
        </h2>
        <ul className="grid gap-1 text-sm sm:grid-cols-2">
          {preset.highlights.map((h, i) => (
            <li key={i}>• {h}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Päivä päivältä
        </h2>
        <DayTimeline days={preset.days} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Käytä pohjana omassa reittisuunnitelmassa</CardTitle>
          <CardDescription>
            Kopioi <code>preset.days</code> tämän tiedoston tunnisteella{' '}
            <code>{preset.id}</code> ja vie ne <code>src/data/itinerary.ts</code>:n{' '}
            <code>userItinerary</code> -taulukkoon. Sen jälkeen muokkaa vapaasti.
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
