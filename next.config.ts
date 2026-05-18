import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Wikimedia Commons — primary image source for sight photos.
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
    ],
  },
};

export default nextConfig;
