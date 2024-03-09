import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 4200,
  },
  base: '',
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        format: 'umd',
      },
    },
  },
});
