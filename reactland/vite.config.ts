// reactland/vite.config.ts
import * as path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    root: "src", // Vite's root is <your_project_root>/reactland/src/
    plugins: [react()],
    base: isProduction ? "/static/vite/" : "/", // DEV: base is "/"
    build: {
      manifest: "manifest.json",
      outDir: path.resolve(__dirname, "..", "assets", "vite"),
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "src", "main.tsx"),
          // You can add more entry points here later if needed
          // simple: path.resolve(__dirname, "src", "simpleTest.tsx"),
        }
      }
    }
  }
});