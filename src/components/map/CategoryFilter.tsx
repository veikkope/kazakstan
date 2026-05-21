'use client';

import { Button } from '@/components/ui/button';
import { allCategories, categoryMeta } from '@/data/categories';
import type { Category } from '@/lib/types';

interface Props {
  value: Category[];
  onChange: (next: Category[]) => void;
}

export default function CategoryFilter({ value, onChange }: Props) {
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

  return (
    // flex-nowrap on mobile keeps the chips on one row so the parent
    // overflow-x-auto wrapper can scroll them horizontally. Desktop
    // reverts to wrapping so chips reflow inside the page column.
    <div className="flex flex-nowrap items-center gap-2 sm:flex-wrap">
      <Button
        type="button"
        variant={isAllShown ? 'default' : 'outline'}
        size="sm"
        onClick={showAll}
        aria-pressed={isAllShown}
        className="min-h-11 shrink-0 rounded-full px-4"
      >
        Kaikki
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
            {meta.emoji} {meta.fi}
          </Button>
        );
      })}
    </div>
  );
}
