import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deployment için repo adınıza uyarlayabilmeniz için görece base path ayarı
  base: '/o-an-social-app/',
})
