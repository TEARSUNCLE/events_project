const Joi = require('joi')

// 新增文章校验
const name = Joi.string().required()
// alphanum() 仅支持大小写字幕和数字
const alias = Joi.string().alphanum().required()

// 删除、更新、获取指定文章
const id = Joi.number().integer().min(1).required()

exports.add_cates_validate = {
  body: {
    name,
    alias
  }
}

exports.del_cates_validate = {
  body: {
    id
  }
}