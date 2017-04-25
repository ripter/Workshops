const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      { test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      { test: /\.less$/,
        include: [path.resolve(__dirname, 'less')],
        loader: 'style-loader!css-loader!less-loader',
      }
    ]
  },
  resolve: {
    alias: {
      // I like npm namespaces, but I don't like typing them.
      // alias them without the namespace
      'bind': path.resolve(__dirname, 'node_modules/@ripter/bind/'),
      'domlens': path.resolve(__dirname, 'node_modules/@ripter/domLens'),
    }
  }
}
