<template>
	<view class="classify">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<view class="headerLeftMenu">
						<text class="backIcon" @click="navigateBack"></text>
					</view>
		            <view class="header-title-wrap">
						<view class="detail_anchor_wrap">
							<text>我的收藏</text>
						</view>
		            </view>
					<view class="headerRightMenu">
						<text class="menu"></text>
					</view>
		        </view>
		    </view>
			<view class="blank"></view>
		</view>
		<!-- 内容 -->
		<view class="list_box">
			<view class="boxItem" v-for="(item,index) in collectData" :key="index" @tap="gotoDetail(item.itemid)">
				<view class="imgWrap">
					<image :src="item.itempic" mode=""></image>
				</view>
				<view class="content">
					<view class="titles"><text class="channel">{{item.shoptype | shopType}}</text>{{item.itemtitle}}</view>
					<view class="price">
						<text class="ruling">劵后￥{{item.itemendprice}} </text>
						<text class="original">在售价￥{{item.itemprice}}</text>
					</view>
					<view class="salesWrap">
						<view class="sales">销量{{item.itemsale | tranNumber}}{{item.itemsale.length >=5 ? '万' : ''}}</view>
						<view class="bond">{{item.couponmoney}}元劵</view>
					</view>
                    <view class="shopName">{{item.shopname}}</view>
				</view>
			</view>
			
		</view>
		<!-- 暂无数据 -->
		<noData v-if="noData"></noData>
		<!-- 返回顶部-->
		<back-top v-on:TobackTop="backTop" :isShow="isShowBackTop"></back-top>
	</view>
</template>

<script>
	import noData from '@/components/common/noData.vue'
	export default {
		// 组件
		components:{
			noData
		},
		data() {
			return {
				collectData:[],
				collectKey: 'orange-collect',
				noData:true,
                isShowBackTop:false, //是否显示返回顶部按钮
			}
		},
		onLoad() {
			
		},
		
		//计算属性
		computed: {

		},
		
		// 完成挂载
		mounted() {
			this.collectData = this.$queue.get(this.collectKey)
			this.noData = this.collectData.length>0 ? false : true
		},
		
		//方法
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},
            
            // app 监听滚动事件
            onPageScroll(obj){
            	if(obj.scrollTop > 500){
                    this.isShowBackTop = true
                } else {
                    this.isShowBackTop = false
                }
            },
            
            // 回到顶部
            backTop(){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
            },
			
			// 去详情页
			gotoDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?itemid='+id
				});
			}
			
		}
	}
</script>

<style>
	page{background: #f4f4f4 !important;}
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
   .blank {
		/* #ifdef APP-PLUS */
		height: 126rpx;
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 88rpx;
		/* #endif */
	}
	.header-title-wrap {flex: 1;margin: 0 70rpx;height: 60rpx;line-height: 60rpx;color: #FFFFFF;position: relative;}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;font-size:33rpx}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
	.headerLeftMenu{border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
	.headerRightMenu{border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;}
	.backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/left_bai_icon.png') no-repeat 5% center;background-size: 48rpx 48rpx;} 
	
	
	/* 内容 */
	.list_box {font-size: 28rpx;padding: 20rpx;width:710rpx}
	.boxItem{display: flex;background: #FFFFFF;padding: 20rpx 15rpx;border-radius: 10rpx;margin-bottom: 20rpx;}
	.imgWrap{width: 180rpx;height: 180rpx;margin-right: 15rpx;}
	.imgWrap image{width: 180rpx;height: 180rpx;}
	.content{flex: 1;}
	.content .titles{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.content .titles .channel{background:#fe6900 ;color: #FFFFFF;font-size:24rpx;padding:5rpx 10rpx;margin-right: 10rpx;border-radius: 5rpx;}
	.content .price{display: flex;padding: 8rpx 0rpx;text-align: justify}
	.content .price .ruling{color: #fe6900;font-size:32rpx;flex:1;}
	.content .price .original{color: #555555;font-size:26rpx;flex:1;text-align: right;}
	.content .salesWrap{display: flex;}
	.content .salesWrap .sales{font-size: 28rpx;color:#666;flex: 1;}
	.content .salesWrap .bond{font-size: 26rpx;background: #e42424;color: #FFFFFF;padding:5rpx 15rpx;position: relative;}
	.content .salesWrap .bond::before{position: absolute;width: 20rpx;height: 20rpx;content: "";left: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
	.content .salesWrap .bond::after{position: absolute;width: 20rpx;height: 20rpx;content: "";right: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
    .content .shopName{display: flex;margin-top: 10rpx;color:#666;font-size: 26rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left: 35rpx;background: url(../../static/images/icon/shop.png) no-repeat left center;background-size: 28rpx 28rpx;}

</style>