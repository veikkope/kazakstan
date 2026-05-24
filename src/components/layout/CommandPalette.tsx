'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  Calendar,
  Car,
  Heart,
  Home,
  Info,
  Map as MapIcon,
  MapPin,
  Route,
  Sun,
  Wallet,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { sights } from '@/data/sights';
import { regionMeta } from '@/data/categories';
import { excludeDrafts } from '@/lib/filters';
import { asLocale, localised } from '@/lib/i18n-helpers';
import { filterBySearch, matchesText, tokenizeQuery } from '@/lib/search';

type NavItem = {
  href: string;
  labelKey: string;
  /** Optional alternate strings searched alongside the visible label. */
  keywords?: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: '/', labelKey: 'nav.home', icon: Home },
  { href: '/today', labelKey: 'nav.today', icon: Sun },
  { href: '/map', labelKey: 'nav.map', icon: MapIcon },
  { href: '/sights', labelKey: 'nav.sights', icon: MapPin },
  { href: '/routes', labelKey: 'nav.routes', icon: Route },
  { href: '/itinerary', labelKey: 'nav.itinerary', icon: Calendar },
  { href: '/shortlist', labelKey: 'nav.shortlist', icon: Heart },
  {
    href: '/car-rental',
    labelKey: 'nav.carRental',
    keywords: ['caspi', 'autorent', 'auto', 'rental', 'aktau'],
    icon: Car,
  },
  { href: '/info', labelKey: 'nav.info', icon: Info },
  { href: '/budget', labelKey: 'nav.budget', icon: Wallet },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function isEditableTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const t = useTranslations();
  const loc = asLocale(useLocale());
  const router = useRouter();
  const [query, setQuery] = useState('');

  const verifiedSights = useMemo(() => excludeDrafts(sights), []);

  // cmdk's built-in filter is substring-only on each item's `value` prop.
  // We disable it (`shouldFilter={false}`) and run our own search lib so
  // the palette stays in lockstep with /nahtavyydet — same diacritic
  // handling, same fields indexed (incl. description + historicalContext).
  const tokens = useMemo(() => tokenizeQuery(query), [query]);

  const matchingSights = useMemo(
    () => filterBySearch(verifiedSights, query),
    [verifiedSights, query],
  );

  const localizedNavItems = useMemo(
    () => navItems.map((item) => ({ ...item, label: t(item.labelKey) })),
    [t],
  );

  const matchingNav = useMemo(() => {
    if (tokens.length === 0) return localizedNavItems;
    return localizedNavItems.filter((item) => {
      const haystack = [item.label, ...(item.keywords ?? [])].join(' ');
      return matchesText(haystack, tokens);
    });
  }, [tokens, localizedNavItems]);

  // Wrap onOpenChange so closing the palette always clears the query.
  // Doing this in the event-handler path (rather than a useEffect) keeps
  // the reset explicit and avoids React 19's set-state-in-effect rule —
  // every close goes through this wrapper (Cmd+K toggle, Escape, outside
  // click, item selection), so no leakage path exists.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) setQuery('');
      onOpenChange(next);
    },
    [onOpenChange],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (isEditableTarget(document.activeElement)) return;
        e.preventDefault();
        handleOpenChange(!open);
        return;
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        handleOpenChange(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, handleOpenChange]);

  function go(href: string) {
    handleOpenChange(false);
    router.push(href);
  }

  const queryActive = tokens.length > 0;
  const noMatches =
    queryActive && matchingNav.length === 0 && matchingSights.length === 0;

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={t('components.commandPalette.title')}
      description={t('components.commandPalette.description')}
      shouldFilter={false}
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder={t('components.commandPalette.placeholder')}
      />
      <CommandList>
        {/* cmdk only renders CommandEmpty when the user has typed AND no
            items render. With shouldFilter=false we control item rendering
            ourselves; hide groups when empty and surface our own empty
            state only when both groups are empty. */}
        {noMatches && (
          <CommandEmpty>
            {t('components.commandPalette.noResults', { query: query.trim() })}
          </CommandEmpty>
        )}
        {matchingNav.length > 0 && (
          <CommandGroup heading={t('components.commandPalette.pagesHeading')}>
            {matchingNav.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  value={item.href}
                  onSelect={() => go(item.href)}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
        {matchingSights.length > 0 && (
          <CommandGroup heading={t('components.commandPalette.sightsHeading')}>
            {matchingSights.map((sight) => (
              <CommandItem
                key={sight.id}
                value={sight.id}
                onSelect={() => go(`/sights/${sight.slug}`)}
              >
                <MapPin className="size-4 text-muted-foreground" />
                <span className="truncate">{localised(sight.name, loc)}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {localised(regionMeta[sight.region].label, loc)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
