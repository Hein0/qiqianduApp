<template>
    <view>
        <view class="advertising">
        	<view class="adverItemWrap">
        		<image src="../../../static/images/banner.webp"></image>
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
    /* 广告一 */
    .advertising{
    	background: #FFFFFF;
    	display: -webkit-box; 
    	display: -ms-flex;
    	display: flex;
    }
    .adverItemWrap{
    	padding: 5rpx 20rpx;
    	flex: 1;
    	-webkit-box-flex:1;
    	border-radius: 10rpx;
    	-webkit-box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07);
    	box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07);
    }
    .adverItemWrap image{
    	width: 100%;
    	height: 170rpx;
    }
</style>
