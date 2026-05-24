'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { allCategories, categoryMeta } from '@/data/categories';
import { asLocale, localised } from '@/lib/i18n-helpers';
import type { Category } from '@/lib/types';

interface Props {
  value: Category[];
  onChange: (next: Category[]) => void;
  /**
   * Layout mode for the chip row.
   * - `scroll` (default): mobile-nowrap inside an `overflow-x-auto` parent
   *   (used by the kartta map overlay where vertical space is precious).
   * - `wrap`: chips reflow onto multiple rows. Use inside sheets / generous
   *   containers where horizontal scroll would be hostile UX.
   */
  layout?: 'scroll' | 'wrap';
}

export default function CategoryFilter({ value, onChange, layout = 'scroll' }: Props) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const active = new Set(value);
  // Empty value means "show all" — render all chips as active for clarity.
  const isAllShown = value.length === 0;

  function toggle(cat: Category) {
    if (isAllShown) {
      // Start filtering: keep only this one.
      onChange([cat]);
      return;
    }
    if (active.has(cat)) {
      const next = value.filter((c) => c !== cat);
      // If user toggled off the last one, fall back to "show all".
      onChange(next);
    } else {
      onChange([...value, cat]);
    }
  }

  function showAll() {
    onChange([]);
  }

  const layoutClass =
    layout === 'wrap'
      ? 'flex flex-wrap items-center gap-2'
      : 'flex flex-nowrap items-center gap-2 sm:flex-wrap';

  return (
    <div className={layoutClass}>
      <Button
        type="button"
        variant={isAllShown ? 'default' : 'outline'}
        size="sm"
        onClick={showAll}
        aria-pressed={isAllShown}
        className="min-h-11 shrink-0 rounded-full px-4"
      >
        {t('components.categoryFilter.all')}
      </Button>
      {allCategories.map((cat) => {
        const meta = categoryMeta[cat];
        const isOn = isAllShown || active.has(cat);
        return (
          <Button
            key={cat}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toggle(cat)}
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
