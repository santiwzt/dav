import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ruta relativa: funciona en GitHub Pages (https://usuario.github.io/repo/) sin importar el nombre del repo.
  base: './',
})
