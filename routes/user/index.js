const router = require('koa-router')()
const mysql = require('../../lib/mysql.js')

router.get('/', async (ctx, next) => {
  ctx.body = {
    user_name: 'lisi',
    age: 18
  }
})

router.post('/register', async (ctx, next) => {
  let { userName, classId, gender, score} = ctx.request.body
  await mysql.insertUser([userName,classId,gender,score]).then(res => {
    ctx.body = {
      userName,
      classId,
      gender,
      score
    }
  })
})

module.exports = router