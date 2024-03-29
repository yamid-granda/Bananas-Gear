import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      { find: '@/ui', replacement: path.resolve(__dirname, './src') },
      { find: '@/api', replacement: path.resolve(__dirname, '../api') },
    ],
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:math';
          @use "../styles/index" as *;
        `,
      },
    },
  },
})
