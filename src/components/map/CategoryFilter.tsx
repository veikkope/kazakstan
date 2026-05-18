'use client';

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
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={showAll}
        className={`rounded-full border px-3 py-1 text-xs ${
          isAllShown
            ? 'border-(--color-fg) bg-(--color-fg) text-white'
            : 'border-(--color-border) bg-(--color-card)'
        }`}
      >
        Kaikki
      </button>
      {allCategories.map((cat) => {
        const meta = categoryMeta[cat];
        const isOn = isAllShown || active.has(cat);
        return (
          <button
            key={cat}
            type="button"
            onClick={() => toggle(cat)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              isOn
                ? 'border-transparent text-white'
                : 'border-(--color-border) bg-(--color-card) text-(--color-muted)'
            }`}
            style={isOn ? { backgroundColor: meta.color } : undefined}
          >
            {meta.emoji} {meta.fi}
          </button>
        );
      })}
    </div>
  );
}
