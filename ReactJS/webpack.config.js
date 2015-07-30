/*global module */
module.exports = {
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
      , { test: /\.md$/, loader: "html-loader!markdown-loader" }
      , {test: /\.less$/, loader: 'style!css!less'}
    ]
  }
};
