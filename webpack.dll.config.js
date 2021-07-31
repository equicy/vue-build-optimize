const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    vue_vendor: ['vue/dist/vue.runtime.esm.js', 'vuex',  'vue-router', 'element-ui'],
    other_vendor: ['lodash', 'moment']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './public/dll'),
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, '[name].manifest.json')
    }),

    new CleanWebpackPlugin(),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
  ]
}