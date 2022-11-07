<template>
  <view class="address">
    <view class="address_wu" v-if="addressList.length == 0">
      <view class="address_wu_img center">
        <image src="https://static.gute.fun/static/luckyOwn/publice/zanwushouhuo@2x.png" mode=""></image>
        <text>暂无收货地址</text>
      </view>
      <button class="address_wu_btn" hover-class="hover-view" @click="address(0)">添加收货地址</button>
    </view>
    <view class="address_have" v-else>
      <view class="address_have_ul">
        <view class="address_have_li flex" v-for="(item,index) in addressList" :key="index" @click="selectAddress(item)">
          <view class="address_have_li_main">
            <view class="address_have_li_title">{{ item.province }} {{ item.city }} {{ item.area }}</view>
            <view class="address_have_li_txt">{{ item.detail }}</view>
            <view class="address_have_li_name flexs">
              <text>{{ item.username }}</text>
              <text>{{ item.mobile }}</text>
            </view>
          </view>
          <view class="address_have_li_edit" @click.stop="editAddress(item)">
            <image src="https://static.gute.fun/static/luckyOwn/me/bianji@2x.png" mode=""></image>
          </view>
        </view>
      </view>
      <button class="address_have_btn address_wu_btn" @click="address(0)">新增收货地址</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type:1,//1回收选择地址
      addressList:[]
    };
  },
  methods:{
    //编辑地址
    editAddress (item) {
      uni.setStorageSync('editAddress',JSON.stringify(item))
      uni.navigateTo({url:'/subPages/addAddress/addAddress?type=1'})
    },
    //选择地址
    selectAddress (item) {
      if (this.type == 1 || this.type ==  2) {
        uni.setStorageSync(this.type == 1 ? 'applyAddress' : '',JSON.stringify(item))
        uni.navigateBack()
      }
    },
    address (type) {
      uni.navigateTo({url:'/subPages/addAddress/addAddress?type=' + type})
    },
    //获取收货地址
    getAddressList () {
      this.$api.myAddress().then(res=>{
        if (res.code === 1) {
          this.addressList = res.data
          if (res.data.length == 0) {
            uni.removeStorageSync('applyAddress')
          }
        }
      })
    }
  },
  onLoad ({type}) {
    this.type = type
  },
  onShow () {
    this.getAddressList()
  }
}
</script>

<style lang="scss">
.address_wu {
  display: flex;
  padding: 165rpx 30rpx 35rpx 30rpx;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 44px);
  .address_wu_img {
    flex-direction: column;
    image {
      width: 354rpx;
      height: 310rpx;
      margin-bottom: 50rpx;
    }
    text {
      font-size: 28rpx;
      font-weight: bold;
    }
  }

}
.address_wu_btn {
  height: 98rpx;
  color: #333333;
  font-size: 30rpx;
  font-weight: bold;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 121rpx 0rpx rgba(63, 52, 2, 0.12);
  border-radius: 10rpx;
}
.address_have_ul {
  padding: 30rpx 30rpx 130rpx 30rpx;
  .address_have_li {
    padding: 30rpx;
    margin-bottom: 30rpx;
    background: #FFFFFF;
    .address_have_li_title {
      color: #666666;
      font-size: 28rpx;
    }
    .address_have_li_txt {
      font-size: 26rpx;
      margin: 20rpx 0;
    }
    .address_have_li_name {
      text {
        color: #999999;
        font-size: 30rpx;
        &:last-child {
          font-size: 28rpx;
          margin-left: 20rpx;
        }
      }
    }
    .address_have_li_edit {
      width: 44rpx;
      height: 44rpx;
    }
  }
}
.address_have_btn {
  width: 690rpx;
  left: 50%;
  bottom: 34rpx;
  transform: translateX(-50%);
  position: fixed;
}

</style>
