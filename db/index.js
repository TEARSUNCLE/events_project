const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin888',
  database: 'ev_server'
})

module.exports = db