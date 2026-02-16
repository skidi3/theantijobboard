import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Use Bunny CDN for static assets in production
  assetPrefix: isProd ? 'https://theantijobboard.b-cdn.net' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'asset.brandfetch.io',
      },
      {
        protocol: 'https',
        hostname: 'theantijobboard.b-cdn.net',
      },
    ],
  },
};

export default nextConfig;
