/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com", // 기존 도메인
      "via.placeholder.com", // 추가할 도메인
    ],
  },
};

module.exports = nextConfig;
