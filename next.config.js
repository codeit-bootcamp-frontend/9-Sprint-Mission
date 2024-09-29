const path = require("path");
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      //   port: "",
      //   pathname: "/Sprint_Mission/**",
      // },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
    prependData: `@import "_variables.scss"; @import "_mixins.scss";`,
  },
};

module.exports = nextConfig;
