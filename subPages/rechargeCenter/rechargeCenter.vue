<template>
  <view class="recharge">
    <view class="recharge_head">
      <view class="czbj">
        <view class="czbj-img">
          <image src="https://static.gute.fun/static/luckyOwn/me/czbj.jpg"></image>
        </view>
        <view class="czbj-text">
          <text>当前金币</text>
          <span>{{capital.coin}}</span>
        </view>
        <a href="/h5/static/image/me/czsp.mp4">
          <view class="czbj-czjc">
            <text>充值教程</text>
            <span></span>
          </view>
        </a>
      </view>
      <view class="recharge_head_txt flex">
        <text>选择充值金额</text>
        <text>实际到账金币：<span class="real-coin">{{ realCoin }}</span></text>
      </view>
      <view class="recharge_head_ul flexs">
        <view class="recharge_head_li center" :class="{active:index == i}" @click="changeI(index)" v-for="(item,index) in rechargeList" :key="index">
          <text>￥</text>
          <text>{{ item.coin }}</text>
        </view>
      </view>
    </view>
    <view class="deposit_main">
      <view class="deposit_main_name">选择支付方式</view>
      <view class="deposit_main_ul">
        <view class="deposit_main_li flex" v-for="(item,index) in payList" :key="index" @click="changePay(item.type)">
          <view class="deposit_main_img flexs">
            <image :src="item.image" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
          <view class="deposit_main_li_select">
            <image :src="item.type == payIndex ? 'https://static.gute.fun/static/luckyOwn/publice/xuanzhong1@2x.png' : 'https://static.gute.fun/static/luckyOwn/publice/weixuanzhong@2x.png'" mode=""></image>
          </view>
        </view>
      </view>
      <view class="deposit_main_txt"><u-parse :content="message"></u-parse></view>
    </view>
    <button class="recharge_btn" hover-class="hover-view" @click="submitPay">支付</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      capital: {
        box: 0,
        coin: 0
      },
      i:0,//选择金额
      message:'',
      tips:'',
      payIndex:1,//支付方式
      rechargeList:[],//
      bili: 0,//充值比例
      payList:[
        {
          name:'微信支付',
          type:'0',
          image:'https://static.gute.fun/static/luckyOwn/me/weixin@2x.png'
        },
        {
          name:'支付宝支付',
          type:'1',
          image:'https://static.gute.fun/static/luckyOwn/me/zhifubao@2x.png'
        },
        /*	{
            name:'普通支付',
            type:'2',
            image:'/static/image/me/zhifubao@2x_no.png'
          },

          */

        // {
        // 	name:'卡密充值',
        // 	type:'3',
        // 	image:'/static/image/me/kmcz.png'
        // },
        // {
        // 	name:'人工充值',
        // 	type:'4',
        // 	image:'/static/image/me/rgcz.png'
        // },
      ],//支付列表
    };
  },
  computed:{
    realCoin(){
      if(!this.rechargeList || this.rechargeList.length < 1){
        return 0
      }
      let recharge = this.rechargeList[this.i]
      return recharge.rmb * this.bili
    }
  },
  created(){
    this.$api.getUserCapital().then(({code, data}) => {
      if(code == 1){
        this.capital = data
      }
    })
    //渲染分类列表
    this.getCategoryList()
  },
  methods:{
    //提交支付
    submitPay () {
      if(this.payIndex == 3){
        //充值卡密
        this.rechargePassword()
        return
      }
      if(this.payIndex == 4){
        //人工充值
        this.rengong()
        return
      }
      this.$api.createRechargeOrder({amount:this.rechargeList[this.i].coin}).then(res=>{
        if (res.code === 1) {
          if (this.payIndex == 2) {
            this.$http.post(res.data.wechat).then(res=>{
              if (res.code === 1) {
                WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": res.data.appId,   //公众号ID，由商户传入
                    "timeStamp": res.data.timeStamp,   //时间戳，自1970年以来的秒数
                    "nonceStr": res.data.nonceStr,      //随机串
                    "package": res.data.package,
                    "signType": res.data.signType,     //微信签名方式：
                    "paySign": res.data.paySign //微信签名
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      uni.showToast({title:'支付成功'})
                      setTimeout(()=>{
                        uni.redirectTo({url:'/pages/me/wallet'})
                      },800)

                    }
                  });
              } else if (res.code === 403) {

              }
            })
          } else {

            var fs='wechat';
            if(this.payIndex==0){
              fs='wechat';
            }
            else if (this.payIndex==1) {
              fs='alipay';

            }
            else if (this.payIndex==2)
            {

              fs='eepay';
            }

            else {
              fs='wechat';

            }


            location.href = res.data[fs]+'?token=' + uni.getStorageSync('token') //res.data[this.payIndex == 0 ? 'wechat' : 'alipay'] + '?token=' + uni.getStorageSync('token')
          }

        }
      })
    },
    //选择金额
    changeI (index) {
      this.i = index
    },
    //切换支付方式
    changePay (index) {
      this.payIndex = index
    },
    //获取充值列表
    getRechargeList () {
      this.$api.rechargeList().then(res=>{
        if (res.code === 1) {
          this.tips = res.data.tips
          this.message = res.data.notice
          this.rechargeList = res.data.list
          this.bili = res.data.bili
        }
      })
    },
    //卡密充值跳转
    rechargePassword () {
      uni.navigateTo({
        url: "/pages/me/passwordRecharge/passwordRecharge"
      })
    },
    //人工充值跳转
    rengong () {
      uni.navigateTo({
        url: "/pagesB/pages/server"
      })
    }
  },
  onLoad() {
    this.getRechargeList()
  }
}
</script>

