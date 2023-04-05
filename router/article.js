const express = require('express')
const router = express.Router()

const articleHandler = require('../router_handler/article')

// 获取文章列表
router.get('/cates', articleHandler.getArticleCates)

module.exports = router