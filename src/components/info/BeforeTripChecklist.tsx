import { beforeTripChecklist } from '@/data/checklist';
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

export default function BeforeTripChecklist() {
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
            <div
              key={cat}
              className="rounded-lg border border-(--color-border) bg-(--color-card) p-4"
            >
              <h3 className="mb-2 font-semibold">
                {meta.emoji} {meta.fi}
              </h3>
              <ul className="space-y-1.5 text-sm">
                {items
                  .sort((a, b) => (b.daysBeforeTrip ?? 0) - (a.daysBeforeTrip ?? 0))
                  .map((item) => (
                    <li key={item.id} className="leading-tight">
                      <span className="text-(--color-fg)">☐ {item.label}</span>
                      {item.daysBeforeTrip !== undefined && (
                        <span className="ml-1 text-xs text-(--color-muted)">
                          (~{item.daysBeforeTrip} pv ennen)
                        </span>
                      )}
                      {item.detail && (
                        <p className="ml-4 mt-0.5 text-xs text-(--color-muted)">
                          {item.detail}
                        </p>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
