import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/components/index.ts',
  output: [
    { format: 'cjs', file: 'dist/index.cjs.js' },
    { format: 'es', file: 'dist/index.es.js' },
  ],
  external: [
    'react',
    '@emotion/core',
  ],
  plugins: [
    typescript({
      clean: true,
      typescript: require('typescript'),
      verbosity: 0,
      // We must override tsconfig to bundle interface
      // declarations with our components
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          isolatedModules: false,
        }
      }
    }),
    babel({
      extensions,
      include: ['src/components/**/*'],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve({
      customResolveOptions: {
        moduleDirecty: 'node_modules',
      },
      extensions,
      jesnext: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
}
