import type { NextConfig } from 'next';

// Sight images are self-hosted in public/images/sights/ to avoid Wikimedia
// rate limiting (HTTP 429) on Next.js Image optimizer upstream fetches.
// If you ever add remote image sources, restore the images.remotePatterns
// config below.
const nextConfig: NextConfig = {};

export default nextConfig;
