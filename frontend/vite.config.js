import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     tailwindcss()
  ],
   server: {
    open: true,
    proxy: {
      // Forwards /api/* requests to the backend during `npm run dev`
      // so the frontend can just call fetch('/api/...') with no CORS
      // headaches. In production, set VITE_API_BASE_URL instead
      // (see src/lib/api.js).
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  base: '/',
})
