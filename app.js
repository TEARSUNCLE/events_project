const express = require('express')
const app = express()
// 表单验证 依赖包
const Joi = require('joi')
const config = require('./config')
// 解析 token 依赖包
const expressJWT = require('express-jwt')
// swagger
const swaggerUi = require('swagger-ui-express')

// cors跨域
const cors = require('cors')
app.use(cors())

// 解析表单中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 静态资源托管
app.use('/static', express.static('./public/imgs'))

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

// swagger
const swaggerDoc = require('./swaggerJSON/common.json')
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// 全局路由
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const artcateRouter = require('./router/artcate')
const articleRouter = require('./router/articles')
app.use('/api', userRouter)
app.use('/my', userInfoRouter)
app.use('/my/article', artcateRouter)
app.use('/my/article', articleRouter)

// 全局错误处理中间件
app.use((err, req, res, next) => {
  // 校验未通过
  if (err instanceof Joi.ValidationError) return res.errHandler(err)
  // 身份验证未通过
  if (err.name === 'UnauthorizedError') return res.errHandler('身份验证失败！', 401)
  // 未知错误
  res.errHandler(err)
})

app.listen(3006, () => {
  console.log(process.env.NODE_ENV === 'production' ? '项目已运行, http://127.0.0.1:3006' : '项目已运行, http://114.132.224.49:3006')
})  