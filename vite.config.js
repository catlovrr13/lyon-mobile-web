import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {
    defineConfig
} from 'vite';
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr"

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        svgr()
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        host: '0.0.0.0',       // Tells Vite to broadcast on your local network
        port: 8080,            // The specific port you want to use
        strictPort: true,      // Ensures Vite doesn't quietly jump to 8081 if 8080 is busy
        hmr: {
            host: '192.168.31.190' // IMPORTANT: Change to your computer's actual local IP address
        },
    },
});