import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages is static hosting. This produces the deployable `out/` directory.
  output: "export",
  // Set by the GitHub Pages workflow for project sites, e.g. `/lokalbord`.
  // It remains undefined locally and for a user/organization Pages site.
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
