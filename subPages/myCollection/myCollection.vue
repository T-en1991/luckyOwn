<template>
  <view class="coll">
    <view class="box_ul">
      <view class="box_ul_li flexs" v-for="(item,index) in collList" :key="index" @click="goMessage(item,0)">
        <view class="box_ul_li_img">
          <image :src="item.image" mode="aspectFill"></image>
        </view>
        <view class="box_ul_li_main">
          <view class="box_ul_li_name">{{ item.box_name }}</view>
          <view class="box_ul_li_price">{{ item.coin_price }}金币</view>
          <view class="box_ul_li_time flex">
            <text>时间：{{ item.star_time }}</text>
            <image src="https://static.gute.fun/static/luckyOwn/me/shanchu@2x.png" mode="" @click.stop="delStar(index,item)"></image>
          </view>
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
      pages:null,
      collList:[],//收藏列表
    };
  },
  methods:{
    //去详情
    goMessage (item,type) {
      uni.navigateTo({url:'/pages/index/details?id=' + item.box_id + '&type=' + type})
    },
    //删除收藏
    delStar (index,item) {
      uni.showModal({
        title: '删除',
        content: '是否删除收藏？',
        success:  (res)=> {
          if (res.confirm) {
            this.$api.cancelStar({star_id:item.star_id,msg:'收藏删除中'}).then(res=>{
              if (res.code === 1) {
                uni.showToast({title:res.msg})
                this.collList.splice(index,1)
              }
            })
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    //获取收藏列表
    getCollList () {
      this.$api.myStar({page:this.page}).then(res=>{
        uni.stopPullDownRefresh()
        if (res.code === 1) {
          this.collList = this.page == 1 ? res.data.data : [...this.collList,...res.data.data]
          this.pages = res.data.last_page
        }
      })
    }
  },
  onLoad() {
    this.getCollList()
  },
  onPullDownRefresh() {
    this.page = 1
    this.getCollList()
  },
  onReachBottom() {
    if (this.page < this.pages) {
      this.page++
      this.getCollList()
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
    .box_ul_li_main {
      flex: 1;
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

      text {
        color: #999999;
        font-size: 22rpx;
      }
      image {
        width: 44rpx;
        height: 44rpx;
      }
    }
  }
}
</style>
