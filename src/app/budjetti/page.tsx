import CurrencyConverter from '@/components/budget/CurrencyConverter';
import { budgetByRegion } from '@/data/budget';
import { formatEUR } from '@/lib/currency';
import type { BudgetCategory } from '@/lib/types';

const CATEGORY_FI: Record<BudgetCategory, string> = {
  flights: 'Lennot',
  lodging: 'Majoitus',
  food: 'Ruoka',
  transport: 'Kuljetus',
  activities: 'Aktiviteetit',
  misc: 'Muut',
};

export default function BudjettiPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Budjetti</h1>
        <p className="max-w-2xl text-(--color-muted)">
          Arviot per alue ja kategoria. Hinnat henkilöä kohden ellei toisin mainittu.
          Mangystaun hinnoissa oletetaan että autossa on 2–4 hlöä.
        </p>
      </div>

      <CurrencyConverter />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Budjettiarvio per alue</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {budgetByRegion.map((r) => (
            <article
              key={r.region}
              className="rounded-lg border border-(--color-border) bg-(--color-card) p-5"
            >
              <h3 className="text-lg font-semibold">{r.label}</h3>
              <p className="mt-1 text-sm text-(--color-muted)">
                Per päivä:{' '}
                <strong>{formatEUR(r.perDayEUR.low)}</strong> /{' '}
                <strong>{formatEUR(r.perDayEUR.mid)}</strong> /{' '}
                <strong>{formatEUR(r.perDayEUR.high)}</strong>
                <br />
                (edullinen / keskitaso / kallis)
              </p>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-(--color-muted)">
                    <th className="pb-2">Erä</th>
                    <th className="pb-2 text-right">Arvio</th>
                  </tr>
                </thead>
                <tbody>
                  {r.items.map((item, i) => (
                    <tr key={i} className="border-t border-(--color-border)">
                      <td className="py-2">
                        <div>{item.label}</div>
                        <div className="text-xs text-(--color-muted)">
                          {CATEGORY_FI[item.category]}
                          {item.note ? ` — ${item.note}` : ''}
                        </div>
                      </td>
                      <td className="py-2 text-right font-medium">
                        {formatEUR(item.estimateEUR)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
