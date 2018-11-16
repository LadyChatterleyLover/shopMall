<template>
  <div class="floor">
    <div class="floor-title">{{floorTitle}}</div>
    <div class="floor-anomaly">
      <div class="floor-one">
        <img :src="floorData0.image" width="100%"/>
      </div>
      <div>
        <div class="floor-two">
          <img :src="floorData1.image" width="100%"/>
        </div>
        <div>
          <img :src="floorData2.image" width="100%"/>
        </div>
      </div>
    </div>

    <div class="floor-rule">
      <div v-for="(item, index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'floor',
    props: {
      floorData: {
        type: Array,
        default: []
      },
      floorTitle: {
        type: String
      }
    },
    data () {
      return {
        floorData0: {},
        floorData1: {},
        floorData2: {},
      }
    },
    watch: {
      floorData (val) {
        this.floorData0 = this.floorData[0]
        this.floorData1 = this.floorData[1]
        this.floorData2 = this.floorData[2]
      }
    }
  }
</script>

<style scoped lang="scss">
  .floor {
    .floor-anomaly {
      display: flex;
      background: #fff;
      border-bottom: 1px solid #ddd;
      div {
        flex: 1;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }
      .floor-one {
        border-right: 1px solid #ddd;
      }
      .floor-two {
        border-right: 1px solid #ddd;
      }
    }
    .floor-title {
      text-align: center;
      font-size: 14px;
      height: 1.8rem;
      line-height: 1.8rem;
    }
    .floor-rule {
      display: flex;
      background: #fff;
      flex-wrap: wrap;
      div {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        flex: 1;
        border-bottom: 1px solid #ddd;
        &:nth-child(odd) {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
</style>
