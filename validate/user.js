const Joi = require('joi')

// 注册登录 校验账号密码
const username = Joi.string().alphanum().min(3).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()

// 更新用户信息
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const email = Joi.string().email().required()

exports.reg_login_validate = {
  body: {
    username,
    password
  }
}

exports.reg_updateInfo_validate = {
  body: {
    id,
    nickname,
    email
  }
}