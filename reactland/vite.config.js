// reactland/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var isProduction = mode === 'production';
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
                // ADDED: homeHeroEntry.tsx as an input entry point
                input: {
                    main: path.resolve(__dirname, "src", "main.tsx"),
                    navbarEntry: path.resolve(__dirname, "src", "navbarEntry.tsx"),
                    portfolioPageEntry: path.resolve(__dirname, "src", "portfolioPageEntry.tsx"),
                    aboutPageEntry: path.resolve(__dirname, "src", "aboutPageEntry.tsx"),
                    contactPageEntry: path.resolve(__dirname, "src", "contactPageEntry.tsx"),
                    homeHeroEntry: path.resolve(__dirname, "src", "homeHeroEntry.tsx"), // <-- ADD THIS LINE
                }
            }
        }
    };
});
