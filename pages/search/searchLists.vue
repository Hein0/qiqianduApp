<template>
	<view class="search">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<text class="backIcon" @click="navigateBack"></text>
		            <view class="input-wrap">
		                <input type="text" 
		                       placeholder="搜索商品名或粘贴淘宝商品标题"
		                        v-model="value"
		                       class="inputSeca"/>
		                <text class="iconfont iconfangdajing"></text>
						<text class="iconfont clear" v-if="value!=''" @click="clearVal"></text>
		            </view>
		            <view class="map-wrap" @click="goSearch">
		                <text>搜索</text>
		            </view>
		        </view>
		    </view>
		    <view class="blank"></view>
		</view>
		<!-- searchNavWrap -->
		<view class="searchNavWrap">
			<view class="searchNav">
				<view class="navItem active">综合</view>
				<view class="navItem">销量</view>
				<view class="navItem">价格</view>
				<view class="navItem">筛选<text class="icon-Filte"></text></view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="bannerGap">
			<view class="container">
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
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
			pay: {},
			status: '',
			searchlists: {},
			payname: '',
			payid: '',
			value: ''
		};
	},
	onLoad: function(e) {
		this.value = e.val 
	},
	methods: {
		// 返回
		navigateBack() {
			uni.navigateBack()
		},	
		goSearch() {
			
		},
		// 清除
		clearVal() {
			this.value = ''
		}
	}
};
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
	.address {
		font-size: 26rpx;
	}
	        
	.input-wrap {
		/* width: 615rpx; */
		flex:1;
		height: 60rpx;
		padding: 10rpx 60rpx 10rpx 80rpx;
		box-sizing: border-box;
		background-color: #e8e8e8;
		border-radius: 50rpx;
		color: #666;
		position: relative;
	}
	.input-wrap .inputSeca {
	    height: 25rpx;
		line-height: 25rpx;
		font-size: 26rpx;
	}    
	.backIcon{height: 60rpx;width: 70rpx;background: url('../../static/images/left_icon.png') no-repeat 5% center;background-size: 50rpx 50rpx;} 
	.map-wrap{width: 60rpx;margin-left: 25rpx;}   
	.map-wrap .iconfont {
	    font-size: 32rpx;
	    margin-right: 5rpx;
	}    
	.map-wrap text {
	    font-size: 26rpx;
	}
	.input-wrap .iconfangdajing {
		width: 30rpx;
		height: 30rpx;
		font-size: 30rpx;
		position: absolute;
		top:15rpx;
		left: 40rpx;
		background: url('../../static/images/sousuo.png') no-repeat center center;
		background-size: 30rpx 30rpx;
	}	
	.input-wrap .clear {
		width: 25rpx;
		height: 25rpx;
		position: absolute;
		top:20rpx;
		right: 30rpx;
		background: url('../../static/images/p7.png') no-repeat center center;
		background-size: 30rpx 30rpx;
	}
	.rightIcon{
		width: 60rpx;
		height: 60rpx;
		display: block;
		background: url('../../static/images/fenlei.png') no-repeat center center;
		background-size: 60rpx 60rpx;
	}
	.blank {
		/* #ifdef APP-PLUS */
	    height: 203rpx; 
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 165rpx;
		/* #endif */
	}
	
	/* searchNavWrap */
	.searchNavWrap{display: block;position: fixed;left: 0;top: 88rpx;right: 0;z-index: 999;}
	.searchNav {display: -webkit-box;display: -ms-flexbox; display: flex;-ms-flex-pack: distribute;justify-content: space-around;-ms-flex-flow: row nowrap;border-bottom: 1rpx solid #f4f4f4; background: #FFF;}	
	.searchNav .navItem {-webkit-box-flex: 1;-moz-flex-grow: 1;-ms-flex-positive: 1;flex-grow: 1; padding: 10rpx 0;text-align: center;font-size: 30rpx;color: #666;letter-spacing: 0;}	
	.searchNav .navItem.active{color: #0b9aff;}	
	.icon-Filte {
	    width: 30rpx;
	    height: 33rpx;
	    display: inline-block;
	    background: url('../../static/images/screen-off@2x.png') no-repeat bottom ;
	    margin-left: 5rpx;
	    background-size: 30rpx 26rpx;
	}
		
	/* 列表 */
	.bannerGap{padding: 20rpx;width: 710rpx;}
	.bannerGap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
	.bannerGap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
	.bannerGap .container .item-warp:nth-child(2n){margin-right: 0;}
	.bannerGap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.bannerGap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
	.bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.bannerGap .container .item-warp .price{display: flex;}
	.bannerGap .container .item-warp .price .ruling{color: #fe6900;font-size:32rpx}
	.bannerGap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 28rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 26rpx;background: #e42424;color: #FFFFFF;padding:5rpx 10rpx}
	

</style>