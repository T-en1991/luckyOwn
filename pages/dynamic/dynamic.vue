<template>
	<view class="dynamic">
    <view>
      <com-banner></com-banner>
    </view>
    <view class="dynamic_card">
      <view v-if="list.length">
        <d-card v-for="(item,index) in list" :key="index"/>
      </view>
      <view v-else class="dynamic_card_empty">
        暂无上新动态
      </view>
    </view>
	</view>
</template>

<script>
import DCard from './cmp/DCard'
import comBanner from './cmp/comBanner'

	export default {
		data() {
			return {
			  list:[1,1,1,1,1],
			  // list:[],
			}
		},
    components:{
      DCard,
      comBanner
    },
		methods: {

		}
	}
</script>

<style lang="scss">
.dynamic{
  min-height: 100vh;
  background: url("https://blogserve.gute.fun/statics/luckly/bg.png") no-repeat fixed center/cover;
  background-color: black;
  .dynamic_card{
    margin-top: 60upx;
    padding: 0 60upx;
    .dynamic_card_empty{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400upx;
      color:#fff;
      font-size: 12px;
    }
  }
}
</style>
