const express = require('express')
const app = express()

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

// 全局路由
const userRouter = require('./router/user')
const Joi = require('joi')
app.use('/api', userRouter)

// 全局错误处理中间件
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.errHandler(err)
  res.errHandler(err)
  // next()
})

app.listen(3006, () => {
  console.log('项目已运行, http://127.0.0.1:3006')
})