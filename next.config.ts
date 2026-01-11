import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firststep-app.com',
      },
    ],
  },
};

export default nextConfig;
