// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // svgr 플러그인 추가

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr 옵션 수정
      svgrOptions: {
        exportType: "named", // named export로 변경
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
});
