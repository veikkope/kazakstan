'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Navigation, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { Coords, Region } from '@/lib/types';
import {
  buildNavigatorRouteUrl,
  NAVIGATOR_META,
  type NavigatorId,
  type RoutePoint,
} from '@/lib/route';
import { hapticTap } from '@/lib/haptic';
import { cn } from '@/lib/utils';

interface BaseProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  /** Override visible trigger text. Default: "Avaa navigaattori". */
  triggerText?: string;
  /** Hide the chevron on the trigger (e.g., when used as an icon button). */
  hideChevron?: boolean;
  /** DropdownMenu alignment on desktop. */
  align?: 'start' | 'center' | 'end';
  /** Region used by 2GIS to pick the correct city subdomain. */
  region?: Region;
  /** Disable the trigger button (e.g., no points selected yet). */
  disabled?: boolean;
}

/**
 * Caller must supply EITHER `coords` (single destination) OR `points`
 * (pre-ordered multi-stop route). The discriminated union prevents passing
 * both — the underlying URL builders treat them differently.
 */
type NavigateMenuProps = BaseProps &
  (
    | {
        coords: Coords;
        label?: string;
        points?: never;
      }
    | {
        points: readonly RoutePoint[];
        coords?: never;
        label?: never;
      }
  );

interface MapOptionDisplay {
  id: NavigatorId;
  name: string;
  subtitle: string;
  /** Tailwind color used for the dot beside the label. */
  accent: string;
  Icon: LucideIcon;
}

interface RowProps {
  display: MapOptionDisplay;
  subtitle: string;
  href: string;
  onSelect: () => void;
}

function MobileRow({ display, subtitle, href, onSelect }: RowProps) {
  const { name, accent, Icon } = display;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onSelect}
      className="-mx-4 flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
    >
      <span
        aria-hidden
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full text-white',
          accent,
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-tight text-foreground">
          {name}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
          {subtitle}
        </span>
      </span>
      <span aria-hidden className="text-muted-foreground">
        →
      </span>
    </a>
  );
}

function DesktopRow({ display, subtitle, href, onSelect }: RowProps) {
  const { name, accent, Icon } = display;
  return (
    <DropdownMenuItem asChild>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSelect}
        className="cursor-pointer gap-2.5 py-2"
      >
        <span
          aria-hidden
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full text-white',
            accent,
          )}
        >
          <Icon className="size-3" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium leading-tight">{name}</span>
          <span className="block text-[11px] leading-tight text-muted-foreground">
            {subtitle}
          </span>
        </span>
      </a>
    </DropdownMenuItem>
  );
}

