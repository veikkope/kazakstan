'use client';

import Link from 'next/link';
import { Clock, Dumbbell, Wallet, Car, Compass } from 'lucide-react';
import { m } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categoryMeta, regionMeta } from '@/data/categories';
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
  const cat = categoryMeta[sight.category];
  const region = regionMeta[sight.region];

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
              {cat.emoji} {cat.fi}
            </span>
            {sight.status === 'draft' && (
              <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                Luonnos
              </Badge>
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold">
            <Link
              href={`/nahtavyydet/${sight.slug}`}
              className="text-(--color-fg) after:absolute after:inset-0 after:content-[''] hover:no-underline"
            >
              {sight.name}
            </Link>
          </h3>
          {sight.ratings && (
            <div className="mt-1">
              <OverallStars ratings={sight.ratings} />
            </div>
          )}
          <p className="mt-1 text-xs text-(--color-muted)">{region.fi}</p>
          <p className="mt-2 text-sm text-(--color-muted)">{sight.shortDescription}</p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-(--color-muted)">
            {sight.timeNeededHours !== undefined && (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden /> {sight.timeNeededHours} h
              </span>
            )}
            {sight.difficulty && (
              <span className="inline-flex items-center gap-1">
                <Dumbbell className="size-3" aria-hidden /> {difficultyFi(sight.difficulty)}
              </span>
            )}
            {sight.budgetLevel && (
              <span className="inline-flex items-center gap-1">
                <Wallet className="size-3" aria-hidden /> {budgetFi(sight.budgetLevel)}
              </span>
            )}
            {sight.needsCar && (
              <span className="inline-flex items-center gap-1">
                <Car className="size-3" aria-hidden /> auto
              </span>
            )}
            {sight.needsGuide && (
              <span className="inline-flex items-center gap-1">
                <Compass className="size-3" aria-hidden /> opas
              </span>
            )}
          </div>
        </CardContent>
        <div className="absolute right-3 top-3 z-10">
          <ShortlistButton sightId={sight.id} sightName={sight.name} />
        </div>
      </Card>
    </m.div>
  );
}

function difficultyFi(d: 'easy' | 'moderate' | 'hard'): string {
  return d === 'easy' ? 'helppo' : d === 'moderate' ? 'keskitaso' : 'vaativa';
}

function budgetFi(b: 'low' | 'mid' | 'high'): string {
  return b === 'low' ? 'edullinen' : b === 'mid' ? 'keskitaso' : 'kallis';
}
