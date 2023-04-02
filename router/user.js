const express = require('express')
const app = express.Router()

const userHandler = require('../router_handler/user')

// 注册
app.post('/register', userHandler.register)

// 登录
app.post('/login', userHandler.login)

module.exports = app