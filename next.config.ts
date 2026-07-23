import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const NEXT_BASE_PATH = "/Morocco-";

const nextConfig: NextConfig = {
  output: "export",
  basePath: NEXT_BASE_PATH,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: NEXT_BASE_PATH,
  },
};

export default withNextIntl(nextConfig);
