<template>
  <div class="goods">
    <div class="navBar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格: ￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div v-html="goodsInfo.DETAIL" class="detail">

          </div>
        </van-tab>
        <van-tab title="评论">
          评论
        </van-tab>
      </van-tabs>
    </div>
    <div  class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant'
  import url from '../config/api.config'
  import {toMoney} from '../filter/filter'
  export default {
    name: 'goods',
    data() {
      return {
        goodsId: '',
        goodsInfo: {}
      }
    },
    filters: {
      moneyFilter (money) {
        return toMoney(money)
      }
    },
    methods: {
      getGoods() {
        this.$com.post(url.goods, {
          goodsId: this.goodsId
        }).then(response => {
          let res = response.data.message
          if (res) {
            this.goodsInfo = res
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      addGoodsToCart () {
        let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
        let isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId)
        if (!isHaveGoods) {
          let newGoodsInfo = {
            goodsId: this.goodsInfo.ID,
            name: this.goodsInfo.NAME,
            price: this.goodsInfo.PRESENT_PRICE,
            image:  this.goodsInfo.IMAGE1,
            count: 1
          }
          cartInfo.push(newGoodsInfo)
          // localStorage.cartInfo = JSON.stringify(cartInfo)
          console.log(JSON.stringify(cartInfo))
          localStorage.setItem('cartInfo', JSON.stringify(cartInfo))
          Toast.success('添加成功')
        } else {
          Toast.success('已有此商品')
        }
        this.$router.push('cart')
      }
    },
    created() {
      this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
      this.getGoods()
    }
  }
</script>

<style scoped lang="scss">
  .goods {
    .goods-name, .goods-price {
      background: #fff;
    }
    .detail {
      img {
        font-size: 0;
      }
    }
    .goods-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      div {
        flex: 1;
        padding: 5px;
      }
    }
  }
</style>
