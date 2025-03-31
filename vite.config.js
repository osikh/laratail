import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    server: {
        host: '0.0.0.0',  // Ensure it's accessible from Apache
        port: 5173,
        strictPort: true,
        hmr: {
            host: '192.168.1.112', // Change to your actual domain
        },
        watch: {
            ignored: ['**/vendor/**', '**/node_modules/**'], // Exclude vendor & node_modules
        },
    },
});
