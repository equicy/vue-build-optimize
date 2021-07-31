const webpack = require('webpack')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Happypack = require('happypack')
const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.plugin('vendorDll')
    .use(webpack.DllReferencePlugin, [
      {
        context: __dirname,
        manifest: require('./vue_vendor.manifest.json')
      },
      {
        context: __dirname,
        manifest: require('./other_vendor.manifest.json')
      }
    ])
    
    config.plugin('speed')
    .use(SpeedMeasureWebpackPlugin)

    config.plugin('asset')
    .use(AddAssetHtmlWebpackPlugin, [
      [
        {
          filepath: path.resolve(__dirname, 'public/dll/vue_vendor.dll.js'),
          outputPath: 'dll',
          publicPath: '/dll'
        },
        {
          filepath: path.resolve(__dirname, 'public/dll/other_vendor.dll.js'),
          outputPath: 'dll',
          publicPath: '/dll'
        }
      ]
    ])

    config.plugin('clean')
    .use(CleanWebpackPlugin)

    const jsRule = config.module.rule('js');
    jsRule.uses.clear();
    jsRule.use('Happypack/loader?id=babel')
        .loader('Happypack/loader?id=babel')
        .end();

    config.plugin('happypack')
    .use(Happypack, [{
      id:'babel',
      loaders:['babel-loader?cacheDirectory=true']
    }])
  },
  configureWebpack:{
    externals: {
      jquery: 'jQuery',
    }
  }
}