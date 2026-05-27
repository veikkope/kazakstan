import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Sight images are mostly self-hosted in public/images/sights/ to avoid
// Wikimedia rate limiting on Next.js Image optimizer upstream fetches.
// Some sights use direct upload.wikimedia.org URLs — those are allowed
// via remotePatterns here.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
      },
    ],
  },
  // Type-safe Link href across all locale-prefixed routes. Catches
  // hand-written hrefs that drift after a route rename at compile time.
  typedRoutes: true,
  experimental: {
    // Tree-shake heavier client deps to keep the per-route bundle small.
    // lucide-react is already optimised by default in Next 16.
    optimizePackageImports: ['motion', 'cmdk', 'sonner'],
    // `viewTransition: true` was tried but caused a "Maximum update depth
    // exceeded" loop in the sights list — React 19.2's <ViewTransition>
    // appears to interact badly with the per-card <Suspense> boundary
    // ShortlistButton uses for useSearchParams. The CSS-only
    // `@view-transition` in globals.css still gives hard-nav morphs (browser
    // refresh / back-forward). Re-enable once the React-side issue is fixed.
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
