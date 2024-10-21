import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    define: {
        'process.env': {
            VITE_PUSHER_APP_KEY: process.env.VITE_PUSHER_APP_KEY,
            VITE_PUSHER_APP_SECRET: process.env.VITE_PUSHER_APP_SECRET,
            VITE_PUSHER_APP_ID: process.env.VITE_PUSHER_APP_ID,
            VITE_PUSHER_APP_CLUSTER: process.env.VITE_PUSHER_APP_CLUSTER,
        }
    }
});

