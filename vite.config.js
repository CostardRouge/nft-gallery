// import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, 'src', 'cli.js'),
  //     name: 'sketch-gallery',
  //     fileName: (format) => `sketch-gallery.${format}.js`
  //   }
  // },
  plugins: [react()]
})
