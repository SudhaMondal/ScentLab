import type { NextConfig } from "next";

// GitLab provides CI_PAGES_URL to the Pages job. Its pathname is the
// project path on non-unique domains and "/" on unique domains.
const pagesUrl = process.env.CI_PAGES_URL;
const basePath = pagesUrl ? new URL(pagesUrl).pathname.replace(/\/$/, "") : "";
const assetPrefix = pagesUrl ? `${pagesUrl.replace(/\/$/, "")}/` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: { unoptimized: true },
};

export default nextConfig;
