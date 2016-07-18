module.exports = {
  entry: {
    surface: './src/surface.js',
    iceberg: './src/iceberg.js',
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {
        presets: ['es2015', 'react']
      }}
    ]
  }
};
