<template>
  <view class="dynamic">
    <view>
      <com-banner></com-banner>
    </view>
    <view class="dynamic_card">
      <view v-if="list.length">
        <view style="margin: 20rpx;" v-for="(item,index) in list" :key="index">
          <d-card :item="item"/>
        </view>
      </view>
      <view v-else class="dynamic_card_empty">
        暂无上新动态
      </view>
    </view>
  </view>
</template>

<script>
import DCard from './cmp/DCard'
import comBanner from './cmp/comBanner'

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          url: 'https://static.gute.fun/static/luckyOwn/lucky/pic1.png'
        },
        {
          id: 2,
          url: 'https://static.gute.fun/static/luckyOwn/lucky/pic2.png'
        },
        {
          id: 3,
          url: 'https://static.gute.fun/static/luckyOwn/lucky/pic3.png'
        },
        {
          id: 4,
          url: 'https://static.gute.fun/static/luckyOwn/lucky/pic1.png'
        },
        {
          id: 5,
          url: 'https://static.gute.fun/static/luckyOwn/lucky/pic2.png'
        },
        {
          id: 6,
          url: 'https://static.gute.fun/static/luckyOwn/lucky/pic3.png'
        },
      ],
    }
  },
  components: {
    DCard,
    comBanner
  },
  methods: {}
}
</script>

<style lang="scss">
.dynamic {
  min-height: 100vh;

  .dynamic_card {

    .dynamic_card_empty {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400rpx;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
