import { getLocale } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { beforeTripChecklist } from '@/data/checklist';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { ChecklistCategory, ChecklistItem } from '@/lib/types';

const CATEGORY_META: Record<ChecklistCategory, { fi: string; emoji: string }> = {
  documents: { fi: 'Dokumentit', emoji: '📄' },
  health: { fi: 'Terveys', emoji: '💊' },
  money: { fi: 'Raha', emoji: '💳' },
  tech: { fi: 'Tekniikka', emoji: '📱' },
  packing: { fi: 'Pakkaus', emoji: '🎒' },
  logistics: { fi: 'Logistiikka', emoji: '✈️' },
};

const ORDER: ChecklistCategory[] = [
  'documents',
  'logistics',
  'money',
  'health',
  'tech',
  'packing',
];

export default async function BeforeTripChecklist() {
  const loc = asLocale(await getLocale());
  const grouped = new Map<ChecklistCategory, ChecklistItem[]>();
  for (const cat of ORDER) grouped.set(cat, []);
  for (const item of beforeTripChecklist) {
    grouped.get(item.category)?.push(item);
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Ennen lähtöä — checklist</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {ORDER.map((cat) => {
          const items = grouped.get(cat) ?? [];
          if (items.length === 0) return null;
          const meta = CATEGORY_META[cat];
          return (
            <Card key={cat} size="sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  {meta.emoji} {meta.fi}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm">
                  {items
                    .sort((a, b) => (b.daysBeforeTrip ?? 0) - (a.daysBeforeTrip ?? 0))
                    .map((item) => (
                      <li key={item.id} className="leading-tight">
                        <span className="text-(--color-fg)">☐ {localised(item.label, loc)}</span>
                        {item.daysBeforeTrip !== undefined && (
                          <span className="ml-1 text-xs text-(--color-muted)">
                            (~{item.daysBeforeTrip} pv ennen)
                          </span>
                        )}
                        {item.detail && (
                          <p className="ml-4 mt-0.5 text-xs text-(--color-muted)">
                            {localised(item.detail, loc)}
                          </p>
                        )}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
