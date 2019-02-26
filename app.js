const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const bodyparser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const logger = require('koa-logger')

// 路由引入
const users = require('./routes/user')
const upyun = require('./routes/upyun')

// 错误注册
onerror(app)

// post请求解析body中间价
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// 日志中间件
app.use(logger())

// routes注册
app.use(users.routes(), users.allowedMethods())
app.use(upyun.routes(), upyun.allowedMethods())

// 错误处理逻辑
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(config.port, function () {
  console.log(`listening on port ${config.port}`)
})