import { createMDX } from "fumadocs-mdx/next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import { resolve } from "path";

initOpenNextCloudflareForDev();

const withMDX = createMDX();

const root = resolve(__dirname, "../../");

const config: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: root,
  turbopack: {
    root,
  },
};

export default withMDX(config);
