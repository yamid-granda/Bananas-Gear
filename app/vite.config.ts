import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router'

export default defineConfig({
  plugins: [
    react(),
    generouted(),
  ],

  resolve: {
    alias: [
      { find: '@/app', replacement: path.resolve(__dirname, './src') },
      { find: '@/ui', replacement: path.resolve(__dirname, '../ui/src') },
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
