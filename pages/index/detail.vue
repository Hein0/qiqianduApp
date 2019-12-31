<template>
	<view class="detail">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<text class="backIcon" @click="navigateBack"></text>
		            <view class="header-title-wrap">
						<view class="detail_anchor_wrap">
							<text>商品</text>
							<text>详情</text>
							<text>推荐</text>
						</view>
		            </view>
					<text class="menu"></text>
		        </view>
		    </view>
		    <view class="blank"></view>
		</view>
		<!-- banner图 -->
		<view class="uni-padding-wrap">
		    <view class="page-section swiper">
		        <view class="page-section-spacing">
		            <swiper class="swiper" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#FFFFFF">
		                <swiper-item v-for="(item,index) in imgList" :key="item.index">
		                    <image style="width: 100%;height:100%;" :src="item" @tap="preview" :id="imgList[index]"></image>
		                </swiper-item>
		            </swiper>
		        </view>
		    </view>
			<view class="infoWrap">
				<view class="titleWrap">
					<view class="leftNuber">
						<text class="current">￥100</text>
						<text class="original">￥520</text>
					</view>
					<view class="rightNuber">
						<text class="sales">销量:</text>
					</view>
				</view>
				<view class="titleTxtWrap">
					<text class="channel"></text>
					<text class="titleTxt">这是标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		components:{
		    
		},
	    data() {
	        return {
	            indicatorDots: true, //是否显示面板指示点
	            autoplay: true, //是否自动切换
	            interval: 2000, //自动切换时间间隔
	            duration: 500, // 滑动时长
				imgList:[
					require("../../static/images/ssd.jpg"),
					require("../../static/images/activation_my.png"),
					require("../../static/images/ssd.jpg")]
					
	        }
	    },
		// 计算属性
		computed: {
			
		},
		// 创建完成
		created(){
			
		},
		//挂载完成
		mounted(){
			
		},
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},	
			// 点击大图
		    preview(res){  
				let myindex = res.currentTarget.id;  
				console.log(myindex)
				uni.previewImage({  
					urls:this.imgList,  
					current:myindex  
				})  
			}
			
		}
		
	}
</script>

<style>
	page{background: #f4f4f4;}
	/* start pageHead */
	.header-wrap {
	    width: 100%;
	    position: fixed;
	    top: 0;
	    z-index: 999;
	}    
	.index-header {
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 20rpx;
		/* #ifdef APP-PLUS */
		padding-top: 40rpx;
		/* #endif */
		background-color: #FFFFFF;
		font-size: 28rpx;
		color: #05a6fe;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}          
	.header-title-wrap {
		flex: 1;
		margin: 0 70rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #666;
		position: relative;
	}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
	.backIcon{height: 60rpx;width: 70rpx;border-radius: 50%;background: url('../../static/images/left_icon.png') no-repeat 5% center;background-size: 50rpx 50rpx;} 
	.menu{height: 60rpx;width: 70rpx;border-radius: 50%;background: url('../../static/images/icon/spriteIcon.png') no-repeat center center;background-size: 50rpx 50rpx;}   
	.blank {
		/* #ifdef APP-PLUS */
	    height: 138rpx;
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 100rpx;
		/* #endif */
	}
	.uni-padding-wrap{width: 750rpx;padding: 0;}
	.infoWrap{padding:15rpx 15rpx 20rpx;background:#FFFFFF;}
	.titleWrap{display: flex;align-items: center;justify-content: space-between;padding: 10rpx 0;}
	.leftNuber .current{font-size:38rpx;color: #f33;}
	.leftNuber .original{font-size:32rpx;margin-left: 15rpx;text-decoration:line-through;color: #666;}
	.rightNuber{padding-right: 20rpx;color: #666;}
	.titleTxtWrap{padding:0 10rpx 10rpx;color: #333;}
	.titleTxt{font-size:32rpx}
	
</style>
