import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow any external image domain you use for your case study images.
    // Add domains here as needed, e.g.:
    // domains: ["images.unsplash.com"],
    unoptimized: false,
  },
};

export default nextConfig;
