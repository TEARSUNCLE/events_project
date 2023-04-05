const Joi = require('joi')

// 新增文章校验
const name = Joi.string().required()
// alphanum() 仅支持大小写字幕和数字
const alias = Joi.string().alphanum().required()

exports.add_cates_validate = {
  body: {
    name,
    alias
  }
}