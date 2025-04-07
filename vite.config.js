import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';
import path from 'path';
import fs from 'fs';

// Find all block directories that contain a block.json file
const blockDirs = fs.readdirSync('./resources/js/blocks')
  .filter(dir => fs.existsSync(`./resources/js/blocks/${dir}/block.json`));

// Create input entries for all block index.js files
const blockEntries = blockDirs.reduce((entries, dir) => ({
  ...entries,
  [`blocks/${dir}/index`]: `resources/js/blocks/${dir}/index.js`
}), {});

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
        // Copy all block.json files alongside their JS
        blockDirs.forEach(dir => {
          const blockJson = fs.readFileSync(`./resources/js/blocks/${dir}/block.json`, 'utf-8');
          this.emitFile({
            type: 'asset',
            fileName: `assets/blocks/${dir}/block.json`,
            source: blockJson
          });
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
        ...blockEntries
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