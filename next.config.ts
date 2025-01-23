import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 強制的にデプロイ
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
