const express = require('express')
const app = express()

// cors跨域
const cors = require('cors')
app.use(cors())

// 解析表单中间件
app.use(express.urlencoded({ extended: false }))

// 路由
const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => {
  console.log('项目已运行, http://127.0.0.1:3007')
})