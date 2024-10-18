import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    // proxy: {
    //   // Proxy API requests to avoid CORS issues
    //   '/api': {
    //     target: 'https://testing.ruscarestudent.com/api/', // Replace with your API URL
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the /api prefix
    //   },
    // },
  }
})
