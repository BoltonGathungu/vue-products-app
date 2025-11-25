import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // All requests starting with /api will be proxied to DummyJSON
      '/api': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '') // remove /api prefix
      }
    }
  }
})
