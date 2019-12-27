<template>
	<view class="community">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
		            <view class="input-wrap">
		                <view class="inputSeca" v-for="(item,index) in navList" :class="{active:tabCurrentIndex === index}" @tap="cuttab(index)" :key="index">{{item.text}}</view>
						
		            </view>
		        </view>
		    </view>
		    <view class="blank"></view>
		</view>
		<!-- 头部 END -->
		<!-- 列表 -->
		<view class="listWrap">
			<view class="listItem">
				<view class="itemTop">
					<image src="../../static/images/icon/sc_default.png" mode=""></image>
					<view class="titleWrap">
						<view class="titleName">名字</view>
						<view class="tag">标签</view>
					</view>
					<view class="share">
						1000
					</view>
				</view>
				<!-- 内容 -->
				<view class="itemConten">
					姨妈快来了下一次也不远了自己的必需品就要主动买！自由点日夜混合卫生巾115片到手仅39.9超薄无异怎么动都舒服
				</view>
				<!-- 图集 -->
				<view class="itemImg">
					<view class="boxImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="boxImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="boxImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="boxImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
				</view>
				<!-- 劵 -->
				<view class="itemBottom">
					<view class="boxBottom">
						<image src="../../static/images/activation_my.png" mode=""></image>
						<view class="rightConten">
							<view class="rightTitle">标题啊啊标题啊啊标题啊啊标题啊啊标题啊啊标题啊啊</view>
							<view class="rightCon">
								<view class="itemList">
									<view class="itemNubs">￥0.00</view>
									<view class="itemTxt">券后价</view>
								</view>
								<view class="itemList">
									<view class="itemNubs">￥100</view>
									<view class="itemTxt">券额</view>
								</view>
								<view class="itemList">
									<view class="itemNubs">点击</view>
									<view class="itemTxt">分享</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		// 组件
		components:{
	
		},
		computed: {
			
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList:[
					{
						state:0,
						text:'精选单品'
					},
					{
						state:1,
						text:'好货专场'
					}
				]
			}
		},
		// 方法
		methods: {
			// 切换
			cuttab(index){
				this.tabCurrentIndex = index
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
	.input-wrap {
		height: 60rpx;
		box-sizing: border-box;
		background-color: #e8e8e8;
		border-radius: 50rpx;
		color: #666;
		display: flex;
		width: 500rpx;
		margin: 0 auto;
		position: relative;
	}
	.input-wrap .inputSeca {
	    height: 60rpx;
		flex: 1;
		text-align: center;
		line-height: 60rpx;
		font-size: 30rpx;
		border-radius: 50rpx;
	}  
	.input-wrap .inputSeca.active{color:#FFFFFF;background: #05a6fe;}
	.input-wrap .inputSeca:nth-child(1){border-top-right-radius:0rpx;border-bottom-right-radius:0rpx;}
	.input-wrap .inputSeca:last-child{border-top-left-radius:0rpx;border-bottom-left-radius:0rpx;}  
	.blank {
		/* #ifdef APP-PLUS */
	    height: 126rpx; 
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 88rpx;
		/* #endif */
	}
	/* 列表 */
	.listWrap{margin-top: 20rpx;padding:0 20rpx}
	.listItem{background: #FFFFFF;border-radius: 20rpx;margin-bottom: 20rpx;padding: 20rpx;}
	.itemTop{display: flex;}
	.itemTop image{width: 80rpx;height: 80rpx;margin-right: 20rpx;border-radius: 100%;}
	.titleWrap{flex: 1;}
	.share{width: 100rpx;height:35rpx;line-height: 35rpx;font-size:28rpx;color:#ffffff;padding:10rpx 15rpx 10rpx 65rpx;border-radius: 30rpx;background:#05a6fe url(../../static/images/icon/fx_icon.png) no-repeat 13% center;background-size:35rpx 35rpx}
	.itemConten{padding:15rpx;font-size: 30rpx;}
	.itemImg{padding:10rpx 0rpx;display: flex;flex-wrap: wrap;}
	.itemImg .boxImg{width: 208rpx;margin-left:15rpx;margin-bottom: 10rpx;}
	.itemImg .boxImg image{width: 100%;height: 208rpx;}
	
	.itemBottom{border-radius: 20rpx;}
	.boxBottom{padding: 15rpx;background: #f4f4f4;display: flex;border-radius: 20rpx;}
	.boxBottom image{width: 180rpx;height: 180rpx;}
	.rightConten{margin-left: 20rpx;flex: 1;}
	.rightConten .rightTitle{width: 415rpx;color:#333;font-size:32rpx;margin-top:10rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.rightCon{display:flex;border: 1rpx solid #d4237a;margin-top: 15rpx;background: #FFFFFF;border-radius:15rpx;}
	.rightCon .itemList{padding: 15rpx;flex: 1;text-align: center;border-right: 1rpx solid #d4237a;}
	.rightCon .itemList:last-child{border-right: none;background:#d4237a;border-top-right-radius: 10rpx;border-bottom-right-radius: 10rpx;}
	.rightCon .itemList:last-child .itemNubs{font-size:28rpx;color:#FFFFFF}
	.rightCon .itemList:last-child .itemTxt{font-size:28rpx;color:#FFFFFF}
	.rightCon .itemList .itemNubs{font-size:32rpx;color:#d4237a}
	.rightCon .itemList .itemTxt{font-size:28rpx;color:#333}
	
</style>
