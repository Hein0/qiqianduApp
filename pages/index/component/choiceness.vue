<template>
    <view>
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#FFFFFF">
                        <swiper-item>
                            <image style="width: 100%;height:100%;" src="../../static/images/ssd.jpg" mode=""></image>
                        </swiper-item>
                        <swiper-item>
                            <image style="width: 100%;height:100%;" src="../../static/images/ssd.jpg" mode=""></image>
                        </swiper-item>
                        <swiper-item>
                            <image style="width: 100%;height:100%;" src="../../static/images/ssd.jpg" mode=""></image>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
		<!-- 列表 -->
		<view class="scBwzfXH">
			<view class="scHtpNat"></view>
			<view class="scBxivhb">
				<view class="scIfAKCX">
					<view class="scEHOje jXFKFG">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
					<view class="scEHOje hrPgER">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
				</view>
				<view class="scIfAKCX">
					<view class="scEHOje jXFKFG">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
					<view class="scEHOje hrPgER">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
				</view>
				<view class="scIfAKCX">
					<view class="scEHOje jXFKFG">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
					<view class="scEHOje hrPgER">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
				</view>
				<view class="scIfAKCX">
					<view class="scEHOje jXFKFG">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
					<view class="scEHOje hrPgER">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
				</view>
				<view class="scIfAKCX">
					<view class="scEHOje jXFKFG">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
					<view class="scEHOje hrPgER">
						<image src="../../static/images/home_sel.png" mode=""></image>
						<text>天猫超市</text>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 列表 END -->
		<!-- 广告 -->
		<view class="advertising">
			<view class="adverItemWrap">
				<image src="../../static/images/banner.webp"></image>
			</view>
		</view>
		<!-- 广告图二 -->
		<view class="banner-gap">
			<view class="container">
				<view class="item-warp">
					<image src="../../static/images/activation_my.png" mode=""></image>
				</view>
				<view class="item-warp">
					<image src="../../static/images/activation_my.png" mode=""></image>
				</view>
				<view class="item-warp">
					<image src="../../static/images/activation_my.png" mode=""></image>
				</view>
				<view class="item-warp">
					<image src="../../static/images/activation_my.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- banner标题 -->
		<view class="bannerWrap">
			<text class="left"></text>
			<text>为你推荐</text>
			<text class="right"></text>
		</view>
		<!-- 列表 -->
		<view class="goodList">
			<view class="wrapper">
				<view class="item">
					<view class="isub">
						<view class="topImg">
							<image src="../../static/images/activation_my.png" mode=""></image>
						</view>
						<view class="textTitle">
							<text class="channel">渠道</text>
							标题
						</view>
						<view class="price">
							<text>100</text>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="isub">
						<view class="topImg">
							<image src="../../static/images/activation_my.png" mode=""></image>
						</view>
						<view class="textTitle">
							<text class="channel">渠道</text>
							标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
						</view>
						<view class="price">
							<text>100</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
    </view>
</template>

<script>
	import imgs from "@/static/images/activation_my.png";
	export default {
	    data() {
	        return {
	            background: ['color1', 'color2', 'color3'],
	            indicatorDots: true, //是否显示面板指示点
	            autoplay: true, //是否自动切换
	            interval: 2000, //自动切换时间间隔
	            duration: 500  ,// 滑动时长
				DirectSupply: [{
						imgSrc: imgs,
						description: "新秀丽制造商",
						price: 49
					},
					{
						imgSrc: imgs,
						description: "Nine West制造商",
						price: 199,
						new: true
					},
					{
						imgSrc: imgs,
						description: "MUJI制造商",
						price: 19
					},
					{
						imgSrc: imgs,
						description: "CK Jeans制造商",
						price: 169,
						new: true
					}],
					
	        }
	    },
	    methods: {
	        
	    }
	}
</script>

<style>
	page{
		background-color: #f4f4f4;
		height: 100%;
	}
	.uni-padding-wrap{
		display: flex;
		display: -webkit-flex;
		margin-top: 20rpx;
		padding:0 20rpx;
		position: relative;
		width: 710rpx;
		flex: 1;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
	}
	
	.page-section{border-radius: 10rpx;}
	.activeColor {background:#FFFFFF}
	.scBwzfXH{height: 300rpx;width: 100%;margin-top: -18rpx;z-index: 100;position: relative;margin-bottom: 30rpx;padding-bottom: 20rpx;}
	.scBwzfXH .scHtpNat{background-image:url('../../../static/images/topbanyuan.png');height: 25rpx; width: 100%;background-size: 100%;margin-bottom: -3rpx; background-repeat: no-repeat; background-position: center center;}
	.scBxivhb{display: flex;flex-direction: row; height: auto;width: 100%;overflow-x: auto; background:#FFFFFF;padding-bottom: 20rpx;}
	.scBxivhb .scIfAKCX{margin-left: 20rpx;}
	.scBxivhb .scIfAKCX .jXFKFG { display: flex; flex-direction: column;-webkit-box-align: center;align-items: center;height: 134rpx; width: 120rpx;margin-top: 6rpx;}
	.scBxivhb .scIfAKCX .hrPgER {display: flex;flex-direction: column; -webkit-box-align: center; align-items: center; height: 134rpx; width: 120rpx; margin-top: 10rpx;}
	.scBxivhb .scIfAKCX .scEHOje image{height: 96rpx;width: 100rpx;}
	.scBxivhb .scIfAKCX .scEHOje text{font-size: 23rpx;line-height: 20rpx;color:rgb(102,102,102);margin-top: 10rpx;}
	
	/* 广告一 */
	.advertising{background: #FFFFFF;display: -webkit-box; display: -ms-flex;display: flex;}
	.adverItemWrap{padding: 5rpx 20rpx;flex: 1;-webkit-box-flex:1;border-radius: 10rpx;-webkit-box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07);box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07);}
	.adverItemWrap image{width: 100%;height: 170rpx;}
	/* 广告图二 */
	.banner-gap{padding: 10rpx ;background: #FFFFFF;width: 730rpx;}
	.banner-gap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
	.banner-gap .container .item-warp {width: 353rpx;padding: 6rpx;}
	.banner-gap .container .item-warp image {-webkit-box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07); box-shadow: 0 0 5rpx 0 rgba(62,62,62,.07);width: 100%;height: 150rpx;}
	/* banner标题 */
	.bannerWrap{margin: 20rpx 0 0;line-height: 50px;background: #FFFFFF;color:#555;display: flex;text-align: center;justify-content: center;align-items: center;-webkit-box-align: center;-webkit-box-pack: center;font-size:32rpx}
	.bannerWrap .left{width: 100rpx;height: 2rpx;background: #555;}
	.bannerWrap .right{width: 100rpx;height: 2rpx;background: #555;}
	/* 列表 */
	.goodList{background: #FFFFFF;}
	.wrapper{display: flex;flex-wrap: wrap;}
	.wrapper .item{flex-basis: 50%;overflow: hidden}
	.wrapper .item .isub{padding: 10rpx 20rpx;height: 100%;}
	.wrapper .item .isub .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.wrapper .item .isub .topImg image{width: 280rpx;height: 300rpx;}
	.wrapper .item .isub .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}

</style>
