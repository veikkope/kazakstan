import { getTranslations } from 'next-intl/server';
import { presets } from '@/data/presets';
import PresetCard from '@/components/presets/PresetCard';

export default async function ReititPage() {
  const t = await getTranslations();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t('pages.routes.title')}</h1>
        <p className="max-w-2xl text-muted-foreground">
          {t('pages.routes.intro')}
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
