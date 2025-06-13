import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'src/main.tsx',
                portfolioPageEntry: 'src/portfolioPageEntry.tsx',
                contactPageEntry: 'src/contactPageEntry.tsx', // ADD THIS LINE
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    },
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
