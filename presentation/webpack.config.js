const path = require('path');

module.exports = {
  entry: './src/presentation.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};