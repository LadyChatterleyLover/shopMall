<template>
  <div class="goods-info" @click="goGoodsPage">
    <div class="goods-image">
      <img :src="goodsImage" width="90%"/>
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | monetFilter}}</div>
  </div>
</template>

<script>
  import {toMoney} from "../filter/filter"
  export default {
    name: 'goodsInfo',
    props: {
      goodsImage: {
        type: String
      },
      goodsName: {
        type: String
      },
      goodsPrice: {
        type: Number
      },
      goodsId: {
        type: String
      }
    },
    filters: {
      monetFilter (money) {
        return toMoney(money)
      }
    },
    methods: {
      goGoodsPage () {
        this.$router.push({path: '/goods', query: {goodsId: this.goodsId}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .goods-name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
