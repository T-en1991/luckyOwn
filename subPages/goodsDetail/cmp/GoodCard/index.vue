<template>
  <view class="goodCard">
    <view class="level">
      <image src="../../../../static/image/lucky/cs.png"></image>
    </view>
    <view class="block">
      <view class="block_image">
        <image src="http://bab668.oss-cn-shanghai.aliyuncs.com/eba4be6cd34bcd817556601ef6aa960d.jpg"></image>
      </view>
      <view class="block_content">
        <view class="content">MIUI/小米 Xiaomi 12 Pro骁龙8 5G手机小米12系列</view>
        <view class="price">￥120.23</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.goodCard {
  padding: 20rpx;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  .level {

    image {
      width: 64rpx;
      height: 64rpx;
    }
  }

  .block {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .block_image {
      image {
        width: 160rpx;
        height: 160rpx;
      }
    }

    .block_content {
      margin-left: 10rpx;
      .content {
        font-size: 28rpx;
        font-weight: bold;
        line-height: 40rpx;
      }

      .price {
        width:100%;
        text-align: right;
        color:red;
        font-size: 32rpx;
      }
    }
  }
}
</style>
