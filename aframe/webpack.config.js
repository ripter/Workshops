const path = require('path');

module.exports = {
  // devtool: 'source-map',
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
    ]
  },
  resolve: {
    alias: {
      // I like npm namespaces, but I don't like typing them.
      // alias them without the namespace
      'aframe-spritesheet-component': path.resolve(__dirname, 'node_modules/@ekolabs/aframe-spritesheet-component/index.js'),
    }
  },

  devServer: {
    // hot: true, // Tell the dev-server we're using HMR
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/'
  }
};
