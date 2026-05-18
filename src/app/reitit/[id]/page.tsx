import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { presets } from '@/data/presets';
import DayTimeline from '@/components/itinerary/DayTimeline';
import { formatEUR } from '@/lib/currency';

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
        <p className="text-sm text-(--color-muted)">
          <Link href="/reitit">← Valmiit reittirungot</Link>
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{preset.title}</h1>
        <p className="max-w-2xl text-lg text-(--color-muted)">
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
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
          Kohokohdat
        </h2>
        <ul className="grid gap-1 text-sm sm:grid-cols-2">
          {preset.highlights.map((h, i) => (
            <li key={i}>• {h}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-(--color-muted)">
          Päivä päivältä
        </h2>
        <DayTimeline days={preset.days} />
      </section>

      <section className="rounded-lg border border-(--color-border) bg-(--color-card) p-5">
        <h2 className="mb-2 font-semibold">Käytä pohjana omassa reittisuunnitelmassa</h2>
        <p className="text-sm text-(--color-muted)">
          Kopioi <code>preset.days</code> tämän tiedoston tunnisteella{' '}
          <code>{preset.id}</code> ja vie ne <code>src/data/itinerary.ts</code>:n{' '}
          <code>userItinerary</code> -taulukkoon. Sen jälkeen muokkaa vapaasti.
        </p>
      </section>
    </article>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-card) p-4">
      <p className="text-xs uppercase tracking-wide text-(--color-muted)">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
