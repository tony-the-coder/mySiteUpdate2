import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Corrected import for standard @vitejs/plugin-react
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.tsx'), // Your main entry
        aboutPageEntry: resolve(__dirname, 'src/aboutPageEntry.tsx'),
        portfolioPageEntry: resolve(__dirname, 'src/portfolioPageEntry.tsx'),
        navbarEntry: resolve(__dirname, 'src/navbarEntry.tsx'),
        homeHeroEntry: resolve(__dirname, 'src/homeHeroEntry.tsx'),
        contactPageEntry: resolve(__dirname, 'src/contactPageEntry.tsx'),
        certificatesEntry: resolve(__dirname, 'src/certificatesEntry.tsx'),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    outDir: '../assets/vite', // Ensure this matches your Django STATICFILES_DIRS[1]
    manifest: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Ensure this alias is correct
    },
  },
});