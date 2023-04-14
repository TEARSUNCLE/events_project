const express = require('express')
const multer = require('multer')
const path = require('path')
// const upload = multer({ dest: path.join(__dirname, '../public/imgs') })
const router = express.Router()

const articleHandler = require('../router_handler/articles')
const { toHash } = require('../config')

const expressJoi = require('@escook/express-joi')
const { add_article_validate, list_article_validate, del_article_validate, update_article_validate } = require('../validate/articles')

// 静态资源添加后缀
const storage = multer.diskStorage({
  destination: (req, res, next) => {
    next(null, path.join(__dirname, '../public/imgs'))
  },
  filename: (req, file, next) => {
    const name = file.originalname.split(".")[0]
    const suffix = file.mimetype.split("/")[1]
    // name转换为hash，拼接后缀返回
    next(null, toHash(name) + '.' + suffix)
  }
})
const upload = multer({ storage, dest: path.join(__dirname, '../public/imgs') })

// 发布文章
router.post('/add', upload.single('cover_img'), expressJoi(add_article_validate), articleHandler.addArticle)

// 文章列表
router.post('/list', expressJoi(list_article_validate), articleHandler.articleList)

// 删除文章
router.post('/del', expressJoi(del_article_validate), articleHandler.delArticle)

// 修改文章
router.post('/update', upload.single('cover_img'), expressJoi(update_article_validate), articleHandler.updateArticle)

// 文章详情
router.post('/detail', expressJoi(del_article_validate), articleHandler.articleDetail)

module.exports = router