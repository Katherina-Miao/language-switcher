import babel from 'rollup-plugin-babel'

export default [{
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/index.js',
    name: 'Switcher',
    amd:{
      id: 'language_switcher'
    }
  },
  plugins: [ babel() ]
}, {
  input: 'src/index.js',
  output: {
    format: 'es',
    file: 'dist/index.es.js',
    name: 'Switcher'
  },
  plugins: [babel()]
}]
