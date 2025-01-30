import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default nextConfig;
