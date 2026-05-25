import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import OfflineBanner from '@/components/layout/OfflineBanner';
import ServiceWorkerRegistration from '@/components/layout/ServiceWorkerRegistration';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import MotionProvider from '@/components/layout/MotionProvider';
import ThemeProvider from '@/components/layout/ThemeProvider';
import OfflineProvider from '@/components/offline/OfflineProvider';
import ShortlistUrlSync from '@/components/shortlist/ShortlistUrlSync';
import { routing } from '@/i18n/routing';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kazakstan-reissun suunnittelu',
  description:
    'Henkilökohtainen suunnittelutyökalu reissuun Kazakstaniin — kartta, valmiit reitit, käytännön info ja budjetti.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Kazakstan',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kazakstan',
  },
  icons: {
    icon: [{ url: '/icons/icon.svg', type: 'image/svg+xml' }],
    apple: '/icons/icon.svg',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Tint the mobile browser chrome to match the active OS colour scheme.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#14161d' },
  ],
};

/**
 * Pre-render all supported locales at build time. Next.js needs this to
 * statically generate the `[locale]/*` routes; without it the proxy
 * still works but pages would be on-demand SSR'd, hurting cold-start.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Reject unknown locales early — the proxy should redirect first, but
  // hand-crafted URLs (e.g. `/xx/map`) shouldn't crash the layout.
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required for static rendering — tells next-intl which locale this
  // request belongs to before any server component reads translations.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <NextIntlClientProvider>
            <OfflineProvider>
              <TooltipProvider delayDuration={150}>
                <MotionProvider>
                  <ServiceWorkerRegistration />
                  <ShortlistUrlSync />
                  <Header />
                  <OfflineBanner />
                  <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 sm:pb-6">
                    {children}
                  </main>
                  <Footer />
                  <BottomNav />
                  <Toaster position="bottom-right" richColors closeButton />
                </MotionProvider>
              </TooltipProvider>
            </OfflineProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
