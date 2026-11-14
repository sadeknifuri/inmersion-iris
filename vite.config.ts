import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        "contatto-landing": resolve(root, 'pages/contatto-landing/index.html'),
        "contatto-landing-copy": resolve(root, 'pages/contatto-landing-copy/index.html'),
        "contatto-poster": resolve(root, 'pages/contatto-poster/index.html'),
        "diaframma": resolve(root, 'pages/diaframma/index.html'),
        "eye-on-design-poster": resolve(root, 'pages/eye-on-design-poster/index.html'),
        "image-2": resolve(root, 'pages/image-2/index.html'),
        "lente": resolve(root, 'pages/lente/index.html'),
        "oculis-landing": resolve(root, 'pages/oculis-landing/index.html'),
        "provino": resolve(root, 'pages/provino/index.html'),
      },
    },
  },
})
