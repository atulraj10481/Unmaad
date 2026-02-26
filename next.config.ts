import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kixvhcsbtssjuiwjvusd.supabase.co",
      },
    ],
  },
};

export default nextConfig;
