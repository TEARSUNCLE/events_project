const crypto = require('crypto-js')

module.exports = {
  tokenKey: 'hello World',
  hours: '10h'
}

// hash转换
module.exports.toHash = (str) => {
  if (str) {
    return crypto.MD5(str.toString()).toString()
  }
}