<style lang="scss" scoped>
.czbj{
  margin-top: 1%;
  overflow: hidden;
  width: 100%;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 20px 0px;
  border-radius: 32rpx;
}
.czbj .czbj-img{
  height: 175rpx;
  width: 100%;
  position: relative;
  uin-image{
    width: 100%;
    height: 100%;
  }
}
.czbj .czbj-text{
  position: absolute;
  width: 100%;
  height: 175rpx;
  left: 0;
  top: 0;
  padding: 30rpx 65rpx;
  uni-text{
    font-size: 32rpx;
    color: #fff;
    display: block;
  }
  span{
    font-size: 46rpx;
    font-weight: bold;
    color: #fff;
    display: block;
    margin-top: 20rpx;
  }
}
.czbj .czbj-czjc{
  padding: 11px 15px;
  span{
    width: 29px;
    height: 29px;
    float: right;
    background: $czjc;
    display: block;
    background-size: 100% 100%;
  }
  uni-text{
    font-weight: 600;
    line-height: 48rpx;
  }
}
.recharge {
  min-height: calc(100vh - 44px);
  position: relative;
  padding: 0 30rpx;
  .recharge_head {
    .recharge_head_txt {
      padding: 20rpx 0 20rpx 0;
      text {
        &:first-child {
          font-size: 32rpx;
          font-weight: bold;
        }
        &:last-child {
          color: #999999;
        }
      }
      .real-coin{
        color: #ff0000;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
  }
  .recharge_head_ul {
    flex-wrap: wrap;
    .recharge_head_li {
      margin: 0 24rpx 20rpx 0;
      width: 214rpx;
      height: 160rpx;
      background: #FFFFFF;
      border: 2rpx solid #EBEBEB;
      border-radius: 10rpx;
      &:nth-child(3n) {
        margin-right: 0;
      }
      text {
        color: #66a6ff;
        font-size: 30rpx;
        &:last-child {
          font-size: 44rpx;
        }
      }
    }
    .active {
      border: 2rpx solid #66a6ff;
    }
  }
}
.deposit_main {
  padding-bottom: 30rpx;
  .deposit_main_name {
    font-size: 32rpx;
    font-weight: bold;
    padding: 10rpx 0 30rpx 10rpx;
  }
  .deposit_main_ul {
    background: #FFFFFF;
    .deposit_main_li {
      padding: 30rpx 20rpx;
      border: 1px solid #66a6ff;
      border-radius: 60rpx;
      .deposit_main_img {
        image {
          width: 50rpx;
          height: 50rpx;
          margin-right: 20rpx;
        }
        text {
          font-size: 28rpx;
        }
      }
      .deposit_main_li_select {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .deposit_main_txt {
    padding: 30rpx 0;
  }
}
.recharge_btn {
  /*position: absolute;
  left: 50%;
  transform: translateX(-50%);
  */
  width: 690rpx;
  bottom: 34rpx;

  color: #fff;

  height: 88rpx;
  background: -webkit-linear-gradient(0deg, #89f7fe 0%, #66a6ff 100%);
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(220, 220, 220, 0.2);
  border-radius: 8rpx;
}
.password_btn{
  height: 44px;
}
</style>
