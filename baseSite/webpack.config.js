module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {
        presets: ['es2015', 'react']
      }}
    ]
  }
};
