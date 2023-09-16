import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
})
