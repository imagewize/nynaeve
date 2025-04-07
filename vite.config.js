import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';
import fs from 'fs';
import path from 'path';

// Dynamically include all block entry points
const blocksDir = path.resolve(__dirname, 'resources/js/blocks');
const blockEntries = fs.readdirSync(blocksDir)
  .filter((block) => fs.statSync(path.join(blocksDir, block)).isDirectory())
  .map((block) => `resources/js/blocks/${block}/index.js`);

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
        ...blockEntries, // Include all block entry points dynamically
      ],
      refresh: true,
    }),

    wordpressPlugin(),

    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
    }),
  ],
  resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'blocks/[name].js',
        chunkFileNames: 'blocks/[name].js',
        assetFileNames: 'blocks/[name].[ext]',
      },
    },
  },
});