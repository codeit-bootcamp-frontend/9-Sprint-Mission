/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
    ], // 외부 이미지 도메인 추가
  },
};

module.exports = nextConfig;
