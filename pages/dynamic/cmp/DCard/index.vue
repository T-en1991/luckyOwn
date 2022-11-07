<template>
  <view class="d-card">
    <view>
      <image style="width:240rpx" mode="widthFix" :src="item.url"></image>
    </view>
    <view class="rig">
      <view class="title">【端午竞技场】火影忍者</view>
      <view class="money">￥29元/抽</view>
      <view class="footer">
        <image style="width:40rpx" mode="widthFix" src="https://static.gute.fun/static/luckyOwn/lucky/alarm.png"></image>
        <view>上新时间：2022-07-07 23:00</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "index",
  props:{
    item:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .d-card{
    display: flex;
    padding: 20rpx;
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    .rig{
      display: flex;
      flex-direction: column;
      margin: 20rpx;
      .title{
        font-size: 28rpx;
        font-weight: bold;
      }
      .money{
        margin: 28rpx 0;
        color:red;
        font-size: 28rpx;
        font-weight: bold;
      }
      .footer{
        display: flex;
        align-items: center;
        >view{
          color:#ccc;
          font-size: 20rpx;
        }
      }
    }
  }
</style>
