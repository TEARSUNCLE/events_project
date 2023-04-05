const db = require('../db/index')

// 获取用户信息
exports.userinfo = (req, res) => {
  const selectSql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
  db.query(selectSql, req.user.id, (err, results) => {
    // console.log(6, req.auth.id)
    if (err) return res.errHandler(err)
    if (results.length !== 1) return res.errHandler('获取用户信息失败！')
    res.send({
      code: 0,
      msg: '获取用户信息成功！',
      data: results[0]
    })
  })
}