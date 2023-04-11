const Joi = require('joi')

// 发布文章
const title = Joi.string().required()
const cate_id = Joi.number().integer().min(1).required()
const content = Joi.string().required().allow('')
const status = Joi.string().pattern(/^[1,2]$/).required()

// 文章列表
const page = Joi.number().integer().min(1).required()
const pageSize = Joi.number().integer().min(5).required()

exports.add_article_validate = {
  body: {
    title,
    cate_id,
    content,
    status
  }
}

exports.list_article_validate = {
  body: {
    page,
    pageSize,
    title: Joi.string(),
    content: Joi.string(),
    pub_date: Joi.string(),
    status: Joi.number().integer(),
    cate_id: Joi.number().integer(),
    author_id: Joi.number().integer(),
  }
}