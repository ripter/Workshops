const path = require('path');

module.exports = {
  mode: 'development',
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
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/'
  }
};
