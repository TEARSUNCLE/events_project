const express = require('express')
const app = express()
// 表单验证 依赖包
const Joi = require('joi')
const config = require('./config')
// 解析 token 依赖包
const expressJWT = require('express-jwt')

// cors跨域
const cors = require('cors')
app.use(cors())

// 解析表单中间件
app.use(express.urlencoded({ extended: false }))

// 响应数据 => err错误处理
app.use((req, res, next) => {
  // code === 1 默认为错误处理
  res.errHandler = (err, code = 1) => {
    res.send({
      code,
      // err 可能是Error错误对象 也有可能是自定义的字符串
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 解析 token 中间件
app.use(expressJWT({ secret: config.tokenKey }).unless({ path: [/^\/api\//] }))

// 全局路由
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 全局错误处理中间件
app.use((err, req, res, next) => {
  // 校验未通过
  if (err instanceof Joi.ValidationError) return res.errHandler(err)
  // 身份验证未通过
  if (err.name === 'UnauthorizedError') return res.errHandler('身份验证失败！')
  // 未知错误
  res.errHandler(err)
})

app.listen(3006, () => {
  console.log('项目已运行, http://127.0.0.1:3006')
})