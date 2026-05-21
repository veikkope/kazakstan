import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transportSections } from '@/data/practical';

export default function TransportSection() {
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
        {sections.map((s) => (
          <Card key={s.title} size="sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-(--color-fg)">{s.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
