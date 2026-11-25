import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets other devices on the local network load dev assets (preview only).
  allowedDevOrigins: ["10.8.21.152", "*.local"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
