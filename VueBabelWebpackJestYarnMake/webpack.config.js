const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    path: path.resolve(__dirname, 'public/js'), // string

    // the filename template for entry chunks
    filename: 'bundle.js', // string
  },
  module: {
    rules: [
      { test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
};
