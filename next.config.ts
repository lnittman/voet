import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  typescript: {
    // Silence TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Silence ESLint errors during build
    ignoreDuringBuilds: true,
  },
  // Allow importing from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
