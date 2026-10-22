import path from "node:path";
import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));
/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  outputFileTracingIncludes: { "/api/documents/cv": ["./private/**/*"] },
  webpack(config) { config.resolve.alias["@"] = path.join(dir, "src"); return config; },
};
