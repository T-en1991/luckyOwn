<template>
	<uni-popup ref="popup" type="bottom" :mask-click="false">
		<view class="pay">
		<view class="pay_close" @click="$refs.popup.close()">
			<image src="/static/image/home/guanbi@2x.png" mode=""></image>
		</view>
		<view class="pay_head">支付</view>
			<view class="pay_shop flexs">
				<view class="pay_shop_img">
					<view class="pay_shop_img_top">
						<view class="pay_shop_img_left">
							<image :src="boxMessage.image" mode="aspectFill"></image>
						</view>
						<view class="pay_shop_img_right">
							<image :src="item" mode="aspectFill" v-for="(item,index) in boxMessage.right" :key="index"></image>
						</view>
					</view>
					<view class="pay_shop_img_bot">
						<image :src="item" mode="aspectFill" v-for="(item,index) in boxMessage.bot" :key="index"></image>
					</view>
				</view>
				<view class="pay_shop_main">
					<view class="pay_shop_name">{{ boxMessage.box_name }}</view>
					<view class="pay_shop_price flex">
						<view class="pay_shop_price_l">{{ boxMessage.coin_amount }}金币</view>
						<view class="pay_shop_price_btn center" v-if="boxMessage.coin_not_enough">金额不足</view>
					</view>

				</view>
			</view>
			<view class="pay_attention">{{ boxMessage.notice }}</view>
			<view class="pay_contant flexs">
				<image @click="isConsent = !isConsent" :src="isConsent ? '/static/image/publice/xuanzhong1@2x.png' : '/static/image/publice/weixuanzhong1@2x.png' " mode=""></image>
				<text @click="goBuyer">我已阅读并同意《喵喵开盒买家须知》</text>
			</view>
			<view class="pay_ul flex">
				<button class="pay_gold" @click="goldPay" v-if="!boxMessage.coin_not_enough" hover-class="hover-view" :disabled="!payFlag">金币支付</button>
				<button v-else class="pay_ul_btn" @click="recharge()" hover-class="hover-view">立即充值</button>
				<!--button class="pay_ul_btn" @click="patternIndex(index)" hover-class="hover-view" v-for="(item,index) in 2" :key="index">{{ index == 0 ? '微信支付'+ boxMessage.rmb_amount +'金币' : '支付宝支付'+ boxMessage.rmb_amount +'金币' }}</button-->
				<button class="pay_ul_btn" @click="balance()" hover-class="hover-view">余额支付</button>
				<!-- <button class="pay_ul_btn" @click="cashPay()" hover-class="hover-view">现金支付</button> -->
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:"payment",
		props:{
			//盒子id
			boxId: Number,
			//支付页面
			payPage: String
		},
		data() {
			return {
				isConsent: true,//是否同意
				boxMessage: {} ,//盒子详情
				payFlag: true, //支付锁 防止重复点击
				payUrls: {}//支付链接
			};
		},
		methods: {
			/**
			 * 打开页面
			 * 
			 * @param {Object} type 开盒类型 1：试玩 其他：正式开盒
			 * @param {Object} num 数量 1 5 9
			 */
			open (type, num){
				this.isConsent = true
				this.$api[type == 1 ? 'haveATry' : 'createOrder']({
					box_id: this.boxId,
					num: num,
					msg: type == 1 ? '试玩' : '创建订单中',
				}).then( ({code, data}) => {
					if (code === 1) {
						//创建订单成功
						if (type != 1) {
							//缓存订单id
							uni.setStorageSync('order_id', data.order_id)
							//正式开盒
							this.$emit("create-success")
							data.right = []
							data.bot = []
							data.image = data.images[0]
							data.images.forEach((item,index)=>{
								if (index > 0 && index < 3) {
									data.right.push(item)
								}
								if (index > 2) {
									data.bot.push(item)
								}
							})
							this.boxMessage = data
							//支付链接
							this.payUrls.alipay = data.alipay
							this.payUrls.wechat = data.wechat
							this.$refs.popup.open()
						} else {
							//返回结果
							this.$emit("show-result", data)
						}
					}
				})
			},
			//买家须知
			goBuyer () {
				uni.navigateTo({url:'/pagesA/pages/buyer'})
			},
			//金币支付
			goldPay () {
				if (!this.isConsent) return uni.showToast({title:'请阅读并勾选买家须知',icon:'none'})
				if (!this.payFlag) return
				this.payFlag = false
				//访问后台支付
				this.$api.coinPay({order_id: this.boxMessage.order_id}).then(({code, data}) => {
					//解除支付锁
					this.payFlag = true
					if (code === 1) {
						//关闭弹窗
						this.$refs.popup.close()
						//返回结果
						this.$emit("show-result", data.prize)
					}
				})
			},
			//余额支付
			balance () {
				if (!this.isConsent) return uni.showToast({title:'请阅读并勾选买家须知',icon:'none'})
				if (!this.payFlag) return
				this.payFlag = false
				//访问后台支付
				this.$api.cmoneyPay({order_id: this.boxMessage.order_id}).then(({code, data}) => {
					//解除支付锁
					this.payFlag = true
					if (code === 1) {
						//关闭弹窗
						this.$refs.popup.close()
						//返回结果
						this.$emit("show-result", data.prize)
					}
				})
			},
			//去充值
			recharge () {
				if (!this.isConsent) return uni.showToast({title:'请阅读并勾选买家须知',icon:'none'})
				uni.navigateTo({url:'/pages/me/recharge'})
			},
			//现金支付
			cashPay(){
				if (!this.isConsent) return uni.showToast({title:'请阅读并勾选买家须知',icon:'none'})
				if (!this.payFlag) return
				this.payFlag = false
				uni.navigateTo({
					url:`/pages/tabbar/cashPay/cashPay?alipay=${this.payUrls.alipay}&wechat=${this.payUrls.wechat}&payPage=${this.payPage}`,
					complete: () => {
						this.payFlag = true
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.pay {
	background: #FFFFFF;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	padding: 0 50rpx 32rpx 50rpx;
	position: relative;
	.pay_close {
		top: 30rpx;
		right: 30rpx;
		width: 44rpx;
		height: 44rpx;
		position: absolute;
	}
	.pay_head {
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		padding: 40rpx 0 50rpx 0;
	}
	.pay_shop {
		
		margin-bottom: 40rpx;
		.pay_shop_main {
			display: flex;
			flex: 1;
			height: 200rpx;
			flex-direction: column;
			justify-content: space-around;
		}
		.pay_shop_img {
			width: 200rpx;
			height: 200rpx;
			padding: 12rpx;
			.pay_shop_img_top {
				display: flex;
				margin-bottom: 12rpx;
				.pay_shop_img_left {
					image {
						width: 114rpx;
						height: 114rpx;
						border-radius: 6rpx;
					}
					margin-right: 12rpx;
				}
				.pay_shop_img_right {
					image {
						width: 51rpx;
						height: 51rpx;
						&:first-child {
							margin-bottom: 12rpx;
						}
						border-radius: 6rpx;
					}
				}
			}
			.pay_shop_img_bot {
				display: flex;
				justify-content: flex-end;
				image {
					width: 51rpx;
					height: 51rpx;
					margin-left: 12rpx;
					&:first-child {
						margin-left: 0;
					}
					border-radius: 6rpx;
				}
			}
			margin-right: 30rpx;
		}
		.pay_shop_name {
			font-size: 28rpx;
		}
		.pay_shop_price_l {
			color: #CF271B;
			font-size: 30rpx;
		}
		.pay_shop_price_btn {
			width: 183rpx;
			height: 50rpx;
			color: #FA7E48;
			font-size: 30rpx;
			font-weight: bold;
			background: rgba(246, 175, 50, 0.5);
			border-radius: 25rpx;
		}
	}
	.pay_attention {
		color: #666666;
	}
	.pay_contant {
		margin: 24rpx 0 59rpx 0;
		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
		text {
			font-size: 26rpx;
		}
	}
	.pay_gold {
		width: 310rpx;
		height: 78rpx;
		font-size: 26rpx;
		background: -webkit-linear-gradient(60deg, #ffc8de 0%, #ff67a4 100%);
		border-radius: 39rpx;
	}
	.pay_ul_btn {
		width: 310rpx;
		height: 78rpx;
		font-size: 26rpx;
		background: -webkit-linear-gradient(60deg, #ffc8de 0%, #ff67a4 100%);
		border-radius: 39rpx;
		&:last-child {
			background: -webkit-linear-gradient(0deg, #89f7fe 0%, #66a6ff 100%);
		}
	}
}

</style>
