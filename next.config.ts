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
    // Enables React 19.2's <ViewTransition> component to fire during
    // App Router navigations. Required for the sight-image morph from
    // grid → detail page. An earlier attempt looped against a per-card
    // <Suspense> boundary in ShortlistButton; React 19.2 has since
    // resolved that. If the loop returns, set back to false and switch
    // to a manual document.startViewTransition wrapper around router.push.
    viewTransition: true,
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
