<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in slide" :key="index" class="swiperSlide">
        Slide {{item}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'swiperBar',
    data () {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        slide: [1,2,3,4,5,6]
      }
    }
  }
</script>

<style scoped lang="scss">
  .swiperSlide {
    height: 4rem;
    text-align: center;
    padding-top: 3rem;
    border-bottom: 1px solid #ccc;
  }
</style>
