module.exports = {
  entry: {
    surface: './src/index.js',
    iceburg: './src/secondIndex.js',
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
