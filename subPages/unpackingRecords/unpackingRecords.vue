<template>
  <view class="coll">
    <view class="box_ul">
      <view class="box_ul_li flexs" v-for="(item,index) in recordList" :key="index">
        <view class="box_ul_li_img">
          <image :src="item.image" mode="aspectFill"></image>
        </view>
        <view class="box_ul_li_main">
          <view class="box_ul_li_name">{{ item.box_name }}</view>
          <view class="box_ul_li_price">{{ item.coin_amount }}金币</view>
          <view class="box_ul_li_time">时间：{{ item.time }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      page:1,//分页
      pages:0,//总页数
      recordList:[],//记录列表
    };
  },
  methods:{
    //获取开箱记录
    getRecord () {
      this.$api.openRecord({page:this.page,msg:'数据加载中'}).then(res=>{
        uni.stopPullDownRefresh()
        if (res.code === 1) {
          this.recordList = this.page == 1 ? res.data.data : [...this.recordList,...res.data.data],
            this.pages = res.data.last_page
        }
      })
    }
  },
  onLoad() {
    this.getRecord()
  },
  onPullDownRefresh() {
    this.page = 1
    this.getRecord()
  },
  onReachBottom() {
    if (this.page < this.pages) {
      this.page++
      this.getRecord()
    }
  }
}
</script>

<style lang="scss" scoped>
.box_ul {
  padding: 30rpx 30rpx 0 30rpx;
  .box_ul_li {
    padding: 30rpx;
    margin-bottom: 20rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    .box_ul_li_img {
      image {
        width: 168rpx;
        height: 168rpx;
        border-radius: 10rpx;
      }
      margin-right: 20rpx;
    }
    .box_ul_li_name {
      font-size: 28rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .box_ul_li_price {
      color: #CF271B;
      font-size: 28rpx;
      margin: 15rpx 0;
    }
    .box_ul_li_time {
      color: #999999;
      font-size: 22rpx;
    }
  }
}
</style>
