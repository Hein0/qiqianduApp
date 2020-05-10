<template>
    <view class="activity">
        <view class="banner-gap">
        	<view class="container">
        		<view class="item-warp">
        			<image src="../../../static/images/activation_my.png" mode=""></image>
        		</view>
        		<view class="item-warp">
        			<image src="../../../static/images/activation_my.png" mode=""></image>
        		</view>
        		<view class="item-warp">
        			<image src="../../../static/images/activation_my.png" mode=""></image>
        		</view>
        		<view class="item-warp">
        			<image src="../../../static/images/activation_my.png" mode=""></image>
        		</view>
        	</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: [
            
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
    
    		
        }
    }
</script>

<style scoped>
    /* 广告图二 */
    .banner-gap{
    	padding: 10rpx;
    	background: #FFFFFF;
    	width: 730rpx;
    }
    .banner-gap .container { 
    	display: -webkit-box;
    	display: -ms-flexbox;
    	display: flex;
    	flex-wrap: wrap;
    }
    .banner-gap .container .item-warp {
    	width: 353rpx;
    	padding: 6rpx;
    	-webkit-box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07);
    	box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07);
    }
    .banner-gap .container .item-warp image {
    	width: 100%;
    	height: 150rpx;
    }
</style>
