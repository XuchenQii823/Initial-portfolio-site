import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-router-dom')) return 'router'
          if (id.includes('/react/') || id.includes('react-dom')) return 'react-vendor'
          return 'vendor'
        },
      },
    },
  },
})
