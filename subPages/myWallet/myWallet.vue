<template>
  <view class="wallet">
    <view class="wallet_head">
      <view class="wallet_head_txt">余额:(金币）</view>
      <view class="wallet_head_price">{{ wallet || 0}}</view>
      <view class="wallet_head_btn">
        <button hover-class="hover-view" @click="recharge">充值</button>
      </view>
    </view>
    <view class="balance_main">
      <view class="balance_main_head center">账单明细</view>
      <view class="balance_main_list">
        <view class="balance_main_list_li flex" v-for="(item,index) in walletList" :key="index">
          <view class="balance_main_list_li_con">
            <view class="balance_main_list_li_name">{{ item.type }}</view>
            <view class="balance_main_list_li_time">时间：{{ item.create_time }}</view>
          </view>
          <view class="balance_main_list_li_price" :class="{blue:item.coin < 0} ">{{ item.coin }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      page:1,
      pages:0,
      wallet:'',//金币数量
      walletList:[],//金币列表
    };
  },
  methods:{
    //去充值
    recharge () {
      uni.navigateTo({url:'/pages/me/recharge'})
    },
    //获取金币列表
    getWalletList () {
      this.$api.myCoin({page:this.page,msg:'数据加载中'}).then(res=>{
        if (res.code === 1) {
          this.wallet = res.data.balance
          this.pages = res.data.record.last_page
          this.walletList = this.page == 1 ? res.data.record.data : [...this.walletList,...res.data.record.data]
        }
      })
    }
  },
  onLoad({token}) {
    if (token) {
      uni.setStorageSync('token',token)
    }
    this.getWalletList()
  },
  onReachBottom() {
    if (this.page < this.pages) {
      this.page++
      this.getWalletList()
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet {
  padding: 30rpx 30rpx 0 30rpx;
}
.wallet_head {
  height: 220rpx;
  margin-bottom: 60rpx;
  background: $yuebeijing no-repeat;
  background-size: cover;
  padding: 30rpx 30rpx 30rpx 40rpx;
  .wallet_head_txt {
    color: #FFFFFF;
    font-size: 28rpx;
  }
  .wallet_head_price {
    color: #FFFFFF;
    font-size: 60rpx;
    font-weight: bold;
    line-height: 1;
  }
  .wallet_head_btn {
    display: flex;
    justify-content: flex-end;
    button {
      width: 150rpx;
      height: 60rpx;
      background: #F6AF32;
      border-radius: 30rpx;
    }
  }
}
.balance_main_head {
  background: #FFFFFF;
  height: 80rpx;
  font-size: 30rpx;
  font-weight: bold;
  border-radius: 10rpx 10rpx 0rpx 0rpx;
  border-bottom: 2rpx solid #FAFAFA;
}
.balance_main_list {
  background: #FFFFFF;
  border-radius: 0rpx 0rpx 10rpx 10rpx;
  .balance_main_list_li {
    padding: 20rpx 30rpx;
    border-bottom: 2rpx solid #FAFAFA;
    .balance_main_list_li_name {
      color: #666666;
      font-size: 26rpx;
      margin-bottom: 20rpx;
    }
    .balance_main_list_li_time {
      color: #999999;
    }
    .balance_main_list_li_price {
      color: #F6AF32;
      font-size: 30rpx;
    }
    .blue {
      color: #327CF6;
    }
  }
}
</style>
