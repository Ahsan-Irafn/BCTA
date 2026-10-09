import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bcta.edu.au",
      },
      {
        protocol: "https",
        hostname: "www.bcta.vic.edu.au",
      },
    ],
  },
};

export default nextConfig;
