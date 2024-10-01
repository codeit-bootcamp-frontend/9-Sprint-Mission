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
};

export default nextConfig;
