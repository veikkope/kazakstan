import Link from 'next/link';
import type { Preset } from '@/lib/types';
import { formatEUR } from '@/lib/currency';

export default function PresetCard({ preset }: { preset: Preset }) {
  const themeLabel =
    preset.theme === 'nature'
      ? '🏔️ Luonto'
      : preset.theme === 'culture'
        ? '🕌 Kulttuuri'
        : '🚗 Roadtrip';

  return (
    <Link
      href={`/reitit/${preset.id}`}
      className="block rounded-lg border-2 border-(--color-border) bg-(--color-card) p-5 transition hover:-translate-y-0.5 hover:border-(--color-steppe) hover:no-underline"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-(--color-muted)">
        <span>{themeLabel}</span>
        <span>{preset.durationDays} päivää</span>
      </div>
      <h3 className="mt-2 text-xl font-semibold text-(--color-fg)">{preset.title}</h3>
      <p className="mt-2 text-sm text-(--color-muted)">{preset.shortDescription}</p>
      <p className="mt-2 text-sm">
        <span className="text-(--color-muted)">Kenelle: </span>
        <span className="text-(--color-fg)">{preset.whoFor}</span>
      </p>
      <ul className="mt-3 space-y-1 text-sm">
        {preset.highlights.slice(0, 3).map((h, i) => (
          <li key={i} className="text-(--color-fg)">
            • {h}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-(--color-muted)">
        Budjettiarvio: {formatEUR(preset.estimatedBudgetEUR.low)} —{' '}
        {formatEUR(preset.estimatedBudgetEUR.mid)} / hlö
      </p>
    </Link>
  );
}
