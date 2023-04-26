const mysql = require('mysql')

// 环境变量
let sqlInfo = {}

if (process.env.NODE_ENV === 'production') {
  // 生产环境
  console.log('这是生产环境')
  sqlInfo = {
    host: '127.0.0.1',
    user: 'root',
    password: 'admin888',
    database: 'ev_server',
    port: '3306'
  }
} else {
  // 开发环境
  console.log('这是开发测试环境')
  sqlInfo = {
    host: '114.132.224.49',
    user: 'test114',
    password: '5R3IZGBU9G6r8z6J',
    database: 'ev_server_dev',
    port: '8806'
  }
}

const db = mysql.createPool(sqlInfo)
module.exports = db