'use client';

import { Link } from '@/i18n/navigation';
import { Clock, Dumbbell, Wallet, Car, Compass } from 'lucide-react';
import { m } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { categoryMeta, regionMeta } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Sight } from '@/lib/types';
import ShortlistButton from './ShortlistButton';
import OverallStars from './OverallStars';
import SightImage from './SightImage';

/**
 * Layout note — the card uses a stretched-link pattern:
 *   - the image and attribution chip render outside the <Link>,
 *   - the title <Link> has an absolutely-positioned ::after pseudo-element that
 *     extends the click target across the whole card,
 *   - z-indexed children (attribution chip, shortlist button) opt out of the
 *     stretched target so they remain individually clickable.
 *
 * This avoids the nested-anchor HTML violation that would occur if the image
 * lived inside the Link (the attribution chip is itself an <a>).
 *
 * Motion note — the outer wrapper is an `m.div` so the card can participate
 * in stagger variants from the parent grid (NahtavyydetPage uses
 * `staggerChildren`). The `m.div` matches the original `<Card>` element type
 * (div) so semantics and the stretched-link absolute positioning don't shift.
 * Hover-lift is pure CSS (no resting shadow — see CLAUDE.md outdoor readability).
 */
const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
};

export default function SightCard({ sight }: { sight: Sight }) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const cat = categoryMeta[sight.category];
  const region = regionMeta[sight.region];
  const sightName = localised(sight.name, loc);

  return (
    <m.div variants={cardVariants}>
      <Card className="group relative gap-0 py-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-foreground/8">
        <SightImage
          sight={sight}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <CardContent className="p-4">
          <div className="flex items-center gap-2 pr-12">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide text-white"
              style={{ backgroundColor: cat.color }}
            >
              {cat.emoji} {localised(cat.label, loc)}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-semibold">
            <Link
              href={`/sights/${sight.slug}`}
              className="text-(--color-fg) after:absolute after:inset-0 after:content-[''] hover:no-underline"
            >
              {sightName}
            </Link>
          </h3>
          {sight.ratings && (
            <div className="mt-1">
              <OverallStars ratings={sight.ratings} />
            </div>
          )}
          <p className="mt-1 text-xs text-(--color-muted)">{localised(region.label, loc)}</p>
          <p className="mt-2 text-sm text-(--color-muted)">{localised(sight.shortDescription, loc)}</p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-(--color-muted)">
            {sight.timeNeededHours !== undefined && (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden /> {t('components.sightCard.hours', { count: sight.timeNeededHours })}
              </span>
            )}
            {sight.difficulty && (
              <span className="inline-flex items-center gap-1">
                <Dumbbell className="size-3" aria-hidden /> {difficultyFi(t, sight.difficulty)}
              </span>
            )}
            {sight.budgetLevel && (
              <span className="inline-flex items-center gap-1">
                <Wallet className="size-3" aria-hidden /> {budgetFi(t, sight.budgetLevel)}
              </span>
            )}
            {sight.needsCar && (
              <span className="inline-flex items-center gap-1">
                <Car className="size-3" aria-hidden /> {t('components.sightCard.car')}
              </span>
            )}
            {sight.needsGuide && (
              <span className="inline-flex items-center gap-1">
                <Compass className="size-3" aria-hidden /> {t('components.sightCard.guide')}
              </span>
            )}
          </div>
        </CardContent>
        <div className="absolute right-3 top-3 z-10">
          <ShortlistButton sightId={sight.id} sightName={sightName} />
        </div>
      </Card>
    </m.div>
  );
}

type Translator = ReturnType<typeof useTranslations>;

function difficultyFi(t: Translator, d: 'easy' | 'moderate' | 'hard'): string {
  return d === 'easy'
    ? t('components.sightCard.difficultyEasy')
    : d === 'moderate'
      ? t('components.sightCard.difficultyModerate')
      : t('components.sightCard.difficultyHard');
}

function budgetFi(t: Translator, b: 'low' | 'mid' | 'high'): string {
  return b === 'low'
    ? t('components.sightCard.budgetLow')
    : b === 'mid'
      ? t('components.sightCard.budgetMid')
      : t('components.sightCard.budgetHigh');
}
