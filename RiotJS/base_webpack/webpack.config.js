var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'dist/bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ],
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015', 'es2015-riot']}}
    ]
  }
}
