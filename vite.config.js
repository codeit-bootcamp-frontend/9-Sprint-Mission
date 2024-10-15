import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // optimizeDeps: {
  //   exclude: ["path", "source-map-js"], // path, source-map-js 모듈을 최적화에서 제외
  // },
  plugins: [react()],
});
