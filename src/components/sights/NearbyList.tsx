import Link from 'next/link';
import { categoryMeta } from '@/data/categories';
import type { NearbyResult } from '@/lib/distance';

export default function NearbyList({ items }: { items: NearbyResult[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="divide-y divide-(--color-border) rounded-lg border border-(--color-border) bg-(--color-card)">
      {items.map(({ sight, distanceKm }) => {
        const meta = categoryMeta[sight.category];
        return (
          <li key={sight.id} className="flex items-center justify-between gap-3 p-3">
            <div>
              <Link
                href={`/nahtavyydet/${sight.slug}`}
                className="font-medium text-(--color-fg) hover:no-underline"
              >
                {sight.name}
              </Link>
              <p className="text-xs text-(--color-muted)">
                {meta.emoji} {meta.fi}
              </p>
            </div>
            <span className="text-xs text-(--color-muted)">
              {Math.round(distanceKm)} km
            </span>
          </li>
        );
      })}
    </ul>
  );
}
