const express = require('express')
const router = express.Router()

const userInfoHandler = require('../router_handler/userInfo')

// 获取用户信息
router.get('/userinfo', userInfoHandler.userinfo)

module.exports = router