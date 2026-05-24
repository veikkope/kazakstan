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
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
