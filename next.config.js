/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'], // Next.js에서 SVG 파일을 React 컴포넌트로 사용하려면 @svgr/webpack을 설정해야 합니다.
    });
    return config;
  },
};

module.exports = nextConfig;
