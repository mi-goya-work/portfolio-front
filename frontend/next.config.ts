import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms-demo.cms.mi-goya.com",
      },
    ],
  },
};

export default nextConfig;
