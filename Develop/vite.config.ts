import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    host: true,
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    host: true,// Added for Render compatibility
  },
  base: '/', // Changed back to '/' for Render deployment
  css: {
    postcss: './postcss.config.cjs'
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})