import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
      host: true
    },
    define: {
      // Make env variables available
      'process.env.VITE_GITHUB_TOKEN': JSON.stringify(env.VITE_GITHUB_TOKEN)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});