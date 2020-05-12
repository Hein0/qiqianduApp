<template>
    <view>
		<view class="goodList">
			<view class="wrapper">
				<view class="item" v-for="(item,index) in dataList" @click="gotoDetail(item.itemid)" :key="index">
					<view class="isub">
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
							<view class="bond">{{item.couponmoney}}元劵</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
    </view>
</template>

<script>
	import bannerItem from '@/components/common/banner.vue'
	export default {
		components:{
		    bannerItem
		},
        props: [
            'dataList'
        ],
	    data() {
	        return {
					
	        }
	    },
        onLoad() {
        	
        },
        computed: {
        
        },
        mounted() {
            
        },
	    methods: {
            
			// 点击大图
	        preview(res){  
				let myindex = res.currentTarget.id;  
				console.log(myindex)
				uni.previewImage({  
					urls:this.imgList,  
					current:myindex  
				})  
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
	page{
		background-color: #f4f4f4;
		height: 100%
	}
	
	
	
	
	
	
	/* 列表 */
	.goodList{
		background: #FFFFFF;
	}
	.wrapper{
		display: flex;
		flex-wrap: wrap;
	}
	.wrapper .item{
		flex-basis: 50%;
		overflow: hidden;
		position: relative;
		box-sizing: border-box;
	}
	.wrapper .item:after{
		z-index: 2; 
		content: ""; 
		display: block;
		position: absolute; 
		bottom: 0;
		left: 0; 
		right: 0;
		pointer-events: none; 
		border-bottom: 2rpx solid #e5e5e5;
		height: 0;top: auto; -webkit-transform: scaleY(.5); 
		transform: scaleY(.5); 
		-webkit-transform-origin: 50% 100%; 
		transform-origin: 50% 100%;
	}
	.wrapper .item .isub{padding:20rpx;height: 100%;position: relative;box-sizing: border-box;}
	.wrapper .item .isub:after{z-index: 2; content: "";display: block;position: absolute;top: 0;bottom: 0;left: 0; right: 0;pointer-events: none;
    border-right: 2px solid #e5e5e5;
    width: 0; left: auto;-webkit-transform: scaleX(.5);transform: scaleX(.5);-webkit-transform-origin: 100% 0;transform-origin: 100% 0;}
	.wrapper .item .isub .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.wrapper .item .isub .topImg image{width: 280rpx;height: 300rpx;}
	.wrapper .item .isub .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:28rpx;overflow: hidden;line-height: 1.4;}
	.wrapper .item .isub .textTitle .channel{color: #FFFFFF;background: #fe6900;padding: 3rpx 8rpx;font-size:22rpx;margin-right:10rpx;border-radius: 5rpx;}
    .wrapper .item .isub .price{display: flex;}
	.wrapper .item .isub .price .ruling{color: #fe6900;font-size:32rpx}
	.wrapper .item .isub .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 26rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 24rpx;background: #e42424;color: #FFFFFF;padding:3rpx 15rpx;position: relative;}
    .salesWrap .bond::before{position: absolute;width: 20rpx;height: 20rpx;content: "";left: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
    .salesWrap .bond::after{position: absolute;width: 20rpx;height: 20rpx;content: "";right: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
	
</style>
