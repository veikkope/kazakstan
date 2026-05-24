import { getLocale } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { visaInfo } from '@/data/practical';
import { asLocale, localised } from '@/lib/i18n-helpers';

export default async function VisaCard() {
  const loc = asLocale(await getLocale());
  return (
    <Card className="border-2 border-(--color-steppe) py-6">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-(--color-muted)">Viisumi</p>
            <h2 className="mt-1 text-2xl font-semibold">
              🇫🇮 → 🇰🇿 viisumivapaa {visaInfo.visaFreeDays} päivää
            </h2>
          </div>
          <Badge
            className="bg-(--color-accent) text-white uppercase tracking-wide"
            aria-label="Viisumitilanne OK"
          >
            OK
          </Badge>
        </div>
        <p className="mt-3 text-(--color-fg)">{localised(visaInfo.notes, loc)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-(--color-muted)">
            Viimeksi tarkistettu: <strong>{visaInfo.lastVerified}</strong>
          </span>
          {visaInfo.sourceUrl && (
            <a
              href={visaInfo.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-(--color-steppe)"
            >
              Tarkista uusin tilanne ↗
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
