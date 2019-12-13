<template name="pageHead">
    <view class="pageHead">
        <view class="header-wrap">
            <view class="index-header">
                <text class="address" v-if="leftWords">{{leftWords}}</text>
                <view class="input-wrap" v-if="input">
                    <input type="text" 
                           placeholder="搜索商品名或粘贴淘宝商品标题"
                            v-model="value"
                           @change="gotoSearch" disabled="disabled" class="inputSeca"/>
                    <text class="iconfont iconfangdajing"></text>
                </view>
                <view class="map-wrap"
                      v-if="rightWords||rightIcon"
                      @click="rightClick">
                    <text class="iconfont" :class="rightIcon"></text>
                    <text v-if="rightWords">{{rightWords}}</text>
                </view>
            </view>
        </view>
        <view class="blank"></view>

    </view>
</template>

<script>
    export default {
        name: "pageHead",
        props: [
            'leftWords',
            'input',
            'rightIcon',
            'rightWords'
        ],
        data () {
            return {
                value: ''
            }
        },
        methods: {
			//跳转
            gotoSearch: function () {
                this.$emit('change',this.value)
            },
			// 分类
            rightClick: function () {
                // this.$emit("rightClick")
				uni.showToast({
					title:'sss',
					center:'ss'
				})
            }
        }
    }
</script>

<style>
    .header-wrap {
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
    }    
	.index-header {
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 30rpx;
		/* #ifdef APP-PLUS */
		padding-top: 40rpx;
		/* #endif */
		background-color: #05a6fe;
		font-size: 28rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}    
	.address {
		font-size: 26rpx;
	}
            
	.input-wrap {
		width: 615rpx;
		height: 60rpx;
		padding: 10rpx 30rpx 10rpx 80rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 50rpx;
		color: #333333;
		position: relative;
	}
	.input-wrap .inputSeca {
	    height: 40rpx;
		font-size: 28rpx;
	}
    .input-wrap text {
        position: absolute;
        left: 40rpx;
        top: -8rpx;
        color: #999999;
        font-size: 30rpx;
    }        
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
		position: absolute;
		top:15rpx;
		background: url('../static/images/sousuo.png') no-repeat center center;
		background-size: 30rpx 30rpx;
	}	
    .rightIcon{
		width: 60rpx;
		height: 60rpx;
		display: block;
		background: url('../static/images/fenlei.png') no-repeat center center;
		background-size: 60rpx 60rpx;
	}
    .blank {
		/* #ifdef APP-PLUS */
        height: 126rpx;
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 88rpx;
		/* #endif */
    }
</style>