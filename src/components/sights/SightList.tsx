'use client';

import { categoryMeta } from '@/data/categories';
import type { Sight } from '@/lib/types';
import OverallStars from './OverallStars';

interface Props {
  sights: Sight[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SightList({ sights, selectedId, onSelect }: Props) {
  if (sights.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-(--color-muted)">
        Ei kohteita näillä suodattimilla.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-(--color-border)">
      {sights.map((s) => {
        const isSelected = s.id === selectedId;
        const meta = categoryMeta[s.category];
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className={`block w-full px-3 py-3 text-left transition ${
                isSelected
                  ? 'bg-(--color-steppe)/10'
                  : 'hover:bg-(--color-bg)'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-(--color-fg)">{s.name}</span>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] text-white"
                  style={{ backgroundColor: meta.color }}
                >
                  {meta.fi}
                </span>
              </div>
              {s.ratings && (
                <div className="mt-1">
                  <OverallStars ratings={s.ratings} showBadge={false} />
                </div>
              )}
              <p className="mt-1 text-xs text-(--color-muted)">{s.shortDescription}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
