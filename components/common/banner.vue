<template>
	<view class="bannerConmon">
		<!-- banner标题 -->
		<view class="bannerWrap">
			<text class="left" v-if="leftrightMenu"></text>
			<text class="titleName">{{titleName}}</text>
			<text class="right" v-if="leftrightMenu"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			titleName: {
				type:String,
				default:''
			},
			leftrightMenu: {
				type: [Boolean, String],
				default:true
			}
		},
		data() {
		    return {
			
			}
		}		
	}	
</script>

<style>
	/* banner标题 */
	.bannerWrap{margin: 20rpx 0 0;line-height: 50px;background: #FFFFFF;color:#333;display: flex;text-align: center;justify-content: center;align-items: center;-webkit-box-align: center;-webkit-box-pack: center;font-size:32rpx}
	.bannerWrap .left{width: 100rpx;height: 2rpx;background: #999;}
	.bannerWrap .titleName{padding: 0 20rpx;}
	.bannerWrap .right{width: 100rpx;height: 2rpx;background: #999;}
</style>
