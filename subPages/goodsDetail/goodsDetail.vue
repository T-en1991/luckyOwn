<template>
  <view>
    <view class="img">
      <image
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png"
        mode="widthFix" width="100%"></image>
      <view class="heart">
        <uni-icons v-if="true" type="heart" size="28" color="#f00"></uni-icons>
        <uni-icons v-else type="heart-filled" size="28" color="#f00"></uni-icons>
      </view>
      <view class="share">
        <uni-icons type="redo-filled" size="28" color="#00f"></uni-icons>
      </view>
    </view>
    <view class="probability">
      <view class="protext">
        获得概率
      </view>
      <view class="proImg">
        <view>
          <image class="" src="../../static/image/lucky/cs.png"></image>
          <view class="proVal">0.03%</view>
        </view>
        <view>
          <image src="../../static/image/lucky/ss.png"></image>
          <view class="proVal">0.03%</view>
        </view>
        <view>
          <image src="../../static/image/lucky/xy.png"></image>
          <view class="proVal">0.03%</view>
        </view>
        <view>
          <image src="../../static/image/lucky/pt.png"></image>
          <view class="proVal">0.03%</view>
        </view>
      </view>
    </view>
    <view class="goodCards">
      <view v-for="item in 10" style="margin: 12rpx 0;" :key="item">
        <good-card/>
      </view>

    </view>
  </view>
</template>

<script>
import GoodCard from './cmp/GoodCard'
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons";

export default {
  data() {
    return {}
  },
  components: {
    UniIcons,
    GoodCard
  },
  onLoad: function (option) {
    console.log(option);
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.img {
  position: relative;
  top: 0;
  left: 0;

  image {
    width: 100%;
  }

  .heart {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
  }

  .share {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
  }
}

.probability {
  display: flex;
  align-items: center;
  width: 100%;
  height: 200rpx;
  background-color: #404040;

  .protext {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 20rpx;
    letter-spacing: 2px;
    color: #fff;
    background-color: #696969;
    border-radius: 0 10px 0 0;
  }

  .proImg {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 40rpx;
    width: 460rpx;
    height: 140rpx;
    text-align: center;
    font-size: 20rpx;
    letter-spacing: 2px;
    color: #fff;
    background-color: #696969;
    border-radius: 6px;

    > view {
      overflow: hidden;

      image {
        width: 64rpx;
        height: 64rpx;
      }

      .proVal {
        margin-top: 10rpx;
        color: #fff;
        font-size: 16rpx;
      }
    }
  }
}

.goodCards {
  padding: 20rpx;
}
</style>
