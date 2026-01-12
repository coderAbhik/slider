// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90], // Add 90 to the allowed qualities
  },
};

export default nextConfig;