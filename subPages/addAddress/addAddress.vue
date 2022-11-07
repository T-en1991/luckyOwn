<template>
	<view class="address">
		<view class="address_ul">
			<view class="address_li">
				<view class="address_name">收货人</view>
				<view class="address_ipt flex">
					<input type="text" v-model="user.username" placeholder="请输入收货人姓名" placeholder-style="color:#999999" />
				</view>
			</view>
			<view class="address_li">
				<view class="address_name">手机号</view>
				<view class="address_ipt flex">
					<input type="number" maxlength="11" v-model="user.mobile" placeholder="请输入收货人手机号" placeholder-style="color:#999999" />
				</view>
			</view>
			<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
				<view class="address_li">
					<view class="address_name">所在地区</view>
					<view class="address_ipt flex">
						<input type="text" v-model="address" placeholder="请选择地区" disabled placeholder-style="color:#999999" />
						<image src="https://static.gute.fun/static/luckyOwn/publice/jinruer@2x.png" mode=""></image>
					</view>
				</view>
			</pick-regions>

			<view class="address_li">
				<view class="address_name">详细地址</view>
				<view class="address_ipt address_ipts flex">
					<textarea placeholder="如：街道、楼牌号等" v-model="user.detail" placeholder-style="color:#999999" maxlength="-1"></textarea>
				</view>
			</view>
		</view>
		<view class="address_switch flex">
			<text>设置为默认地址</text>
			<switch color="#DEBB81" @change="changeSwitch" :checked="user.is_default == 1"></switch>
		</view>
		<button class="address_btn" hover-class="hover-view" @click="submit">保存收货地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{
					username:'',
					mobile:'',
					province:'',
					city:'',
					area:'',
					detail:'',
					is_default:0,
					address_id:''
				},
				type:0,//添加还是编辑
				flag:true,//
				address:'',
				defaultRegionCode:['河南省','郑州市','中原区']
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
			//选择地区
			handleGetRegion (e) {
				this.user.province = e[0].name
				this.user.city = e[1].name
				this.user.area = e[2].name
				this.address = e[0].name + e[1].name + e[2].name
			},
			changeSwitch (e) {
				this.user.is_default = e.detail.value ?  1 : 0
			},
			submit () {
				if (!this.user.username) return uni.showToast({title:'请输入收货人姓名',icon:'none'})
				if (!this.user.mobile.match(/^(0|86|17951)?1[3456789]\d{9}$/)) return uni.showToast({title:'请输入正确的手机号',icon:'none'})
				if (!this.address) return uni.showToast({title:'请选择地区',icon:'none'})
				if (!this.user.detail) return uni.showToast({title:'请输入详细地址',icon:'none'})
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
				this.address = JSON.parse(uni.getStorageSync('editAddress')).province + JSON.parse(uni.getStorageSync('editAddress')).city + JSON.parse(uni.getStorageSync('editAddress')).area
				this.user.is_default = JSON.parse(uni.getStorageSync('editAddress')).is_default ? 1 : 0
			}

		}
	}
</script>

<style lang="scss">
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
