'use client';

import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

/**
 * Theme switcher rendered in the Header (visible on mobile + desktop).
 *
 * Mirrors LanguageSwitcher's pattern — an outline icon button opening a
 * dropdown of System / Light / Dark, with a check on the active choice.
 *
 * The trigger shows both a sun and a moon; the `.dark` class that
 * next-themes sets on <html> *before paint* reveals the right one purely
 * via CSS. That sidesteps the usual mounted-flag dance, so there's no
 * hydration mismatch and no icon flash on first load.
 */
const OPTIONS = [
  { value: 'system', labelKey: 'system', Icon: Monitor },
  { value: 'light', labelKey: 'light', Icon: Sun },
  { value: 'dark', labelKey: 'dark', Icon: Moon },
] as const;

export default function ThemeToggle() {
  const t = useTranslations('components.themeToggle');
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label={t('label')}
          className="size-9 px-0 sm:size-8"
        >
          <Sun className="size-4 dark:hidden" aria-hidden />
          <Moon className="hidden size-4 dark:block" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {OPTIONS.map(({ value, labelKey, Icon }) => {
          const active = theme === value;
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className="cursor-pointer gap-2"
              aria-current={active ? 'true' : undefined}
            >
              <Icon className="size-4" aria-hidden />
              <span className={cn('flex-1', active && 'font-semibold')}>
                {t(labelKey)}
              </span>
              <Check className={cn('size-4', !active && 'opacity-0')} aria-hidden />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
