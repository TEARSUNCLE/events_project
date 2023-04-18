const path = require('path')

module.exports = {
  // 构建目标
  target: 'node',
  mode: 'development',
  // 入口文件
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}