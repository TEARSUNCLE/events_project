const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 注册
exports.register = (req, res) => {
  // 判断表单数据是否合法
  const userInfo = req.body
  if (!userInfo.username || !userInfo.password) return res.send({
    code: 1,
    msg: '请输入用户名或密码!'
  })
  // 判断该用户名是否已存在
  const selectSql = 'select * from ev_users where username = ?'
  db.query(selectSql, userInfo.username, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.length > 0) return res.send({ code: 1, msg: '用户名已被占用，请更改其他用户名!' })

    // 对明文密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    // 将数据插入数据库
    const insertSql = 'insert into ev_users set ?'
    db.query(insertSql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      if (err) return res.send({ code: 1, msg: err.message })
      if (results.affectedRows !== 1) return res.send({ code: 1, msg: '注册失败，请稍后重试!' })

      res.send({ code: 0, msg: '注册成功!' })
    })
  })
}

// 登录
exports.login = (req, res) => {
  res.send({
    code: 0,
    msg: '登录成功！',
    data: req.body
  })
}