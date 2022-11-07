<template>
  <view class="address">
    <view class="address_ul">
      <view class="address_li">
        <view class="address_name">收款人姓名</view>
        <view class="address_ipt flex">
          <input type="text" style="width: 100%" maxlength="10" v-model="user.username" placeholder="请输入收款人姓名" placeholder-style="color:#999999" />
        </view>
      </view>
      <view class="address_li">
        <view class="address_name">支付宝账号</view>
        <view class="address_ipt flex">
          <input type="text" style="width: 100%;" v-model="user.account" placeholder="请输入收款人支付宝账号" placeholder-style="color:#999999" />
        </view>
      </view>
    <view class="address_switch flex">
      <text>设置为默认</text>
      <switch color="#DEBB81" @change="changeSwitch" :checked="user.is_default == 1"></switch>
    </view>
    <button class="address_btn" hover-class="hover-view" @click="submit">保存收款账号</button>
  </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      user:{
        username:'',
        account:'',
        detail:'',
        is_default:0,
        address_id:''
      },
      type:0,//添加还是编辑
      flag:true,//
    };
  },
  methods:{
    //删除地址
    delAddress () {
      uni.showModal({
        content: '是否删除地址？',
        success:  (res)=> {
          if (res.confirm) {
            this.$api.deleteAddress({address_id:this.user.address_id}).then(res=>{
              if (res.code === 1) {
                uni.showToast({title:res.msg})
                setTimeout(()=>{
                  uni.navigateBack()
                },800)
              }
            })
          }
        }
      });
    },
    //返回上一级
    retutnTop () {
      uni.navigateBack()
    },

    changeSwitch (e) {
      this.user.is_default = e.detail.value ?  1 : 0
    },
    submit () {
      if (!this.user.username) return uni.showToast({title:'请输入收款人姓名',icon:'none'})
      if (!this.user.account) return uni.showToast({title:'请输入收款人账户',icon:'none'})
      if (!this.flag) return
      this.flag = false
      uni.showLoading({title:'数据提交中'})
      this.$api[this.type == 0 ? 'addAddress' : 'editAddress']({...this.user}).then(res=>{
        uni.hideLoading()
        if (res.code === 1) {
          uni.showToast({title:res.msg})
          setTimeout(()=>{
            uni.navigateBack()
          },800)
          this.type == 1 ? uni.removeStorageSync('editAddress') : ''
        } else {
          this.flag = true
        }
      })
    }
  },
  onLoad ({type}) {
    this.type = type
  },
  onShow() {
    if (uni.getStorageSync('editAddress')) {
      this.user = JSON.parse(uni.getStorageSync('editAddress'))
      this.user.is_default = JSON.parse(uni.getStorageSync('editAddress')).is_default ? 1 : 0
    }

  }
}
</script>

<style lang="scss" scoped>
.address_head {
  width: 100%;
  height: 88rpx;
  padding: 0 30rpx;
  background: #FFFFFF;
  image {
    width: 44rpx;
    height: 44rpx;
  }
  text {
    font-size: 36rpx;
    font-weight: bold;
  }
}
.address_ul {
  padding: 20rpx 30rpx 0 30rpx;
  .address_li {

    .address_name {
      font-size: 30rpx;
      font-weight: bold;
      padding: 30rpx 0;
    }
    .address_ipt {
      height: 80rpx;
      padding: 0 30rpx;
      background: #FFFFFF;
      border-radius: 10rpx;
      input {
        font-size: 28rpx;
      }
      image {
        width: 22rpx;
        height: 22rpx;
      }
    }
    .address_ipts {
      padding: 30rpx;
      height: 160rpx;
      textarea {
        font-size: 28rpx;
      }
    }
  }
}
.address_switch {
  height: 88rpx;
  margin: 30rpx 0 84rpx 0;
  padding: 0 30rpx;
  background: #FFFFFF;
  text {
    font-size: 30rpx;
    font-weight: bold;
  }
}
.address_btn {
  width: 690rpx;
  height: 98rpx;
  color: #333333;
  margin: 0 auto;
  font-size: 30rpx;
  font-weight: bold;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 121rpx 0rpx rgba(63, 52, 2, 0.12);
  border-radius: 10rpx;
}
</style>
