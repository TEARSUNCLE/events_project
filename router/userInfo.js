const express = require('express')
const router = express.Router()

const userInfoHandler = require('../router_handler/userInfo')

const expressJoi = require('@escook/express-joi')
const { user_updateinfo_validate, update_updatepwd_validate } = require('../validate/user')

// 获取用户信息
router.get('/userinfo', userInfoHandler.userinfo)

// 更新用户信息
router.post('/updateinfo', expressJoi(user_updateinfo_validate), userInfoHandler.updateinfo)

// 修改密码
router.post('/updatepwd', expressJoi(update_updatepwd_validate), userInfoHandler.updatepwd)

module.exports = router