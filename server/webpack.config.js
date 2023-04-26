const path = require('path')
// const webpack = require('webpack')

module.exports = {
  // 构建目标
  target: 'node',
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  //   })
  // ],
  mode: 'development',
  // 入口文件
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}