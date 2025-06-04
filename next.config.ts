import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.example.com", // More secure than using '**'
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
      },
    ],
  },
  experimental: {
    optimizeCss: true, // Helps in reducing CSS bundle size
    scrollRestoration: true, // Improves UX on navigation
  },
};

export default nextConfig;