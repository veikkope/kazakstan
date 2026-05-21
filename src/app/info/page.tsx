import VisaCard from '@/components/info/VisaCard';
import BeforeTripChecklist from '@/components/info/BeforeTripChecklist';
import TransportSection from '@/components/info/TransportSection';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { languageBasics, safetyNotes } from '@/data/practical';

export default function InfoPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Käytännön info</h1>
        <p className="max-w-2xl text-muted-foreground">
          Viisumi, ennen lähtöä -checklist, kuljetukset, kieli ja turvallisuus.
        </p>
      </div>

      <VisaCard />

      <BeforeTripChecklist />

      <TransportSection />

      <Separator />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Kieli</h2>
        <p className="text-sm text-muted-foreground">{languageBasics.notes}</p>
        <p className="text-sm text-muted-foreground">{languageBasics.alphabet}</p>
        <Card className="py-0">
          <CardContent className="overflow-x-auto px-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-3">Suomi</th>
                  <th className="p-3">Kazakki</th>
                  <th className="p-3">Venäjä</th>
                </tr>
              </thead>
              <tbody>
                {languageBasics.greetings.map((row) => (
                  <tr key={row.fi} className="border-b border-border last:border-b-0">
                    <td className="p-3 font-medium">{row.fi}</td>
                    <td className="p-3 text-muted-foreground">{row.kk}</td>
                    <td className="p-3 text-muted-foreground">{row.ru}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Turvallisuus — mitä se tarkoittaa käytännössä</h2>
        <ul className="space-y-2 text-sm">
          {safetyNotes.map((note, i) => (
            <li
              key={i}
              className="rounded-md border-l-4 border-(--color-sand-dark) bg-card p-3 text-card-foreground ring-1 ring-foreground/10"
            >
              {note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
