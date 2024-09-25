/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "store.ardanlabs.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        pathname: "**",
      },
      { protocol: "https", hostname: "image.hanatour.com", pathname: "**" },
      {
        protocol: "https",
        hostname: "cdnb.artstation.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.namu.wiki",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cafe24.poxo.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        pathname: "**",
      },
    ],
  },
  webpack(config) {
    // @svgr/webpack을 사용하여 SVG 파일을 React 컴포넌트로 변환
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    // resolve.fallback 추가
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
  experimental: {
    turbo: {
      // TurboPack에서 SVG 파일에 대한 커스텀 로더 설정
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"], // @svgr/webpack을 사용하여 SVG 파일을 JS로 변환
          as: "*.js", // JS로 변환된 파일로 처리
        },
      },
    },
  },
};

export default nextConfig;
