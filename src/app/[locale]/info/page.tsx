import { getLocale, getTranslations } from 'next-intl/server';
import VisaCard from '@/components/info/VisaCard';
import BeforeTripChecklist from '@/components/info/BeforeTripChecklist';
import TransportSection from '@/components/info/TransportSection';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { languageBasics, safetyNotes } from '@/data/practical';
import { asLocale, localised } from '@/lib/i18n-helpers';

export default async function InfoPage() {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t('pages.info.title')}</h1>
        <p className="max-w-2xl text-muted-foreground">
          {t('pages.info.intro')}
        </p>
      </div>

      <VisaCard />

      <BeforeTripChecklist />

      <TransportSection />

      <Separator />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t('pages.info.languageHeading')}</h2>
        <p className="text-sm text-muted-foreground">{localised(languageBasics.notes, loc)}</p>
        <p className="text-sm text-muted-foreground">{localised(languageBasics.alphabet, loc)}</p>
        <Card className="py-0">
          <CardContent className="overflow-x-auto px-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-3">{t('pages.info.languageColFi')}</th>
                  <th className="p-3">{t('pages.info.languageColKk')}</th>
                  <th className="p-3">{t('pages.info.languageColRu')}</th>
                </tr>
              </thead>
              <tbody>
                {languageBasics.greetings.map((row) => {
                  const fi = localised(row.fi, loc);
                  return (
                    <tr key={fi} className="border-b border-border last:border-b-0">
                      <td className="p-3 font-medium">{fi}</td>
                      <td className="p-3 text-muted-foreground">{row.kk}</td>
                      <td className="p-3 text-muted-foreground">{row.ru}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t('pages.info.safetyHeading')}</h2>
        <ul className="space-y-2 text-sm">
          {safetyNotes.map((note, i) => (
            <li
              key={i}
              className="rounded-md border-l-4 border-(--color-sand-dark) bg-card p-3 text-card-foreground ring-1 ring-foreground/10"
            >
              {localised(note, loc)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
