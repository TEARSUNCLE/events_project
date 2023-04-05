const Joi = require('joi')

// 注册登录 校验账号密码
const username = Joi.string().alphanum().min(3).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()

// 更新用户信息
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const email = Joi.string().email().required()

// 修改头像
const avatar = Joi.string().dataUri().required()

exports.reg_login_validate = {
  body: {
    username,
    password
  }
}

exports.user_updateinfo_validate = {
  body: {
    id,
    nickname,
    email
  }
}

// 修改密码
exports.update_password_validate = {
  body: {
    oldPwd: password,
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
  }
}

// 修改头像
exports.update_avatar_validate = {
  body: {
    avatar
  }
}