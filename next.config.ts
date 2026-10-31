import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages is static hosting. This produces the deployable `out/` directory.
  output: "export",
  // Set by the GitHub Pages workflow for project sites, e.g. `/lokalbord`.
  // It remains undefined locally and for a user/organization Pages site.
  basePath: process.env.PAGES_BASE_PATH,
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
