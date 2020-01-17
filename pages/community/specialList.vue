<template>
	<view class="search">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<view class="headerLeftMenu">
						<text class="backIcon" @click="navigateBack"></text>
					</view>
		            <view class="header-title-wrap">
						<view class="detail_anchor_wrap">
							<text>{{title}}</text>
						</view>
		            </view>
					<view class="headerRightMenu">
						<text class="menu"></text>
					</view>
		        </view>
		    </view>
			<view class="blank"></view>
		</view>

		<!-- 列表 -->
		<view class="bannerGap">
			<view class="container">
				<view class="item-warp" v-for="(item,index) in specialList" :key="index" @tap="gotoDetail(item.itemid)">
					<view class="topImg">
						<image :src="item.itempic" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">{{item.shoptype | shopType}}</text>
						{{item.itemtitle}}
					</view>
					<view class="price">
						<text class="ruling">￥{{item.itemendprice}} <text class="original">￥{{item.itemprice}}</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售{{item.itemsale | tranNumber}}{{item.itemsale.length >=5 ? '万' : ''}}</view>
						<view class="bond">{{item.couponmoney}}元</view>
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
	// 计算属性
	computed: {
		
	},
	data() {
		return {
			name: '', // 路由带过来的名称
			title:'', 
			specialList:[],  // 数据列表
		}
	},
	onLoad: function(e) {
		this.name = e.name 
		this.title = e.title
	},
	// 挂载完成
	mounted() {
		//获取列表数据
		this.getdataList();
	},
	// 下拉刷新
	onPullDownRefresh() {
		//下拉刷新的时候请求一次数据
		this.getdataList();
	},
	methods: {
		// 返回
		navigateBack() {
			uni.navigateBack()
		},	
		//获取列表数据
		getdataList() {
			let self = this
			if(self.name !=''){
				this.$tools.apiGet('api/get_subject_item/apikey/'+this.CONFIGAPI.apikey+'/id/'+this.name).then(function(res){
					if(res.code == 1){
						self.specialList = res.data
					}else{
						uni.showToast({
						    title: res.msg,
						    duration: 1500,
							icon:'none'
						});
					}
				})
			}
		},
		
		// 去详情页
		gotoDetail(id){
			uni.navigateTo({
				url: '/pages/index/detail?itemid='+id
			});
			
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
		background-color: #05a6fe;
		font-size: 28rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header-title-wrap {flex: 1;margin: 0 70rpx;height: 60rpx;line-height: 60rpx;color: #FFFFFF;position: relative;}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;font-size:33rpx}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
	.headerLeftMenu{border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
	.headerRightMenu{border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;}
	.backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/left_bai_icon.png') no-repeat 5% center;background-size: 48rpx 48rpx;} 
	
	.blank {
		/* #ifdef APP-PLUS */
	    height: 126rpx; 
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 88rpx;
		/* #endif */
	}
		
	/* 列表 */
	.bannerGap{padding: 20rpx 20rpx 0rpx;width: 710rpx;}
	.bannerGap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
	.bannerGap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
	.bannerGap .container .item-warp:nth-child(2n){margin-right: 0;}
	.bannerGap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.bannerGap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
	.bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.bannerGap .container .item-warp .textTitle .channel{background:#fe6900 ;color: #FFFFFF;font-size:24rpx;padding:5rpx 10rpx;margin-right: 10rpx;border-radius: 5rpx;}
	.bannerGap .container .item-warp .price{display: flex;padding: 10rpx 0rpx;}
	.bannerGap .container .item-warp .price .ruling{color: #fe6900;font-size:34rpx}
	.bannerGap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 26rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 28rpx;background: #e42424;color: #FFFFFF;padding:5rpx 15rpx;position: relative;}
	.salesWrap .bond::before{position: absolute;width: 20rpx;height: 20rpx;content: "";left: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
	.salesWrap .bond::after{position: absolute;width: 20rpx;height: 20rpx;content: "";right: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}

</style>