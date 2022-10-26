<template>
  <view class="box">
    <view class="box_head flexs">
      <!-- 修改 in 2 改成 in 3 标题名调用titleName方法 -->
      <view class="box_head_li center" @click="changeIndex(index)" v-for="(item,index) in 3"
            :class="{active:index == i}" :key="index">{{ titleName(index) }}
      </view>
    </view>
    <!-- 修改 -->
    <view class="box_ul">
      <!-- 待提货 已回列表 -->
      <template v-if="i < 2">
        <view class="box_ul_li" v-for="(item,index) in boxList" :key="index" @click="item.flag = !item.flag">
          <image class="an" v-if="i == 0"
                 :src="item.flag ? 'https://static.gute.fun/static/luckyOwn/publice/xuanzhong1@2x.png' : 'https://static.gute.fun/static/luckyOwn/me/weixuanzhong@2x.png'"
                 mode=""></image>
          <view class="box_ul_li_img">
            <image :src="item.goods_image" mode="aspectFill"></image>
          </view>
          <view class="box_ul_li_main">
            <view class="box_ul_li_name">
              <!-- 修改 -->
              <text>{{ item.goods_name }}</text>
            </view>
            <view class="box_ul_li_price">
              <view class="khj">开盒价：
                <text>{{ item.box_coin_price }}金币</text>
              </view>
              <view class="xsj">销售价：
                <text>{{ item.goods_coin_price }}金币</text>
              </view>
              <view class="hsj">回收价：
                <text>{{ item.goods_hui_price }}金币</text>
              </view>
            </view>
          </view>
          <view class="box_ul_li_time">
            <!-- 修改 -->
            <text>时间：{{ item.time }}</text>
            <!-- 新增 -->
            <view v-if="i == 0" class="item-btn center" @click.stop="donationOpen(item)"> 一键转赠</view>
          </view>
        </view>
      </template>
      <!-- 新增 转赠列表 -->
      <template v-else>
        <view class="box_ul_li flexs" v-for="(item,index) in donationList" :key="'donation-' + index"
              @click="item.flag = !item.flag">
          <view class="box_ul_li_img">
            <image :src="item.zzimage" mode="aspectFill"></image>
          </view>
          <view class="box_ul_li_main">
            <view class="box_ul_li_name">
              <!-- 修改 -->
              <text>{{ item.boxgoods }}</text>
            </view>
            <view class="box_ul_li_price flex">
              <view class="box_ul_li_time">时间：{{ item.zhuanztime }}</view>
              <text style="text-align: right;">已转赠</text>
            </view>
            <view class="box_ul_li_time">受赠人：{{ item.szuser }}</view>
          </view>
        </view>
      </template>
    </view>
    <view class="box_footer flex" v-if="i == 0">
      <view class="box_footer_all flexs">
        <image @click="changeAll"
               :src="isAll ? 'https://static.gute.fun/static/luckyOwn/image/publice/xuanzhong1@2x.png' : 'https://static.gute.fun/static/luckyOwn/image/me/weixuanzhong@2x.png'"
               mode=""></image>
        <text>全选({{ totalNumber }})</text>
      </view>
      <view class="box_footer_ul flexs">
        <view class="box_footer_li center" v-for="(items,index) in 2" :key="index" @click="apply(index)">
          {{ index == 0 ? '一键回收' : '申请发货' }}
        </view>
      </view>
    </view>
    <!-- 新增 转赠窗口 -->
    <uni-popup ref="donation">
      <view class="donation">
        <view class="title">请输入您转赠人的手机号</view>
        <view class="input-container">
          <input v-model="donationPhone" type="number" placeholder="请输入转赠人注册手机号"/>
        </view>
        <view class="tip">注：一旦转赠成功不可退货，请谨慎操作</view>
        <view class="donation-btns">
          <view class="box_footer_li center" @click="$refs.donation.close()"> 取消</view>
          <view class="box_footer_li center" @click="donation()"> 确定</view>
        </view>
      </view>
    </uni-popup>
    <recycle ref="recycle"></recycle>
  </view>
</template>

<script>
import recycle from "../../components/recycle.vue"

