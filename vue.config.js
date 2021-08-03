const webpack = require('webpack')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const Happypack = require('happypack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
module.exports = {
  parallel: true,
  chainWebpack: config => {
    config.plugin('vendorDll1')
    .use(webpack.DllReferencePlugin, [
      {
        context: __dirname,
        manifest: require('./other_vendor.manifest.json')
      }
    ])

    config.plugin('vendorDll2')
    .use(webpack.DllReferencePlugin, [
      {
        context: __dirname,
        manifest: require('./vue_vendor.manifest.json')
      }
    ])
    
    config.plugin('speed')
    .use(SpeedMeasureWebpackPlugin)

    //将dll下的文件自动插入到index.html中
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
    

    // const jsRule = config.module.rule('js');
    // jsRule.uses.clear();
    // jsRule.use('Happypack/loader?id=babel')
    //     .loader('Happypack/loader?id=babel')
    //     .end();

    // config.plugin('happypack')
    // .use(Happypack, [{
    //   id:'babel',
    //   loaders:['babel-loader?cacheDirectory=true']
    // }])

    // config.module.rule('vue')
    //       .use('thread-loader')
    //       .loader('thread-loader')
    //       .before('vue-loader')
  },
  configureWebpack: config => {
    config.externals = {
      jquery: 'jQuery'
    },
    config.optimization.minimizer = [
      new UglifyJsPlugin({
       uglifyOptions: {
        compress: {
         drop_console: true,
        },
        warnings: false,
        parallel: true, //默认并发运行数：os.cpus().length - 1
       }
      })
     ]
  }
  // configureWebpack:{
  //   externals: {
  //     jquery: 'jQuery',
  //   },
  //   module: {
  //     noParse: /^(lodash|moment)$/
  //   }
  // }
}