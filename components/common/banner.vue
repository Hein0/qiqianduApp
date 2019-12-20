<template>
	<view class="bannerConmon">
		<!-- banner标题 -->
		<view class="bannerWrap">
			<text class="left"></text>
			<text>{{titleName}}</text>
			<text class="right"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			'titleName'
		],
		data() {
		    return {
			
			}
		}		
	}	
</script>

<style>
	/* banner标题 */
	.bannerWrap{margin: 20rpx 0 0;line-height: 50px;background: #FFFFFF;color:#05a6fe;display: flex;text-align: center;justify-content: center;align-items: center;-webkit-box-align: center;-webkit-box-pack: center;font-size:32rpx}
	.bannerWrap .left{width: 100rpx;height: 2rpx;background: #05a6fe;}
	.bannerWrap .right{width: 100rpx;height: 2rpx;background: #05a6fe;}
</style>
