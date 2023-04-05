const express = require('express')
const router = express.Router()

const articleHandler = require('../router_handler/article')

const expressJoi = require('@escook/express-joi')
const { add_cates_validate } = require('../validate/article')

// 获取文章列表
router.get('/cates', articleHandler.getArticleCates)

// 新增文章
router.post('/addcates', expressJoi(add_cates_validate), articleHandler.addArticleCates)

module.exports = router