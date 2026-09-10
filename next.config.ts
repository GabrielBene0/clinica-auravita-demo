import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/clinica-auravita-demo" : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  images: { unoptimized: true },
};

export default nextConfig;
