// reactland/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // This should come from reactland/node_modules
import tailwindcss from '@tailwindcss/vite' // This should come from reactland/node_modules
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    root: "src",
    plugins: [
      react(), // Vite's React plugin
      tailwindcss(), // Tailwind CSS Vite plugin
    ],
    base: isProduction ? "/static/vite/" : "/static/", // From our previous workaround
    resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Adjust if your code is in 'reactland'
    },
    },
    build: {
      manifest: "manifest.json",
      outDir: path.resolve(__dirname, "..", "assets", "vite"), // Corrected path from previous context
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "src", "main.tsx"),
        }
      }
    }
  }
});