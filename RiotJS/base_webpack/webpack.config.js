module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'dist/js/bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ],
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015']}}
    ]
  }
}
