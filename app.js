const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const bodyparser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const logger = require('koa-logger')

// 路由引入
const users = require('./routes/user')

// 错误注册
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes注册
app.use(users.routes(), users.allowedMethods())

// 错误处理逻辑
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(config.port, function () {
  console.log(`listening on port ${config.port}`)
})