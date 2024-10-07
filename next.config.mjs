/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next.js의 이미지 최적화 기능을 활성화하고,
    // 특정 도메인을 지정하지 않고 프록시를 통해 모든 이미지를 처리
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 호스트에서 이미지 허용
      },
    ],
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
};

export default nextConfig;
