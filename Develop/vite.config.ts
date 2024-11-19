import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  base: '/',
  css: {
    postcss: './postcss.config.cjs'
  },
  // Add build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Add chunk size warning limit
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