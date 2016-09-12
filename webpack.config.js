const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV || 'development'

const config = {
  devtool: 'eval-source-map',
  entry: [
    './app/assets/javascripts/index'
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/js/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    }]
  }
}

if (env === 'production') {
  config.devtool = 'source-map'
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

if (env === 'development') {
  config.entry.unshift(
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config
