<template>
  <div>
    <div class="search-bar">
      <van-row>
      <van-col span="3">
        <img :src="locationIcon" width="100%" class="locationIcon"/>
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input"/>
      </van-col>
      <van-col span="5">
        <van-button size="mini">查找</van-button>
      </van-col>
    </van-row>
    </div>

    <div class="swiper-area">
        <van-swipe :autoplay="5000">
          <van-swipe-item v-for="(item,index) in bannerArr" :key="index">
            <img :src="item.image" width="100%"/>
          </van-swipe-item>
        </van-swipe>
    </div>

    <div class="type-bar">
      <div v-for="(item, index) in category" :key="index">
        <img :src="item.image" width="90%"/>
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>

    <div>
      <img :src="adBanner.PICTURE_ADDRESS" width="100%"/>
    </div>

    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%"/>
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <floor :floorData="floor1" :floorTitle="floorName.floor1"></floor>
    <floor :floorData="floor2" :floorTitle="floorName.floor2"></floor>
    <floor :floorData="floor3" :floorTitle="floorName.floor3"></floor>

    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row :gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image"
                          :goodsName="item.name"
                          :goodsPrice="item.price"
                          :goodsId="item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import floor from '../components/floor'
  import goodsInfo from '../components/goodsInfo'
  import {toMoney} from "../filter/filter"
  import url from '../config/api.config'
  export default {
    name: "shopMall",
    components: {
      floor,
      goodsInfo
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 3
        },
        locationIcon: require('../assets/images/location.png'),
        bannerArr: [],
        category: [],
        adBanner: '',
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        hotGoods: []
      }
    },
    filters: {
      moneyFilter (money) {
        return toMoney(money)
      }
    },
    created () {
      axios({
        url: url.getShopMallInfo,
        method: 'get'
      }).then(response => {
        let res = response.data.data
        if (res) {
          this.category = res.category
          this.adBanner = res.advertesPicture
          this.bannerArr = res.slides
          this.recommendGoods = res.recommend
          this.floor1 = res.floor1
          this.floor2 = res.floor2
          this.floor3 = res.floor3
          this.floorName = res.floorName
          this.hotGoods = res.hotGoods
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped lang="scss">
  $color:#e5017d;
  .search-bar {
    height: 2.2rem;
    background-color: $color;
    line-height: 2.2rem;
    overflow: hidden;
    .search-input {
      width: 100%;
      height: 1.3rem;
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid #fff !important;
      background-color:$color;
      color: #fff;
    }
    .locationIcon {
      padding-top: .2rem;
      padding-left: .3rem;
    }
  }
  .swiper-area {
    clear: both;
    max-height: 12rem;
    overflow: hidden;
  }
  .type-bar {
    width: 100%;
    background: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      flex: 1;
      padding: .3rem;
      font-size: 12px;
      text-align: center;
    }
  }
  .recommend-area {
    background: #fff;
    margin-top: .3rem;
    .recommend-title {
      border-bottom: 1px solid #eee;
      font-size: 14px;
      padding: .2rem;
      color: $color;
    }
    .recommend-body {
      border-bottom: 1px solid #eee;
      .recommend-item {
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
</style>
