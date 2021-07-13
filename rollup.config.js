import ts from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
    },
  ],
  external: ['crypto', 'fs', 'path'],
  plugins: [
    ts(),
    terser({format: {comments: 'all'}}),
    copy({
      targets: [
        {src: 'src/words.txt', dest: 'dist'},
      ],
    }),
  ],
};
