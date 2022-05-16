import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import pkg from '../../package.json'
import { svgBuilder } from './global/components/svgIcon/svgbuilder'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  base: './',
  mode: process.env.NODE_ENV,
  plugins: [
    vue(),
    vueI18n({ include: join(__dirname, './global/i18n/locales/**') }),
    svgBuilder(join(__dirname, './global/svg/'))
  ],
  build: {
    emptyOutDir: true,
    minify: false,
    outDir: '../../dist/renderer',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'main.html')
      }
    }
  },
  server: {
    port: pkg.env.PORT,
  },
  resolve: {
    alias: {
      '@': join(__dirname, ''),
      '@main': join(__dirname, 'main/src'),
      '@popup': join(__dirname, 'popup/src'),
    },
  },
});
