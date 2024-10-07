import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Page Router의 모든 페이지 파일을 포함
    "./src/components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 경로도 추가
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inherit: "inherit",
        pretendard: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
      spacing: {
        "70px": "70px",
      },
    },
  },
  plugins: [],
};
export default config;