export default function NavigateMenu(props: NavigateMenuProps) {
  const t = useTranslations();
  const {
    variant = 'default',
    size = 'default',
    className,
    triggerText = t('components.navigateMenu.openNavigator'),
    hideChevron = false,
    align = 'end',
    region,
    disabled = false,
  } = props;

  const [sheetOpen, setSheetOpen] = useState(false);

  /**
   * Display metadata for each navigator. URL building lives in `route.ts` so a
   * single set of grammar rules is shared between single-point and multi-stop
   * call sites; this list only owns visuals + subtitles.
   */
  const MAP_OPTIONS_DISPLAY: readonly MapOptionDisplay[] = useMemo(
    () => [
      {
        id: 'google',
        name: 'Google Maps',
        subtitle: t('components.navigateMenu.googleSubtitle'),
        accent: 'bg-emerald-500',
        Icon: Navigation,
      },
      {
        id: '2gis',
        name: '2GIS',
        subtitle: t('components.navigateMenu.twoGisSubtitle'),
        accent: 'bg-lime-500',
        Icon: Navigation,
      },
      {
        id: 'yandex',
        name: 'Yandex Maps',
        subtitle: t('components.navigateMenu.yandexSubtitle'),
        accent: 'bg-amber-500',
        Icon: Navigation,
      },
      {
        id: 'apple',
        name: 'Apple Maps',
        subtitle: t('components.navigateMenu.appleSubtitle'),
        accent: 'bg-slate-500',
        Icon: Navigation,
      },
    ],
    [t],
  );

  // Normalise call site shape: single-coord usage becomes a 1-point route so
  // the rest of the component only deals with `RoutePoint[]`.
  const points: readonly RoutePoint[] = useMemo(() => {
    if ('points' in props && props.points) return props.points;
    if ('coords' in props && props.coords) {
      const label =
        'label' in props && typeof props.label === 'string' ? props.label : '';
      return [{ id: 'destination', coords: props.coords, label }];
    }
    return [];
  }, [props]);

  const isMultiStop = points.length > 1;

  const items = useMemo(() => {
    if (points.length === 0) return [];
    return MAP_OPTIONS_DISPLAY.map((display) => {
      const meta = NAVIGATOR_META[display.id];
      const subtitle =
        isMultiStop && !meta.fullMultiStop
          ? t('components.navigateMenu.firstStopOnly')
          : display.subtitle;
      return {
        display,
        subtitle,
        href: buildNavigatorRouteUrl(display.id, points, { region }),
      };
    });
  }, [points, region, isMultiStop, MAP_OPTIONS_DISPLAY, t]);

  // Pre-compose header copy so mobile + desktop stay in sync.
  const headerTitle = isMultiStop
    ? t('components.navigateMenu.headerTitleMulti', { count: points.length })
    : t('components.navigateMenu.openNavigator');
  const headerDescription = isMultiStop
    ? t('components.navigateMenu.headerDescriptionMulti')
    : points[0]?.label
      ? t('components.navigateMenu.headerDescriptionSingleWithLabel', {
          label: points[0].label,
        })
      : t('components.navigateMenu.headerDescriptionSingle');
  const desktopLabel = isMultiStop
    ? t('components.navigateMenu.desktopLabelMulti', { count: points.length })
    : t('components.navigateMenu.desktopLabelSingle');

  const triggerDisabled = disabled || points.length === 0;

  // Two triggers rendered, visibility toggled by viewport. Both wrap the
  // same Button so styling stays in sync. Sheet for mobile (big tap
  // targets, bottom-anchored), DropdownMenu for desktop (compact popover).
  return (
    <>
      {/* Mobile — bottom sheet.
          modal={false} disables Radix's body scroll lock and focus trap so
          the user can keep scrolling/interacting with the page behind the
          sheet. The sheet still dismisses on outside click. */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} modal={false}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant={variant}
            size={size}
            disabled={triggerDisabled}
            className={cn('md:hidden', className)}
            aria-label={triggerText}
          >
            <Navigation aria-hidden />
            {size !== 'icon' && <span>{triggerText}</span>}
            {!hideChevron && size !== 'icon' && (
              <ChevronDown aria-hidden className="opacity-70" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="rounded-t-xl px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-2"
        >
          <div
            aria-hidden
            className="mx-auto mt-1 mb-1 h-1 w-10 rounded-full bg-border"
          />
          <SheetHeader className="px-0 pt-1 pb-2">
            <SheetTitle>{headerTitle}</SheetTitle>
            <SheetDescription>{headerDescription}</SheetDescription>
          </SheetHeader>
          <div className="divide-y divide-border">
            {items.map(({ display, subtitle, href }) => (
              <MobileRow
                key={display.id}
                display={display}
                subtitle={subtitle}
                href={href}
                onSelect={() => {
                  // Haptic confirms the external-app hand-off before the OS
                  // chrome (app picker, deep link) takes over the viewport.
                  hapticTap();
                  setSheetOpen(false);
                }}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop — compact dropdown.
          modal={false} keeps the rest of the page interactive (including
          wheel scroll over the article behind the menu). */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant={variant}
            size={size}
            disabled={triggerDisabled}
            className={cn('hidden md:inline-flex', className)}
            aria-label={triggerText}
          >
            <Navigation aria-hidden />
            {size !== 'icon' && <span>{triggerText}</span>}
            {!hideChevron && size !== 'icon' && (
              <ChevronDown aria-hidden className="opacity-70" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-72">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
            {desktopLabel}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map(({ display, subtitle, href }) => (
            <DesktopRow
              key={display.id}
              display={display}
              subtitle={subtitle}
              href={href}
              onSelect={() => {
                /* Radix closes on item activate */
              }}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
