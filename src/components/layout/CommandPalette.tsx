'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
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

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Etusivu', icon: Home },
  { href: '/tanaan', label: 'Tänään', icon: Sun },
  { href: '/kartta', label: 'Kartta', icon: MapIcon },
  { href: '/nahtavyydet', label: 'Nähtävyydet', icon: MapPin },
  { href: '/reitit', label: 'Valmiit reitit', icon: Route },
  { href: '/reittisuunnitelma', label: 'Reittisuunnitelma', icon: Calendar },
  { href: '/shortlist', label: 'Shortlist', icon: Heart },
  { href: '/info', label: 'Info', icon: Info },
  { href: '/budjetti', label: 'Budjetti', icon: Wallet },
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
  const router = useRouter();

  const visibleSights = useMemo(() => excludeDrafts(sights), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (isEditableTarget(document.activeElement)) return;
        e.preventDefault();
        onOpenChange(!open);
        return;
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  function go(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Komentopaletti"
      description="Etsi nähtävyyksiä ja navigoi sivulta toiselle"
    >
      <CommandInput placeholder="Etsi nähtävyyksiä, sivuja, reittejä..." />
      <CommandList>
        <CommandEmpty>Ei tuloksia.</CommandEmpty>
        <CommandGroup heading="Sivut">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.href}
                value={`${item.label} ${item.href}`}
                onSelect={() => go(item.href)}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Nähtävyydet">
          {visibleSights.map((sight) => (
            <CommandItem
              key={sight.id}
              value={`${sight.name} ${sight.nameLocal ?? ''} ${regionMeta[sight.region].fi}`}
              onSelect={() => go(`/nahtavyydet/${sight.slug}`)}
            >
              <MapPin className="size-4 text-muted-foreground" />
              <span className="truncate">{sight.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {regionMeta[sight.region].fi}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
