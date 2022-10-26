<template>
	<uni-popup ref="recycle" :mask-click="false">
		<view class="recycle">
			<view class="recycle_close" @click="$refs.recycle.close()">
				<image src="https://static.gute.fun/static/luckyOwn/image/publice/guanbi@2x.png" mode=""></image>
			</view>
			<view class="recycle_head">提示</view>
			<view class="recycle_price center">
				<text>￥{{ recycleMessage.amount }}</text>
				<text>回收金币</text>
			</view>
			<view class="recycle_ul">
				<view class="recycle_ul_li flex" v-for="(item,index) in recycleMessage.goods_info" :key="index">
					<view class="recycle_ul_li_txt">{{ item.name }}</view>
					<view class="recycle_ul_li_r flexs">
						<text>￥{{ item.price }}</text>
						<text>x{{ item.num }}</text>
					</view>
				</view>
			</view>
			<view class="recycle_txt">回收规则：平台统一回收折扣10，回收金币直接放【我的】 - 【余额】</view>
			<view class="sure" @click="$refs.recycle.close()">
			  确定
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:"recycle",
		data() {
			return {
				recycleMessage: {}
			};
		},
		methods: {
			//抽奖结束点击回收触发
			recycle(prizeInfo){
				let ids = []
				prizeInfo.forEach(item=>{
					ids.push(item.prize_id)
				})
				this.$api.exchange({record_ids:ids.join(',')}).then(res=>{
					if (res.code === 1) {
						this.recycleMessage = res.data
						this.$refs.recycle.open()
					}
				})
			},
			//打开回收结果窗口
			open(recycleMessage){
				this.recycleMessage = recycleMessage
				this.$refs.recycle.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sure{padding: 10rpx 20rpx;border-radius: 30rpx;font-size: 26rpx;background:-webkit-linear-gradient(0deg, #89f7fe 0%, #66a6ff 100%);color: #fff;width: 200rpx;text-align: center;margin: 0 auto;margin-top: 40rpx;}

.recycle {
	.sure{padding: 10rpx 20rpx;border-radius: 30rpx;font-size: 26rpx;background: -webkit-linear-gradient(0deg, #89f7fe 0%, #66a6ff 100%);color: #fff;width: 200rpx;text-align: center;margin: 0 auto;margin-top: 40rpx;}
	width: 640rpx;
	padding-bottom: 95rpx;
	position: relative;
	background: #FFFFFF;
	box-shadow: 0rpx -5rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
	border-radius: 30rpx;
	.recycle_close {
		top: 20rpx;
		right: 30rpx;
		width: 44rpx;
		height: 44rpx;
		position: absolute;
	}
	.recycle_head {
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: bold;
		border-bottom: 2rpx solid #E9E9E9;
	}
	.recycle_price {
		margin: 40rpx 0 0rpx 0;
		flex-direction: column;
		text {
			color: #FA7E48;
			font-size: 36rpx;
			font-weight: bold;
			&:last-child {
				color: #333333;
				margin-top: 10rpx;
				font-size: 26rpx;
			}
		}
	}
	.recycle_ul {
		padding: 0 30rpx;
		margin: 50rpx 0;
	}
	.recycle_ul_li {
		margin-bottom: 30rpx;
		&:last-child {
			margin-bottom: 0;
		}
		.recycle_ul_li_txt {
			color: #999999;
			font-size: 26rpx;
		}
		.recycle_ul_li_r {
			text {
				color: #999999;
				font-size: 26rpx;
				&:last-child {
					width: 80rpx;
					text-align: right;
					color: #FA7E48;
					font-size: 30rpx;
				}
			}
		}
	}
	.recycle_txt {
		padding: 0 30rpx;
		color: #999999;
		font-size: 26rpx;
	}

}

</style>
