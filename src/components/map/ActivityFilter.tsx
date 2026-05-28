'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { activityMeta, allActivities } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Activity } from '@/lib/types';

interface Props {
  value: Activity[];
  onChange: (next: Activity[]) => void;
  /**
   * Layout mode for the chip row. Mirrors CategoryFilter so the two
   * components can sit side-by-side in the same flex container without
   * either of them re-flowing differently from the other.
   */
  layout?: 'scroll' | 'wrap';
}

/**
 * Chip row for activity tags (currently just `hike`). Visually identical
 * to CategoryFilter but tracks an orthogonal URL slice (`act=`), since
 * activity is a cross-cutting tag independent of category. ANDed with
 * the category filter at the call site: "Vaellus + Luonto" narrows to
 * sights that are both hikes and in the nature category, not the union.
 *
 * Empty selection = "no activity filter applied" — the chip renders as
 * inactive outline, unlike CategoryFilter where empty means "show all"
 * and chips render as if all are on. The semantics differ because an
 * activity filter is opt-in: most users browse without one.
 */
export default function ActivityFilter({ value, onChange, layout = 'scroll' }: Props) {
  const loc = asLocale(useLocale());
  const active = new Set(value);

  function toggle(act: Activity) {
    if (active.has(act)) {
      onChange(value.filter((a) => a !== act));
    } else {
      onChange([...value, act]);
    }
  }

  const layoutClass =
    layout === 'wrap'
      ? 'flex flex-wrap items-center gap-2'
      : 'flex flex-nowrap items-center gap-2 sm:flex-wrap';

  return (
    <div className={layoutClass}>
      {allActivities.map((act) => {
        const meta = activityMeta[act];
        const isOn = active.has(act);
        return (
          <Button
            key={act}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toggle(act)}
            aria-pressed={isOn}
            className={`min-h-11 shrink-0 rounded-full px-4 ${
              isOn
                ? 'border-transparent text-white'
                : 'text-(--color-muted)'
            }`}
            style={isOn ? { backgroundColor: meta.color } : undefined}
          >
            {meta.emoji} {localised(meta.label, loc)}
          </Button>
        );
      })}
    </div>
  );
}
