import { presets } from '@/data/presets';
import PresetCard from '@/components/presets/PresetCard';

export default function ReititPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Valmiit reittirungot</h1>
        <p className="max-w-2xl text-(--color-muted)">
          Kolme erilaista lähtökohtaa: yksi luontoon, yksi kaupunkeihin ja yksi pidempi
          roadtrip. Valitse runko ja muokkaa siitä oma reittisi.
        </p>
      </div>

      <ul className="grid gap-4 lg:grid-cols-3">
        {presets.map((p) => (
          <li key={p.id}>
            <PresetCard preset={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
