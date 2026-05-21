import CurrencyConverter from '@/components/budget/CurrencyConverter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
        <p className="max-w-2xl text-muted-foreground">
          Arviot per alue ja kategoria. Hinnat henkilöä kohden ellei toisin mainittu.
          Mangystaun hinnoissa oletetaan että autossa on 2–4 hlöä.
        </p>
      </div>

      <CurrencyConverter />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Budjettiarvio per alue</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {budgetByRegion.map((r) => (
            <Card key={r.region}>
              <CardHeader>
                <CardTitle className="text-lg">{r.label}</CardTitle>
                <CardDescription>
                  Per päivä:{' '}
                  <strong className="text-foreground">{formatEUR(r.perDayEUR.low)}</strong> /{' '}
                  <strong className="text-foreground">{formatEUR(r.perDayEUR.mid)}</strong> /{' '}
                  <strong className="text-foreground">{formatEUR(r.perDayEUR.high)}</strong>
                  <br />
                  (edullinen / keskitaso / kallis)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="pb-2">Erä</th>
                      <th className="pb-2 text-right">Arvio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.items.map((item, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="py-2">
                          <div>{item.label}</div>
                          <div className="text-xs text-muted-foreground">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
