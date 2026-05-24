'use client';

import { useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transportSections } from '@/data/practical';
import { asLocale, localised } from '@/lib/i18n-helpers';

export default function TransportSection() {
  const loc = asLocale(useLocale());
  const sections = [
    transportSections.flights,
    transportSections.trains,
    transportSections.cars,
    transportSections.local,
  ];
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Liikkuminen maan sisällä</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => {
          const title = localised(s.title, loc);
          return (
            <Card key={title} size="sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-fg)">{localised(s.body, loc)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
