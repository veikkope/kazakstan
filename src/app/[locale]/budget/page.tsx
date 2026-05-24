import { getLocale, getTranslations } from 'next-intl/server';
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
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { BudgetCategory } from '@/lib/types';

export default async function BudjettiPage() {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());

  const categoryLabels: Record<BudgetCategory, string> = {
    flights: t('pages.budget.categoryFlights'),
    lodging: t('pages.budget.categoryLodging'),
    food: t('pages.budget.categoryFood'),
    transport: t('pages.budget.categoryTransport'),
    activities: t('pages.budget.categoryActivities'),
    misc: t('pages.budget.categoryMisc'),
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t('pages.budget.title')}</h1>
        <p className="max-w-2xl text-muted-foreground">
          {t('pages.budget.intro')}
        </p>
      </div>

      <CurrencyConverter />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          {t('pages.budget.estimatesHeading')}
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {budgetByRegion.map((r) => (
            <Card key={r.region}>
              <CardHeader>
                <CardTitle className="text-lg">{localised(r.label, loc)}</CardTitle>
                <CardDescription>
                  {t('pages.budget.perDayLabel')}{' '}
                  <strong className="text-foreground">{formatEUR(r.perDayEUR.low)}</strong> /{' '}
                  <strong className="text-foreground">{formatEUR(r.perDayEUR.mid)}</strong> /{' '}
                  <strong className="text-foreground">{formatEUR(r.perDayEUR.high)}</strong>
                  <br />
                  {t('pages.budget.tiersLabel')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="pb-2">{t('pages.budget.tableItem')}</th>
                      <th className="pb-2 text-right">{t('pages.budget.tableEstimate')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.items.map((item, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="py-2">
                          <div>{localised(item.label, loc)}</div>
                          <div className="text-xs text-muted-foreground">
                            {categoryLabels[item.category]}
                            {item.note ? ` — ${localised(item.note, loc)}` : ''}
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
