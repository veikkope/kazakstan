'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

/**
 * App-wide theme provider (next-themes).
 *
 * - `attribute="class"` → toggles `.dark` on <html>, which our CSS tokens
 *   key off (see globals.css). Pairs with `suppressHydrationWarning` on the
 *   <html> element so the class injected before hydration doesn't warn.
 * - `defaultTheme="system"` + `enableSystem` → first visit follows the OS;
 *   an explicit choice is remembered in localStorage.
 * - `disableTransitionOnChange` → prevents a colour-transition flash when
 *   switching themes.
 */
export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
