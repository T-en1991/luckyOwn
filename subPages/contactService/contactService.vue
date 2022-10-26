<template>
  <!-- <view class="server kf-container"> -->
  <!-- <view class="server_title">
    <view class="server_nav"></view>
    <view class="server-title_head flex">
      <view class="server_title_return" @click="retutnTop">
        <image src="/static/image/publice/fanhui@2x.png" mode=""></image>
      </view>
      <view class="server_title_name">联系客服</view>
      <view class="server_title_mp3">
      </view>
    </view>
  </view> -->
  <!-- <iframe src="https://totalk.jingge.chat/standalone.html?appId=259e0449e8c4451c9d9232a4114589be"></iframe> -->
  <!-- </view> -->
  <view class="server">
    <view class="server_head flex">
<!--      <image src="https://static.gute.fun/static/luckyOwn/image/publice/fanhui1@2x.png" mode="" @click="retutnTop"></image>-->
<!--      <text>联系客服</text>-->
<!--      <text></text>-->
    </view>
    <view class="server_main center">
      <view class="server_main_box">
        <view class="server_main_head">
          <image src="https://static.gute.fun/static/luckyOwn/pageB/mangheshangcheng@2x.png" mode=""></image>
        </view>
        <view class="server_main_name center">
          <text>盲盒商城</text>
          <text>{{ serve.number }}</text>
        </view>
        <view class="server_main_img">
          <image :src="serve.qrcode" mode="aspectFill"></image>
        </view>
        <view class="server_main_txt">扫码联系客服</view>
      </view>
      <view class="server-download center">
        <image src="https://static.gute.fun/static/luckyOwn/pageB/xiazai@2x.png" mode=""></image>
        <text>长按保存二维码</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      serve:{},//
    };
  },
  methods:{
    //返回上一级
    retutnTop () {
      uni.navigateBack()
    },
    //获取客服信息
    getServe () {
      this.$api.getServiceInfo().then(res=>{
        if (res.code === 1) {
          this.serve = res.data
        }
      })
    }
  },
  onLoad() {
    this.getServe()
  }
}
</script>

<style lang="scss">
.server {
  height: 100vh;
  background: $bjB no-repeat;
  background-size: cover;
  .server_head {
    padding: 0 30rpx;
    margin-bottom: 127rpx;
    image {
      width: 44rpx;
      height: 44rpx;
    }
    text {
      color: #FFFFFF;
      font-size: 36rpx;
      font-weight: bold;
      &:last-child {
        width: 44rpx;
      }
    }
  }
  .server_main {
    flex-direction: column;
  }
  .server_main_box {
    width: 525rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #F2F2F2;
    border-radius: 34rpx;
    .server_main_head {
      width: 132rpx;
      height: 132rpx;
      margin-bottom: 32rpx;
      margin-top: -66rpx;
      image {
        border-radius: 50%;
      }

    }
    .server_main_name {
      display: flex;
      margin-bottom: 24rpx;
      flex-direction: column;
      text {
        &:first-child {
          font-size: 46rpx;
          font-weight: bold;
        }
        &:last-child {
          color: #666666;
          font-size: 30rpx;
          margin-top: 23rpx;
        }
      }
    }
    .server_main_img {
      width: 430rpx;
      height: 430rpx;
    }
    .server_main_txt {
      color: #999999;
      font-size: 30rpx;
      padding: 20rpx 0 30rpx 0;
    }
  }
  .server-download {
    width: 523rpx;
    height: 89rpx;
    margin-top: 30rpx;
    background: #FFFFFF;
    border-radius: 18rpx;
    image {
      width: 42rpx;
      height: 42rpx;
      margin-right: 10rpx;
    }
    text {
      font-size: 30rpx;
      font-weight: bold;
    }
  }
}

.kf-container{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .server_title {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 2021;
    .server_nav {width: 100%;}
    .server-title_head {
      width: 100%;
      height: 88rpx;
      padding: 0 30rpx;
      background: #FFFFFF;
      .server_title_return {
        width: 44rpx;
        height: 44rpx;
      }
      .server_title_name {
        width: 466rpx;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 36rpx;
        font-weight: bold;
      }
      .server_title_mp3 {
        width: 44rpx;
        height: 44rpx;
      }
    }
  }
  iframe{
    flex: 1;
    border: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
