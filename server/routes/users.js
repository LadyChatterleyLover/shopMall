const router = require('koa-router')()
const mongoose = require('mongoose')

router.prefix('/users')

router.get('/', async (ctx, next) =>{
  ctx.body = 'this is a users response!'
})

router.post('/register',async(ctx)=>{
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  await newUser.save().then(()=>{
    ctx.body={
      code:200,
      message:'注册成功'
    }
  }).catch(error=>{
    ctx.body={
      code:500,
      message:error
    }
  })
})


router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  let username = loginUser.username
  let password = loginUser.password
  const User = mongoose.model('User')
  await User.findOne({
    username
  }).exec().then(async (result) => {
    console.log(result)
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password).then((isMatch) => {
        ctx.body = {
          code: 200,
          message: '登录成功'
        }
      }).catch(err => {
        console.log(err)
        ctx.body = {
          code: 500,
          message: err
        }
      })
    } else {
      ctx.body = {
        code: 200,
        message: '用户名不存在'
      }
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      code: 500,
      message: err
    }
  })
})
module.exports = router
