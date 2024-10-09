/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  screens: {
    PC: { min: "1200px" },
    Tablet: { min: "768px", max: "1199px" },
    Mobile: { min: "375px", max: "767px" },
  },
  extend: {
    fontFamily: {
      sans: ['"Pretendard"', "sans-serif"], // 기본 sans 글꼴을 Pretendard로 설정
      rokaf: ["ROKAF Sans", "sans-serif"],
    },
    colors: {
      primary100: "#3692FF",
      primary200: "#1967D6",
      primary300: "#1251AA",
      error: "#F74747",
      gray900: "#111827",
      gray800: "#1F2937",
      gray700: "#374151",
      gray600: "#4B5563",
      gray500: "#6B7280",
      gray400: "#9CA3AF",
      gray200: "#E5E7EB",
      gray100: "#F3F4F6",
      gray50: "#F9FAFB",
    },
    fontSize: {
      "3xl": ["32px", { lineHeight: "42px" }],
      "2xl": ["24px", { lineHeight: "32px" }],
      xl: ["20px", { lineHeight: "32px" }],
      "2lg": ["18px", { lineHeight: "26px" }],
      lg: ["16px", { lineHeight: "26px" }],
      md: ["14px", { lineHeight: "24px" }],
      sm: ["13px", { lineHeight: "22px" }],
      xs: ["12px", { lineHeight: "20px" }],
    },
  },
};
export const plugins = [];
