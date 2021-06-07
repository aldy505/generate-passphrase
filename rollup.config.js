import typescript from 'rollup-plugin-typescript2';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import {terser} from 'rollup-plugin-terser';

const override = {compilerOptions: {module: 'ESNext', rootDir: '.'}};

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
  external: [],
  plugins: [
    typescript({
      include: ['./src/**/*.ts'], exclude: ['./test/**/*.ts'], clean: true, tsconfigOverride: override
    }),
    nodeResolve(),
    terser({format: {comments: 'all'}}),
    copy({
      targets: [
        {src: 'src/words.txt', dest: 'build'}
      ]
    })
  ]
};
