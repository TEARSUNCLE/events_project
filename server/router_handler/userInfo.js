const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息
exports.userinfo = (req, res) => {
  const selectSql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
  db.query(selectSql, req.user.id, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length !== 1) return res.errHandler('获取用户信息失败！')

    res.send({
      code: 0,
      msg: '获取用户信息成功！',
      data: results[0]
    })
  })
}

// 更新用户信息
exports.updateinfo = (req, res) => {
  if (!(req.body.nickname || req.body.email)) return res.errHandler('The user nickname and email cannot be both empty at the same time.')
  const updateSql = 'update ev_users set ? where id = ?'
  db.query(updateSql, [req.body, req.body.id], (err, results) => {
    if (err) return res.errHandler(err)
    if (results.affectedRows !== 1) return res.errHandler('修改用户信息失败！')

    res.send({
      code: 0,
      msg: '修改成功！'
    })
  })
}

// 修改密码
exports.updatepwd = (req, res) => {
  const selectSql = 'select * from ev_users where id = ?'
  // 查询该id用户是否存在
  db.query(selectSql, req.user.id, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length !== 1) return res.errHandler('该用户不存在！')

    // 判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.errHandler('旧密码错误！')

    // 将新密码加密插入到数据库
    const updateSql = 'update ev_users set password = ? where id = ?'
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(updateSql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.errHandler(err)
      if (results.affectedRows !== 1) return res.errHandler('修改密码失败！')

      res.send({
        code: 0,
        msg: '密码修改成功！'
      })
    })
  })
}

// 修改头像
exports.updateAvatar = (req, res) => {
  const updateSql = 'update ev_users set user_pic = ? where id = ?'
  db.query(updateSql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.errHandler(err)
    if (results.affectedRows !== 1) return res.errHandler('头像更新失败！')

    res.send({
      code: 0,
      msg: '头像更新成功！'
    })
  })
}