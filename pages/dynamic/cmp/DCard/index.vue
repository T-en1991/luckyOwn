<template>
  <view class="d-card">
<!--    <view class="t_l">-->
<!--      <image src="https://blogserve.gute.fun/statics/luckly/yuanquan.png" style="width:40upx;height:40upx" ></image>-->
<!--    </view>-->

	<view>
      <u-row justify="space-between">
        <u-col span="3">
          <view style="display: flex;justify-content: right">
            <image src="https://blogserve.gute.fun/statics/luckly/shangxin.png" style="width:128upx;height: 56upx" ></image>
          </view>
        </u-col>
        <u-col span="9">
          <view style="font-size: 12px;font-weight:100;text-align: right;color: #fff">2022-09-09 22:22 上新</view>
        </u-col>
      </u-row>
    </view>

    <u-row class="card">
      <u-col :span="5">
        <image src="https://blogserve.gute.fun/statics/luckly/goods.png" style="width:100%;height: 160upx" ></image>
      </u-col>
      <u-col class="des" :span="7" style="display:flex;flex-direction:column;justify-content: space-between;align-items: normal">
        <view style="margin-top:12upx;color: #E3D79D;font-size: 14px;font-family:'YS'">
          （端午竞技场）火影忍者
        </view>
        <view style="display:flex;justify-content:space-between;align-items:center;color: red;font-size: 14px">
         <view>
           ￥29.8/抽
         </view>
          <view>
            <image src="https://blogserve.gute.fun/statics/luckly/alarm.png" style="width:64upx;height: 64upx" ></image>
          </view>
        </view>
      </u-col>

    </u-row>
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.d-card {
  position: relative;
  top: 0;
  left: 0;
  padding: 0 0 40upx 40upx;
  //border-left: 2px solid #f00;

  .t_l {
    position: absolute;
    top: -20upx;
    left: -20upx;
  }

  .card {
    margin: 10upx 0;
    padding: 20upx;
    background: url("https://blogserve.gute.fun/statics/luckly/cardBg.png") no-repeat center/cover;
    .des{
      height: 160upx;
      font-size: 12px;
      .card_title{
        margin-top:12upx;
        color: #f00;
        font-size: 12px;
        font-family: "YS";
      }
    }
  }
}
</style>
