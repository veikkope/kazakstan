import Link from 'next/link';
import { categoryMeta, regionMeta } from '@/data/categories';
import type { Sight } from '@/lib/types';
import ShortlistButton from './ShortlistButton';
import OverallStars from './OverallStars';

export default function SightCard({ sight }: { sight: Sight }) {
  const cat = categoryMeta[sight.category];
  const region = regionMeta[sight.region];

  return (
    <div className="relative rounded-lg border border-(--color-border) bg-(--color-card) p-4 transition hover:-translate-y-0.5">
      <div className="absolute right-3 top-3 z-10">
        <ShortlistButton sightId={sight.id} />
      </div>
      <Link
        href={`/nahtavyydet/${sight.slug}`}
        className="block hover:no-underline"
      >
        <div className="flex items-center gap-2 pr-12">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide text-white"
            style={{ backgroundColor: cat.color }}
          >
            {cat.emoji} {cat.fi}
          </span>
          {sight.status === 'draft' && (
            <span className="rounded-full bg-(--color-sand) px-2 py-0.5 text-[10px] uppercase tracking-wide text-(--color-fg)">
              Luonnos
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-(--color-fg)">{sight.name}</h3>
        {sight.ratings && (
          <div className="mt-1">
            <OverallStars ratings={sight.ratings} />
          </div>
        )}
        <p className="mt-1 text-xs text-(--color-muted)">{region.fi}</p>
        <p className="mt-2 text-sm text-(--color-muted)">{sight.shortDescription}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-(--color-muted)">
          {sight.timeNeededHours !== undefined && (
            <span>⏱️ {sight.timeNeededHours} h</span>
          )}
          {sight.difficulty && <span>💪 {difficultyFi(sight.difficulty)}</span>}
          {sight.budgetLevel && <span>💸 {budgetFi(sight.budgetLevel)}</span>}
          {sight.needsCar && <span>🚗 auto</span>}
          {sight.needsGuide && <span>🧭 opas</span>}
        </div>
      </Link>
    </div>
  );
}

function difficultyFi(d: 'easy' | 'moderate' | 'hard'): string {
  return d === 'easy' ? 'helppo' : d === 'moderate' ? 'keskitaso' : 'vaativa';
}

function budgetFi(b: 'low' | 'mid' | 'high'): string {
  return b === 'low' ? 'edullinen' : b === 'mid' ? 'keskitaso' : 'kallis';
}
