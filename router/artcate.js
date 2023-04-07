const express = require('express')
const router = express.Router()

const artcateHandler = require('../router_handler/artcate')

const expressJoi = require('@escook/express-joi')
const { add_cates_validate, del_cates_validate, list_cates_validate, edit_cates_validate } = require('../validate/artcate')

// 获取文章列表
router.post('/cates', expressJoi(list_cates_validate), artcateHandler.getArticleCates)

// 新增文章
router.post('/addcates', expressJoi(add_cates_validate), artcateHandler.addArticleCates)

// 删除文章
router.post('/delcates', expressJoi(del_cates_validate), artcateHandler.delArticleCates)

// 修改文章
router.post('/updatecates', expressJoi(edit_cates_validate), artcateHandler.updateArticleCates)

module.exports = router