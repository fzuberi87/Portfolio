import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export as a fully static site (plain HTML/CSS/JS — no Node.js server needed)
  output: "export",
  images: {
    // Required for static export — images are served as-is without optimization
    unoptimized: true,
  },
};

export default nextConfig;
