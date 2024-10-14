/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Next.js 12.2 이상에서 추가된 styled-components 지원
  },
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "via.placeholder.com",
      "flexible.img.hani.co.kr",
    ],
  },
  // dev 모드에서는 수정한 부분만 핫 리로딩 되도록 설정
  webpack: (config, { dev, isServer }) => {
    if (dev && isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },
};

module.exports = nextConfig;
