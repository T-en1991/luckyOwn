<template>
  <view class="order">
    <view class="order_head flex">
      <view class="order_head_li center" @click="changeIndex(index)" :class="{active:index == i}" v-for="(item,index) in 2" :key="index">{{ index == 0 ? '已申请' : '已发货' }}</view>
    </view>
    <view class="order_ul">
      <view class="order_li" v-for="(item,index) in orderList" :key="index" @click="goOrderMessage(item)">
        <view class="order_li_head flex">
          <text>订单号：{{ item.delivery_order_no }}</text>
          <text>{{ item.status }}</text>
        </view>
        <view class="order_li_main">
          <view class="order_li_main_li flexs">
            <view class="order_li_img">
              <image :src="item.goods_image" mode="aspectFill"></image>
            </view>
            <view class="order_li_con">
              <view class="order_li_name">{{ item.goods_name }}</view>
              <view class="order_li_price">{{ item.goods_coin_price }}金币</view>
            </view>
          </view>
        </view>
        <view class="order_li_time flex">
          <text>下单时间</text>
          <text>{{ item.time }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      i:0,//选择哪个
      page:1,//f分页
      pages:0,//总页数
      orderList:[],//订单列表
    };
  },
  methods:{
    //去订单详情
    goOrderMessage (item) {
      uni.navigateTo({url:'/pages/me/order-details?id=' + item.delivery_order_id})
    },
    //切换
    changeIndex (index) {
      this.i = index
      this.page = 1
      this.getOrderList()
    },
    //获取订单列表
    getOrderList () {
      this.pages = 0
      this.orderList=[]
      // this.$api.myOrderList({status: Number(this.i) + 1,page:this.page,msg:'数据加载中'}).then(res=>{
      //   uni.stopPullDownRefresh()
      //   if (res.code === 1) {
      //     this.pages = res.data.last_page
      //     this.orderList = this.page == 1 ? res.data.data : [...this.orderList,...res.data.data]
      //     console.log(res.data);
      //   }
      // })
    }
  },
  onLoad ({type}) {
    this.i = type || 0
  },
  onShow() {
    this.getOrderList()
  },
  onPullDownRefresh() {
    this.page = 1
    this.getOrderList()
  },
  onReachBottom() {
    if (this.page < this.pages) {
      this.page++
      this.getOrderList()
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  padding: 0 30rpx;
}
.order_head {
  width: 100%;
  top: 44px;
  padding: 0 50rpx;
  position: sticky;
  height: 90rpx;
  z-index: 2021;
  background: #FAFAFA;
  .order_head_li {
    font-weight: bold;
    font-size: 30rpx;
  }
  .active {
    color: #69a8f8;
  }
}
.order_li {
  overflow: hidden;
  margin-bottom: 20rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  .order_li_head {

    height: 60rpx;
    padding: 0 30rpx;
    background: #FFFFFF;
    border-bottom: 2rpx solid #FAFAFA;

    text {
      color: #999999;
      font-size: 26rpx;
      &:last-child {
        color: #F6AF32;
        font-size: 24rpx;
      }
    }
  }
  .order_li_main {
    padding: 30rpx 0;
  }
  .order_li_main_li {
    padding: 0 30rpx;
    .order_li_img {
      width: 168rpx;
      height: 168rpx;
      margin-right: 20rpx;
      image {
        border-radius: 10rpx;
      }

    }
    .order_li_con {
      display: flex;
      flex-direction: column;
      height: 168rpx;
      .order_li_name {
        font-size: 28rpx;
        line-height: 36rpx;
      }
      .order_li_price {
        color: #CF271B;
        font-size: 28rpx;
        margin-top: 20rpx;
      }
    }

  }
  .order_li_time {
    padding: 20rpx 30rpx;
    border-top: 2rpx solid #FAFAFA;
    text {
      color: #999999;
      &:first-child {
        font-size: 26rpx;
      }
    }
  }
}
</style>
