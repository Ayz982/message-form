import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    base: '/message-form/', // Налаштовує шлях для GitHub Pages
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'), // Додає всі HTML-файли в src/
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]', // HTML-файли залишаються в корені dist/
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(), // Додає підтримку шаблонів у HTML
      FullReload(['./src/**/**.html']), // Автоматичне оновлення при зміні HTML
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
