import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'casaos.local',
        port: '3001',
      },
    ],
  },
};

export default nextConfig;
