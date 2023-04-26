const db = require('../db/index')
// 密码加密 依赖包
const bcrypt = require('bcryptjs')
const config = require('../config')
// 生成 token 依赖包
const jsonwebtoken = require('jsonwebtoken')

// 注册
exports.register = (req, res) => {
  const userInfo = req.body
  // 判断表单数据是否合法
  // if (!userInfo.username || !userInfo.password) return res.errHandler('请输入用户名或密码!')

  // 判断该用户名是否已存在
  const selectSql = 'select * from ev_users where username = ?'
  db.query(selectSql, userInfo.username, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length > 0) return res.errHandler('用户名已被占用，请更改其他用户名!')

    // 对明文密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    // 将数据插入数据库
    const insertSql = 'insert into ev_users set ?'
    db.query(insertSql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
      if (err) return res.errHandler(err)
      if (results.affectedRows !== 1) return res.errHandler('注册失败，请稍后重试!')

      res.send({
        code: 0,
        msg: '注册成功!'
      })
    })
  })
}

// 登录
exports.login = (req, res) => {
  const userInfo = req.body
  // 查询用户名
  const selectSql = 'select * from ev_users where username = ?'
  db.query(selectSql, userInfo.username, (err, results) => {
    if (err) return res.errHandler(err)
    // 未查询到该用户名
    if (results.length !== 1) return res.errHandler('用户名错误!')

    // 查询密码是否正确 返回布尔值
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if (!compareResult) return res.errHandler('密码错误!')

    // 用户名和密码都正确，生成token返回 密码和头像一定要剔除
    const user = { ...results[0], password: '', user_pic: '' }
    const token = jsonwebtoken.sign(user, config.tokenKey, { expiresIn: config.hours })

    res.send({
      code: 0,
      msg: '登录成功',
      token: 'Bearer ' + token
    })
  })
}