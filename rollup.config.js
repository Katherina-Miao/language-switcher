import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  format: 'umd',
  plugins: [ babel() ],
  dest: 'dist/index.js',
  moduleId: 'lu_language',
  moduleName: 'Lul'
}