import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      red: "#EF4444",
      "panda-gray50": "#F9FAFB",
      "panda-gray100": "#F3F4F6",
      "panda-gray200": "#E5E7EB",
      "panda-gray300": "#D1D5DB",
      "panda-gray400": "#9CA3AF",
      "panda-gray500": "#6B7280",
      "panda-gray600": "#4B5563",
      "panda-gray700": "#374151",
      "panda-gray800": "#1F2937",
      "panda-gray900": "#111827",
      "panda-black": "#111827",
      "panda-skyblue": "#E6F2FF",
      "panda-blue200": "#3182F6",
      "panda-theme": "#3692FF",
      "panda-theme-hover": "#1967D6",
      "panda-bg-skyblue": "#CFE5FF",
    },
    fontFamily: {
      pretendard: "Pretendard-Regular",
      ROKAFSans: "ROKAF-Sans",
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
  },
  plugins: [],
};
export default config;
