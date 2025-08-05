import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import path from 'path';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [
    dts(),
  ],
 
});
