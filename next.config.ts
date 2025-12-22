import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // remover essa parte para rodar localmente
  output: 'export',
  basePath: '/dev-capital',
  images: {
  unoptimized: true,
  },
};

export default nextConfig;
