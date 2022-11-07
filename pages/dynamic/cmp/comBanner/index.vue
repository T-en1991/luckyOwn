<template>
  <view class="comBanner">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
            :duration="duration">
      <swiper-item v-for="(item,index) in list3">
        <image :src="item" width="100%" mode="widthFix"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list3: [
        `https://static.gute.fun/static/luckyOwn/lucky/dBanner.png`
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.comBanner{
  position: relative;
  top:0;
  left: 0;
  .rectangle{
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    height: 60upx;
    background: #00000099;
    box-shadow: 0 -6px 6px #ffffff59;
    border-radius: 20px 20px 0 0
  }
}
</style>
