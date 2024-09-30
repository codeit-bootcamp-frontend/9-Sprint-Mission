// next.config.mjs
import allowedDomains from "./allowedDomains.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: allowedDomains.map((domain) => ({
      protocol: domain === "localhost" ? "http" : "https",
      hostname: domain,
      pathname: "**",
    })),
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
