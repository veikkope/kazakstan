import { getLocale, getTranslations } from 'next-intl/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Preset } from '@/lib/types';
import { Link } from '@/i18n/navigation';
import { formatEUR } from '@/lib/currency';
import { asLocale, localised } from '@/lib/i18n-helpers';

export default async function PresetCard({ preset }: { preset: Preset }) {
  const t = await getTranslations();
  const loc = asLocale(await getLocale());
  const themeLabel =
    preset.theme === 'nature'
      ? t('components.presetCard.themeNature')
      : preset.theme === 'culture'
        ? t('components.presetCard.themeCulture')
        : t('components.presetCard.themeRoadtrip');

  return (
    <Card className="group relative h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-foreground/8">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="uppercase tracking-wide">
            {themeLabel}
          </Badge>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {t('components.presetCard.durationDays', { count: preset.durationDays })}
          </span>
        </div>
        <CardTitle className="mt-2 text-xl">
          <Link
            href={`/routes/${preset.id}`}
            className="text-foreground after:absolute after:inset-0 after:content-[''] hover:no-underline"
          >
            {localised(preset.title, loc)}
          </Link>
        </CardTitle>
        <CardDescription>{localised(preset.shortDescription, loc)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          <span className="text-muted-foreground">{t('components.presetCard.whoForLabel')} </span>
          <span className="text-foreground">{localised(preset.whoFor, loc)}</span>
        </p>
        <ul className="space-y-1 text-sm">
          {preset.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="text-foreground">
              • {localised(h, loc)}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          {t('components.presetCard.budgetLabel')} {formatEUR(preset.estimatedBudgetEUR.low)} —{' '}
          {formatEUR(preset.estimatedBudgetEUR.mid)} {t('components.presetCard.perPerson')}
        </p>
      </CardContent>
    </Card>
  );
}
