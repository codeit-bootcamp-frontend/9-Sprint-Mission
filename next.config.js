/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "via.placeholder.com",
      "flexible.img.hani.co.kr",
      "image.hanatour.com",
      "youtube.com",
      "pbs.twimg.com",
    ],
  },
};

module.exports = nextConfig;
