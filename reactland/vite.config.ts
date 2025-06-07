// reactland/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    root: "src",
    plugins: [
      react(),
      tailwindcss(),
    ],
    base: isProduction ? "/static/vite/" : "/static/",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      manifest: "manifest.json",
      outDir: path.resolve(__dirname, "..", "assets", "vite"),
      rollupOptions: {
        // CORRECTED: All entry points are listed here
        input: {
          main: path.resolve(__dirname, "src", "main.tsx"),
          navbarEntry: path.resolve(__dirname, "src", "navbarEntry.tsx"),
          portfolioPageEntry: path.resolve(__dirname, "src", "portfolioPageEntry.tsx"),
          aboutPageEntry: path.resolve(__dirname, "src", "aboutPageEntry.tsx"),
        }
      }
    }
  }
});