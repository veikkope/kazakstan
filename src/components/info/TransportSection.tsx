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
          <div
            key={s.title}
            className="rounded-lg border border-(--color-border) bg-(--color-card) p-4"
          >
            <h3 className="mb-2 font-semibold">{s.title}</h3>
            <p className="text-sm text-(--color-fg)">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
