import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages is static hosting. This produces the deployable `out/` directory.
  output: "export",
  // A custom GitHub Pages domain serves this project from `/`, rather than the
  // repository path. Keep undefined for the root rather than passing an empty string.
  basePath: process.env.PAGES_BASE_PATH || undefined,
};

// The board is statically exported for GitHub Pages, so this proxy exists only
// while developing against the local Spring service.
if (process.env.NODE_ENV === "development") {
  nextConfig.rewrites = async () => [
    {
      source: "/backend/:path*",
      destination: "http://localhost:8080/:path*",
    },
  ];
}

export default nextConfig;
