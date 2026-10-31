import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: { allowedHosts: ['.e2b.app'] },
  plugins: [vue(), tailwindcss()],
})
