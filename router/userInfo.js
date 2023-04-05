const express = require('express')
const router = express.Router()

const userInfoHandler = require('../router_handler/userInfo')

const expressJoi = require('@escook/express-joi')
const { reg_updateInfo_validate } = require('../validate/user')

// 获取用户信息
router.get('/userinfo', userInfoHandler.userinfo)

// 更新用户信息
router.post('/updateInfo', expressJoi(reg_updateInfo_validate), userInfoHandler.updateInfo)

module.exports = router