export default {
  components: {
    recycle
  },
  data() {
    return {
      i: 0,//
      page: 1,
      isAll: false,//
      pages: null,//
      totalNumber: 0,//总数量
      boxList: [],//盒子列表
      donationList: [],//转赠列表
      recordId: null,//转赠商品id
      donationPhone: null//转赠人手机号
    };
  },
  watch: {
    boxList: {
      handler(val) {
        let totalNumber = 0

        this.isAll = val.every(item => item.flag)
        if (val.length == 0) this.isAll = false
        val.forEach(item => {
          if (item.flag) {
            totalNumber++
          }
        })
        this.totalNumber = totalNumber
      },
      deep: true //true 深度监听
    }
  },
  methods: {
    // 新增 标题名称
    titleName(index) {
      switch (index) {
        case 0:
          return "待提货"
        case 1:
          return "已回收"
        case 2:
          return "已转赠"
      }
    },
    //申请发货
    apply(index) {
      if (!this.boxList.some(item => item.flag)) return uni.showToast({
        title: '请勾选要' + (index == 0 ? '回收' : '发货') + '的商品',
        icon: 'none'
      })
      let ids = []
      this.boxList.forEach(item => {
        if (item.flag) {
          ids.push(item.record_id)
        }
      })
      if (index == 0) {
        uni.showModal({
          cancelText: "取消",
          confirmText: "确认",
          title: "一键回收",
          content: "是否确认一键回收？",
          success: res => {
            if (res.confirm) {
              this.$api.exchange({record_ids: ids.join(',')}).then(res => {
                if (res.code === 1) {
                  uni.showToast({title: res.msg})
                  this.page = 1
                  this.getMyBox()
                  this.$refs['recycle'].open(res.data)
                }
              })
            }
          }
        })
      } else {
        uni.navigateTo({url: '/pages/me/applyFaHuo?id=' + ids.join(',')})
      }
    },
    //全选
    changeAll() {
      this.isAll = !this.isAll
      this.boxList.forEach(item => {
        item.flag = this.isAll
      })
    },
    changeIndex(index) {
      this.i = index
      this.page = 1
      this.boxList = []
      this.getMyBox()
    },
    //获取我的盒柜
    getMyBox() {
      // 新增 获取已转赠
      if (this.i == 2) {
        this.$api.echargezs({msg: '数据加载中'}).then(res => {
          this.donationList = res.data
        })
        return
      }
      this.pages=0
      this.boxList=[]
      // this.$api.myBox({status: this.i + 1, page: this.page, msg: '数据加载中'}).then(res => {
      //   if (res.code === 1) {
      //     res.data.data.forEach(item => {
      //       item.flag = false
      //     })
      //     this.pages = res.data.last_page
      //     this.boxList = this.page == 1 ? res.data.data : [...this.boxList, ...res.data.data]
      //   }
      // })
    },
    // 新增 打开转赠窗口
    donationOpen(item) {
      this.recordId = item.record_id
      this.$refs.donation.open()
    },
    // 新增 转赠提交
    donation() {
      if (!this.checkPhone()) {
        return
      }
      this.$api.echargez({record_ids: this.recordId, mobile: this.donationPhone}).then(res => {
        if (res.code === 1) {
          //转赠成功
          const index = this.boxList.findIndex(item => item.record_id == this.recordId)
          this.boxList.splice(index, 1)
          this.$refs.donation.close()
          uni.showToast({
            icon: "success",
            title: "转赠成功"
          })
        }
      })
    },
    /* 新增 检查手机号 */
    checkPhone() {
      if (!(/^1[345789]\d{9}$/.test(this.donationPhone))) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        })
        return false
      }
      return true
    }
  },
  onShow() {
    this.getMyBox()
  },
  onReachBottom() {
    if (this.i == 2) {
      return
    }
    if (this.page < this.pages) {
      this.page++
      this.getMyBox()
    }
  }
}
</script>

<style lang="scss" scoped>
.an {
  height: 25px;
  width: 25px;
  float: left;
  position: relative;
  top: 42px;
}

.box_head {
  position: sticky;
  left: 0;
  background: #FAFAFA;
  z-index: 2021;
  width: 100%;

  .box_head_li {
    flex: 1;
    font-size: 30rpx;
    height: 90rpx;
    font-weight: bold;
  }

  .active {
    border-radius: 100rpx;
    color: #69a8f8;

  }
}

