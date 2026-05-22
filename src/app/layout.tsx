import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import OfflineBanner from '@/components/layout/OfflineBanner';
import ServiceWorkerRegistration from '@/components/layout/ServiceWorkerRegistration';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import MotionProvider from '@/components/layout/MotionProvider';
import ShortlistUrlSync from '@/components/shortlist/ShortlistUrlSync';

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
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
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
            <Toaster position="bottom-center" richColors closeButton />
          </MotionProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
