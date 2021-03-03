import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const override = { compilerOptions: { module: 'ESNext', rootDir: '.' } };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.cjs',
      format: 'cjs',
    },
    {
      file: 'build/index.js',
      format: 'esm',
    },
  ],
  external: [],
  plugins: [
    typescript({
      include: ['./src/**/*.ts'], exclude: ['./test/**/*.ts'], clean: true, tsconfigOverride: override,
    }),
    nodeResolve(),
  ],
};
