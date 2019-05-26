const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/presentation.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    /* Copy some needed files in hierarchy */
    new CopyPlugin([
      // styles for slides export to to pdf
      { from: { glob: '../node_modules/reveal.js/css/reveal.css' }, to: 'css/[name].css' },
      { from: { glob: '../node_modules/reveal.js/css/theme/white.css' }, to: 'css/[name].css' },
      { from: { glob: '../node_modules/reveal.js/plugin/highlight/highlight.js' }, to: 'highlight.js' },
    ])
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }

};

