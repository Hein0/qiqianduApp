<template>
	<view class="minepage">
		<view class="p-info">
			<view class="p-pannel">
				<image @click="presolink" class="p-icon" :src="avatarUrl" alt=""></image>
				<view class="p-n">
					<text class="p-name">{{memberName}}</text>
				</view>
				<view class="p-n">
					<text class="p-name">购物先领劵，一年省一半</text>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="sectionWrap">
			<view class="sectionList">
				<view class="listItem" @tap="gotoHistory">
					<view class="listItem_container">
						<view class="listItem_icon">
							<image src="../../static/images/icon/lljl_icon.png" mode=""></image>
						</view>
						<view class="listItem_content">
							浏览历史
						</view>
						<view class="listItem_extra"></view>
					</view>
				</view>
				<view class="listItem" @tap="gotoCollect">
					<view class="listItem_container">
						<view class="listItem_icon">
							<image src="../../static/images/icon/sc_icon.png" mode=""></image>
						</view>
						<view class="listItem_content">
							我的收藏
						</view>
						<view class="listItem_extra"></view>
					</view>
				</view>
				<view class="listItem">
					<view class="listItem_container">
						<view class="listItem_icon">
							<image src="../../static/images/icon/gywm_icon.png" mode=""></image>
						</view>
						<view class="listItem_content">
							关于我们
						</view>
						<view class="listItem_extra"></view>
					</view>
				</view>
				<view class="listItem">
					<view class="listItem_container">
						<view class="listItem_icon">
							<image src="../../static/images/icon/sz_icon.png" mode=""></image>
						</view>
						<view class="listItem_content">
							设置
						</view>
						<view class="listItem_extra"></view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl:require("../../static/images/user-1.png"),//头像地址
				openid:"",
				memberName:'游客',
			}
		},
		// 创建完成
		created(){
			
		},
		//挂载完成
		mounted(){
			
		},
		//方法
		methods: {
			
			// 浏览历史
			gotoHistory(){
				uni.navigateTo({
					url: '/pages/mine/history'
				});
			},
			// 我的收藏
			gotoCollect(){
				uni.navigateTo({
					url: '/pages/mine/collect'
				});
			}
			
			
		}
	}
</script>
	
<style>
	page{background: #f4f4f4;}
	.p-info {
	    width: 100%;
	    background:#FFFFFF url('../../static/images/user-3.png') no-repeat top center;
	    background-size: 100% 80%;
	    padding-top: 100rpx;
		/* #ifdef APP-PLUS */
		padding-top: 140rpx;
		/* #endif */
	    margin-bottom: 15rpx;
	}
	.p-info .p-pannel {
	    width: 94%;
	    margin: 0 auto;
	    background: url('../../static/images/user-4.png') no-repeat top center;
	    background-size: 100% 100%;
	    padding-top: 50rpx;
	    padding-bottom: 50rpx;
	}
	.p-info .p-pannel .p-icon {
	    display: block;
	    margin: 0 auto;
	    width: 70rpx;
	    height: 70rpx;
	    border-radius: 100%;
	}
	.p-info .p-pannel .p-n {
	    text-align: center;
	    color: #434f5d;
	    margin: 10rpx auto;
	}
	.sectionWrap{margin-top: 20rpx;width: 710rpx;padding: 0 20rpx;}
	.sectionList{background: #FFFFFF;border-radius: 20rpx;position: relative;display: flex;flex-direction: column}
	.listItem{font-size: 32rpx;position: relative;flex-direction: column;-webkit-box-pack: justify;justify-content: space-between;border-bottom: 1rpx solid #e5e5e5;;}
	.listItem:last-of-type{border-bottom: none;}
	.listItem_container{display: flex;flex-direction: row;padding: 25rpx 10rpx 25rpx 15rpx;flex: 1;align-items: center;justify-content: space-between;}
	.listItem_icon{margin-right: 20rpx;justify-content: center;flex-direction: row;align-items: center;justify-content: center;}
	.listItem_icon image{width:50rpx;height: 50rpx;}
	.listItem_content{display: flex;flex: 1;color: #3b4144;flex-direction: column;overflow: hidden;align-content: flex-start;}
	.listItem_extra{width: 50rpx;height: 50rpx;display: flex;flex-direction: row;align-items: center;justify-content: flex-end;background: url(../../static/images/right_icon.png) no-repeat center center;background-size:14rpx 24rpx;}
	
	
	
	
</style>
