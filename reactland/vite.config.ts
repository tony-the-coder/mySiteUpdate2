// reactland/vite.config.ts
import * as path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    root: "src", // Vite's root is <your_project_root>/reactland/src/
    plugins: [react()],
    base: isProduction ? "/static/vite/" : "/static/", // MODIFIED FOR DEV WORKAROUND
    server: {
      // This ensures the HMR client is also aware of the new base path in dev.
      // Vite might handle this automatically with the 'base' change,
      // but explicitly setting it can help.
      hmr: {
        // The client path should not include the base itself if Vite handles it,
        // but let's try with it first to match Django's output exactly
        // If this doesn't work, try just path: '@vite/client'
        // Vite's default HMR client path is usually just '/@vite/client' relative to its serving root
        // path: '/static/@vite/client', // This might be too much, Vite prepends base
        // Let's rely on `base: "/static/"` for now and see if Vite serves @vite/client under it.
        // If not, we can adjust server.hmr.clientPort and server.hmr.path.
        // For now, the primary change is `base`.
      }
    },
    build: {
      manifest: "manifest.json",
      // Output directory relative to the project root (TonyTheCoderPortfolio)
      outDir: path.resolve(__dirname, "..", "assets", "vite"),
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "src", "main.tsx"),
        }
      }
    }
  }
});