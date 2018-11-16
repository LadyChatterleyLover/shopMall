const router = require('koa-router')()
const mongoose = require('mongoose')
const fs = require('fs')
router.prefix('/goods')

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log(MediaStreamErrorEvent)
      })
    })
  })
  ctx.body = "开始导入数据"
})

router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('插入成功:' + saveCount)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })

  })
  ctx.body = "开始导入数据....."
})

router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('插入成功:' + saveCount)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })

  })
  ctx.body = "开始导入数据....."
})


// 获取商品详情信息
router.post('/getDetailGoodsInfo', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  let goods = mongoose.model('Goods')
  await goods.findOne({ID: goodsId}).exec().then(result => {
    ctx.body = {
      code: 200,
      message: result
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

//获取商品大类
router.get('/getCategoryList', async (ctx) => {
  let category = mongoose.model('Category')
  await category.find().exec().then(result => {
    ctx.body = {
      code: 200,
      message: result
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})


// 获取商品小类
router.post('/getCategorySubList', async (ctx) => {
  let categorySub = mongoose.model('CategorySub')
  let categoryId = ctx.request.body.categoryId
  await categorySub.find({
    MALL_CATEGORY_ID: categoryId
  }).exec().then(result => {
    ctx.body = {
      code: 200,
      message: result
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

// 根据列表获取商品列表
router.post('/getGoodsListByCategorySubId', async (ctx) => {
  let goods = mongoose.model('Goods')
  let categorySubId = ctx.request.body.categorySubId

  // 分页功能
  let page = ctx.request.body.page
  let num = 10 // 每页显示数量
  let start = (page - 1) * num

  await goods.find({
    SUB_ID: categorySubId
  }).skip(start).limit(num).exec().then(result => {
    ctx.body = {
      code: 200,
      message: result
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})


module.exports = router
