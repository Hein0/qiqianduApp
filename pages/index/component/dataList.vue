<template>
    <view class="dataList">
        <view class="bannerGap">
        	<view class="container">
        		<view class="item-warp" v-for="(item,index) in dataList" :key="index" @tap="gotoDetail(item.itemid)">
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
</template>

<script>
    export default {
        props: [
            'dataList'
        ],
        data() {
            return {
    				
            }
        },
        // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object
        onLoad() {
        	
        },
        //计算属性
        computed: {
        
        },
        //挂载完成
        mounted() {
            
        },
        //方法
        methods: {
            // 去详情页
            gotoDetail(id){
            	uni.navigateTo({
            		url: '/pages/index/detail?itemid='+id
            	});
            }
    		
        }
    }
</script>

<style scoped>
    /* 列表 */
    .bannerGap{padding: 20rpx 20rpx 0rpx;width: 710rpx;}
    .bannerGap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
    .bannerGap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
    .bannerGap .container .item-warp:nth-child(2n){margin-right: 0;}
    .bannerGap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
    .bannerGap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
    .bannerGap .container .item-warp .textTitle .channel{background:#fe6900 ;color: #FFFFFF;font-size:22rpx;padding:3rpx 8rpx;margin-right: 10rpx;border-radius: 5rpx;}
    .bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:28rpx;overflow: hidden;line-height: 1.4;}
    .bannerGap .container .item-warp .price{display: flex;padding: 8rpx 0rpx;}
    .bannerGap .container .item-warp .price .ruling{color: #fe6900;font-size:32rpx}
    .bannerGap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
    .salesWrap{display: flex;}
    .salesWrap .sales{font-size: 26rpx;color:#666;flex: 1;}
    .salesWrap .bond{font-size: 24rpx;background: #e42424;color: #FFFFFF;padding:3rpx 15rpx;position: relative;}
    .salesWrap .bond::before{position: absolute;width: 20rpx;height: 20rpx;content: "";left: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
    .salesWrap .bond::after{position: absolute;width: 20rpx;height: 20rpx;content: "";right: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
</style>
