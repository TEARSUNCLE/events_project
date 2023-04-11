const express = require('express')
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../uploads') })
const router = express.Router()

const articleHandler = require('../router_handler/articles')

const expressJoi = require('@escook/express-joi')
const { add_article_validate, list_article_validate } = require('../validate/articles')

// 发布文章
router.post('/add', upload.single('cover_img'), expressJoi(add_article_validate), articleHandler.addArticle)

// 文章列表
router.post('/list', expressJoi(list_article_validate), articleHandler.articleList)

module.exports = router