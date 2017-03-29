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
      // { test: /\.js$/,
      //   include: [path.resolve(__dirname, 'src')],
      //   loader: 'babel-loader',
      // },
      { test: /\.less$/,
        include: [path.resolve(__dirname, 'less')],
        loader: 'style-loader!css-loader!less-loader',
      }
    ]
  },
  resolve: {
    alias: {
      'bind': path.resolve(__dirname, 'node_modules/@ripter/bind/')
    }
  }
}
