import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { categoryMeta } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { NearbyResult } from '@/lib/distance';

export default async function NearbyList({ items }: { items: NearbyResult[] }) {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  if (items.length === 0) return null;

  return (
    <ul className="divide-y divide-(--color-border) rounded-lg border border-(--color-border) bg-(--color-card)">
      {items.map(({ sight, distanceKm }) => {
        const meta = categoryMeta[sight.category];
        return (
          <li key={sight.id} className="flex items-center justify-between gap-3 p-3">
            <div>
              <Link
                href={`/sights/${sight.slug}`}
                className="font-medium text-(--color-fg) hover:no-underline"
              >
                {localised(sight.name, loc)}
              </Link>
              <p className="text-xs text-(--color-muted)">
                {meta.emoji} {localised(meta.label, loc)}
              </p>
            </div>
            <span className="text-xs text-(--color-muted)">
              {t('components.nearbyList.distanceKm', { km: Math.round(distanceKm) })}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
