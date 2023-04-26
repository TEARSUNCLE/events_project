const express = require('express')
const router = express.Router()

const userInfoHandler = require('../router_handler/userInfo')

const expressJoi = require('@escook/express-joi')
const { user_updateinfo_validate, update_password_validate, update_avatar_validate } = require('../validate/user')

// 获取用户信息
router.get('/userinfo', userInfoHandler.userinfo)

// 更新用户信息
router.post('/updateinfo', expressJoi(user_updateinfo_validate), userInfoHandler.updateinfo)

// 修改密码
router.post('/updatepwd', expressJoi(update_password_validate), userInfoHandler.updatepwd)

// 修改头像
router.post('/update/avatar', expressJoi(update_avatar_validate), userInfoHandler.updateAvatar)

module.exports = router