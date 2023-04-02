// 注册
exports.register = (req, res) => {
  res.send({
    code: 0,
    msg: '注册成功！',
    data: req.body
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