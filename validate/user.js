const Joi = require('joi')

// 校验账号密码
const username = Joi.string().alphanum().min(3).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()

exports.reg_login_validate = {
  body: {
    username,
    password
  }
}