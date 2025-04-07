import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';
import path from 'path';

export default defineConfig({
  base: '/app/themes/nynaeve/public/build/',
  plugins: [
    tailwindcss(),
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.js',
        'resources/css/editor.css',
        'resources/js/editor.js',
      ],
      refresh: true,
    }),

    wordpressPlugin(),

    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
    }),

    {
      name: 'wordpress-blocks',
      generateBundle(_, bundle) {
        // Copy block.json files alongside their JS
        this.emitFile({
          type: 'asset',
          fileName: 'assets/blocks/website-packages/block.json',
          source: JSON.stringify(require('./resources/js/blocks/website-packages/block.json'))
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: 'resources/js/app.js',
        'app-css': 'resources/css/app.css',
        editor: 'resources/js/editor.js',
        'editor-css': 'resources/css/editor.css',
        'blocks/website-packages/index': 'resources/js/blocks/website-packages/index.js'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name.startsWith('blocks/')) {
            return `assets/${chunkInfo.name}.js`;
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});