import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["space-bazaar.vercel.app", "shop.spacex.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "space-bazaar.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shop.spacex.com",
        port: "",
        pathname: "/cdn/**",
      },
    ],
  },

  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
