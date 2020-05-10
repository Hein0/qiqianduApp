<template>
    <view class="menuList">
        <!-- 列表 -->
        <view class="scBwzfXH">
        	<view class="scHtpNat"></view>
        	<view class="scBxivhb">
        		<view class="scIfAKCX">
        			<view class="scEHOje jXFKFG" @tap="gotoList('聚划算','4')">
        				<image src="../../../static/images/home/jhs.png" mode=""></image>
        				<text>聚划算</text>
        			</view>
        			<view class="scEHOje hrPgER" @tap="gotoList('30元封顶','3')">
        				<image src="../../../static/images/home/ssjx.png" mode=""></image>
        				<text>30元精选</text>
        			</view>
        		</view>
        		<view class="scIfAKCX">
        			<view class="scEHOje jXFKFG" @tap="gotoList('天猫超市','11')">
        				<image src="../../../static/images/home/tmcs.png" mode=""></image>
        				<text>天猫超市</text>
        			</view>
        			<view class="scEHOje hrPgER" @tap="gotoList('偏远包邮','12')">
        				<image src="../../../static/images/home/by.png" mode=""></image>
        				<text>偏远包邮</text>
        			</view>
        		</view>
        		<view class="scIfAKCX">
        			<view class="scEHOje jXFKFG" @tap="gotoList('超值品牌','8')">
        				<image src="../../../static/images/home/czpp.png" mode=""></image>
        				<text>超值品牌</text>
        			</view>
        			<view class="scEHOje hrPgER" @tap="moenClass()">
        				<image src="../../../static/images/home/gdfl.png" mode=""></image>
        				<text>更多分类</text>
        			</view>
        		</view>
        		<view class="scIfAKCX">
        			<view class="scEHOje jXFKFG" @tap="gotoList('天猫精品','9')">
        				<image src="../../../static/images/home/tmjp.png" mode=""></image>
        				<text>天猫精品</text>
        			</view>
        			
        		</view>
        		<view class="scIfAKCX">
        			<view class="scEHOje jXFKFG" @tap="gotoList('9.9包邮','2')">
        				<image src="../../../static/images/home/jkj.png" mode=""></image>
        				<text>9.9包邮</text>
        			</view>
        		</view>
        		
        	</view>
        </view>
        <!-- 列表 END -->
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
            // 更多分类
            moenClass(){
            	uni.navigateTo({
            	    url: '/pages/index/classify'
            	});
            },
            
            // 去品牌列表数据
            gotoList(name='',type=''){
                uni.navigateTo({
                    url: '/pages/index/superBrand?name='+name+"&type="+type
                });
            }
            
    		
        }
    }
    
</script>

<style scoped>
    .scBwzfXH{
    	height: 300rpx;
    	width: 100%;
    	margin-top: -18rpx;
    	z-index: 100;
    	position: relative;
    	margin-bottom: 30rpx;
    	padding-bottom: 20rpx;
    }
    .scBwzfXH .scHtpNat{
    	background-image:url('../../../static/images/topbanyuan.png');
    	height: 25rpx;
    	width: 100%;
    	background-size: 100%;
    	margin-bottom: -3rpx; 
    	background-repeat: no-repeat; 
    	background-position: center center;
    }
    .scBxivhb{
    	display: flex;
    	flex-direction: row;
    	height: auto;
    	width: 100%;
    	overflow-x: auto; 
    	background:#FFFFFF;
    	padding-bottom: 20rpx;
    }
    .scBxivhb .scIfAKCX{
    	margin-left: 20rpx;
    }
    .scBxivhb .scIfAKCX .jXFKFG {
    	display: flex; 
    	flex-direction: column;
    	-webkit-box-align: center;
    	align-items: center;
    	height: 134rpx; 
    	width: 120rpx;
    	margin-top: 6rpx;
    }
    .scBxivhb .scIfAKCX .hrPgER {
    	display: flex;
    	flex-direction: column; 
    	-webkit-box-align: center;
    	align-items: center; 
    	height: 134rpx; 
    	width: 120rpx; 
    	margin-top: 10rpx;
    }
    .scBxivhb .scIfAKCX .scEHOje image{
    	height: 100rpx;
    	width: 100rpx;
    }
    .scBxivhb .scIfAKCX .scEHOje text{
    	font-size: 23rpx;
    	line-height: 20rpx;
    	color:rgb(102,102,102);
    	margin-top: 10rpx;
    }
</style>
