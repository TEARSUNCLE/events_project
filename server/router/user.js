const express = require('express')
const app = express.Router()

const userHandler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi')
const { reg_login_validate } = require('../validate/user')

// 注册
app.post('/register', expressJoi(reg_login_validate), userHandler.register)

// 登录
app.post('/login', expressJoi(reg_login_validate), userHandler.login)

module.exports = app