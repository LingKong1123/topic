import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/topic/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/renderer/components"),
      "@hooks": path.resolve(__dirname, "./src/renderer/hooks"),
      "@services": path.resolve(__dirname, "./src/renderer/services"),
      "@styles": path.resolve(__dirname, "./src/renderer/styles"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
