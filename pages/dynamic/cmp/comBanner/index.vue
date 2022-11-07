<template>
  <view class="comBanner">
    <u-swiper
      :list="list3"
      height="200"
      indicatorMode="line"
      circular
    ></u-swiper>
<!--    <view class="rectangle"></view>-->
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list3: [
        'https://blogserve.gute.fun/statics/luckly/banner1.png',
        'https://blogserve.gute.fun/statics/luckly/banner2.png',
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
