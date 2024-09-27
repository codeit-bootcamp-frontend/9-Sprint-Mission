import type { Config } from 'tailwindcss';

const config: Config = {
  // Tailwind v3 이상에서는 purge를 제거하고, content 속성을 활용
  // content 속성에 지정된 경로의 파일을 스캔하여 실제로 사용된 CSS 클래스만 추출
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}', // 페이지 파일들 스캔
    './src/components/**/*.{js,ts,jsx,tsx}', // 컴포넌트 파일들 스캔
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        inherit: 'inherit',
        pretendard: ['var(--font-pretendard)'],
      },
      spacing: {
        '70px': '70px',
      },
    },
  },
  plugins: [],
};

export default config;
