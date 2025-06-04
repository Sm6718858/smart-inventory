import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.example.com", // Using wildcard for subdomains
      },
      {
        protocol: "https",
        hostname: "cdn.example.com", // Allowing CDN-hosted images
      },
    ],
  },
  experimental: {
    optimizeCss: false, // Helps in reducing CSS bundle size
    scrollRestoration: true, // Improves UX on navigation
  },
};

export default nextConfig;