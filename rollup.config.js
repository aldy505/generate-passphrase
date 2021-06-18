import ts from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.cjs',
      format: 'cjs'
    },
    {
      file: 'build/index.js',
      format: 'esm'
    }
  ],
  external: ['crypto', 'fs', 'path'],
  plugins: [
    ts({
      include: ['./src/**/*.ts']
    }),
    terser({format: {comments: 'all'}}),
    copy({
      targets: [
        {src: 'src/words.txt', dest: 'build'}
      ]
    })
  ]
};