.box_ul {
  padding: 0 30rpx 98rpx 30rpx;

  .box_ul_li {
    padding: 15rpx;
    margin-bottom: 20rpx;
    background: #FFFFFF;
    border-radius: 20rpx;

    .box_ul_li_img {
      width: 30%;
      float: left;

      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }

      margin-right: 20rpx;
    }

    .box_ul_li_main {
      flex: 1;
    }

    //修改
    .box_ul_li_name {
      font-size: 28rpx;
      display: flex;
      overflow: hidden;

      text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        flex: 1;
        font-weight: bold;
      }
    }

    .box_ul_li_price {
      text {
        color: #66a6ff;
        font-size: 28rpx;
        font-weight: 600;
      }

      image {
        width: 44rpx;
        height: 44rpx;
      }

      margin: 15rpx 0;
    }

    .box_ul_li_price .hsj, .khj, .xsj {
      display: block;
      margin: 10rpx 0;

      uni-text {
        float: right
      }
    }

    .box_ul_li_price .hsj {
      uni-text {
        color: #000000;
      }
    }

    .box_ul_li_time {
      color: #999999;
      font-size: 22rpx;
      align-items: center;
      margin-top: 20rpx;

      uni-text {
        line-height: 70rpx;
      }

      uni-image {
        width: 48rpx;
        height: 48rpx;
        float: right;
      }

      .item-btn {
        background-image: -moz-linear-gradient(0deg, rgb(137, 247, 254) 0%, rgb(102, 166, 255) 100%);
        background-image: -webkit-linear-gradient(0deg, rgb(137, 247, 254) 0%, rgb(102, 166, 255) 100%);
        background-image: -ms-linear-gradient(0deg, rgb(137, 247, 254) 0%, rgb(102, 166, 255) 100%);
        color: #FFFFFF;
        border-radius: 19px;
        font-size: 28rpx;
        margin-left: auto;
        width: 200rpx;
        height: 60rpx;
        float: right;
      }
    }
  }
}

.box_footer {
  height: 98rpx;
  z-index: 20;
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  padding: 0 30rpx;
  background: #FFFFFF;

  .box_footer_all {
    image {
      width: 44rpx;
      height: 44rpx;
      margin-right: 10rpx;
    }

    text {
      color: #000000;
      font-size: 28rpx;
    }
  }

  .box_footer_li {
    color: #FFFFFF;
    width: 200rpx;
    height: 70rpx;
    border-radius: 39rpx;
    font-size: 30rpx;
    margin-left: 30rpx;

    &:first-child {
      background-image: -moz-linear-gradient(60deg, rgb(255, 200, 222) 0%, rgb(255, 103, 164) 100%);
      background-image: -webkit-linear-gradient(60deg, rgb(255, 200, 222) 0%, rgb(255, 103, 164) 100%);
      background-image: -ms-linear-gradient(60deg, rgb(255, 200, 222) 0%, rgb(255, 103, 164) 100%);
    }

    &:last-child {
      background-image: -moz-linear-gradient(0deg, rgb(137, 247, 254) 0%, rgb(102, 166, 255) 100%);
      background-image: -webkit-linear-gradient(0deg, rgb(137, 247, 254) 0%, rgb(102, 166, 255) 100%);
      background-image: -ms-linear-gradient(0deg, rgb(137, 247, 254) 0%, rgb(102, 166, 255) 100%);

    }
  }
}

// 新增 转赠窗口样式
.donation {
  background-color: #fff;
  padding: 30rpx 40rpx;
  border-radius: 10px;

  .title {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30rpx;
  }

  .input-container {
    background-color: #f3f3f3;
    padding: 16rpx 20rpx;
    border-radius: 6rpx;
    margin-bottom: 20rpx;

    input {
      font-size: 30rpx;
    }
  }

  .tip {
    font-size: 12px;
    color: red;
    text-align: center;
    margin-bottom: 30rpx;
  }

  .donation-btns {
    display: flex;
    gap: 30rpx;

    view {
      color: #FFFFFF;
      flex: 1;
      width: 100%;
      height: 70rpx;
      border-radius: 39rpx;
      font-size: 30rpx;

      &:first-child {
        background: -webkit-linear-gradient(60deg, #ffc8de 0%, #ff67a4 100%);
      }

      &:last-child {
        background: -webkit-linear-gradient(0deg, #89f7fe 0%, #66a6ff 100%);
      }
    }
  }
}
</style>
