import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Preset } from '@/lib/types';
import { formatEUR } from '@/lib/currency';

export default function PresetCard({ preset }: { preset: Preset }) {
  const themeLabel =
    preset.theme === 'nature'
      ? '🏔️ Luonto'
      : preset.theme === 'culture'
        ? '🕌 Kulttuuri'
        : '🚗 Roadtrip';

  return (
    <Card className="group relative h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-foreground/8">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="uppercase tracking-wide">
            {themeLabel}
          </Badge>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {preset.durationDays} päivää
          </span>
        </div>
        <CardTitle className="mt-2 text-xl">
          <Link
            href={`/reitit/${preset.id}`}
            className="text-foreground after:absolute after:inset-0 after:content-[''] hover:no-underline"
          >
            {preset.title}
          </Link>
        </CardTitle>
        <CardDescription>{preset.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          <span className="text-muted-foreground">Kenelle: </span>
          <span className="text-foreground">{preset.whoFor}</span>
        </p>
        <ul className="space-y-1 text-sm">
          {preset.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="text-foreground">
              • {h}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          Budjettiarvio: {formatEUR(preset.estimatedBudgetEUR.low)} —{' '}
          {formatEUR(preset.estimatedBudgetEUR.mid)} / hlö
        </p>
      </CardContent>
    </Card>
  );
}
