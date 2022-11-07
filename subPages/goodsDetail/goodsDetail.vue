<template>
  <view>
    <view class="img">
      <image
        src="https://static.gute.fun/static/luckyOwn/lucky/dBanner.png"
        mode="widthFix" width="100%"></image>
      <view class="heart">
        <uni-icons v-if="true" type="heart" size="20" color="#f00"></uni-icons>
        <uni-icons v-else type="heart-filled" size="20" color="#f00"></uni-icons>
      </view>
      <view class="share">
        <uni-icons type="redo-filled" size="20" color="#8ec5fc"></uni-icons>
      </view>
      <view class="contact">
        <uni-icons type="contact-filled" size="20" color="#5348c9"></uni-icons>
        买家须知
      </view>
    </view>
    <view class="probability">
      <view class="title">
        <view>
          小米爆款音响29/个
        </view>
        <view style="display: flex;flex-direction: row">
          <view> 盲盒开箱必中以下宝贝之一</view>
          <view style="margin: 0 10px">
            <image src="https://static.gute.fun/static/luckyOwn/new_home/bottom-top-center.png" mode="widthFix"></image>
          </view>
        </view>
      </view>
      <view style="display: flex;align-items: center">
<!--        <view class="protext">-->
<!--          获得概率-->
<!--        </view>-->
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
    </view>
    <view class="goodCards">
      <view v-for="(item,index) in 10" style="margin: 20rpx;" :key="index">
        <good-card/>
      </view>
    </view>
    <view style="width: 100%;height: 100rpx;"></view>
    <view class="footer">
      <view>
        <view>
          立即开箱
        </view>
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
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80rpx;
    height: 50rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 0 10px 10px 0;
  }

  .share {
    position: absolute;
    top: 20rpx;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80rpx;
    height: 50rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 10px 0 0 10px;
  }
  .contact{
    position: absolute;
    bottom: 20rpx;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160rpx;
    height: 60rpx;
    text-align: center;
    font-size: 18rpx;
    color:#5348c9;
    background-color: #fff;
    border-radius: 10px 0 0 10px;
  }
}
.probability {
  padding: 10px 0;
  width: 100%;
  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
  .title{
    margin-bottom: 5px;
    width: 100%;
    view{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image{
        width: 32rpx;
        animation: sc 2000ms linear forwards infinite;
      }
    }
    @keyframes sc {
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(0.8);
      }
    }
  }
  .protext {
    width: 160rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 20rpx;
    letter-spacing: 2px;
    color: #fff;
    background-color: #a6c0fe;
    border-radius: 0 20rpx 0 0;
  }

  .proImg {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 40rpx;
    width: 100%;
    height: 140rpx;
    text-align: center;
    font-size: 20rpx;
    letter-spacing: 2px;
    color: #fff;
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
.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 10px;
  width: 100%;
  background: #fff;
  >view{
    width: 50vw;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background: url("https://static.gute.fun/static/luckyOwn/new_home/khan.png") no-repeat center/cover;
    >view{
      font-weight: bold;
      font-size: 36rpx;
      color: #fff;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      animation: t 3s infinite linear forwards;
    }
    @keyframes t {
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1.0);
      }
    }
  }
}
</style>
