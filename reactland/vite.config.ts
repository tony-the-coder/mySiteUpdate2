// reactland/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    root: "src", // existing
    plugins: [   // existing
      react(),
      tailwindcss(),
    ],
    optimizeDeps: {  // <--- Add this section
      include: ['clsx'],
    },              // <--- End of new section
    base: isProduction ? "/static/vite/" : "/static/", // existing
    resolve: { // existing
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: { // existing
      manifest: "manifest.json",
      outDir: path.resolve(__dirname, "..", "assets", "vite"),
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "src", "main.tsx"),
        }
      }
    }
  }
});