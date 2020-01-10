<template>
	<view class="detail">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header" :class="nav? 'bg':''">
					<view class="headerLeftMenu">
						<text class="backIcon" @click="navigateBack"></text>
					</view>
		            <view class="header-title-wrap" v-show="showAbs">
						<view class="detail_anchor_wrap">
							<text class="actives">商品</text>
							<text>详情</text>
							<text>推荐</text>
						</view>
		            </view>
					<view class="headerRightMenu">
						<text class="menu"></text>
					</view>
		        </view>
		    </view>
		</view>
		<!-- banner图 -->
		<view class="padding-wrap">
		    <view class="page-section">
		        <view class="page-section-spacing">
		            <swiper class="swiper-container" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#FFFFFF">
		                <swiper-item v-for="(item,index) in imgList" :key="item.index">
		                    <image style="width: 100%;height:100%;" :src="item" @tap="preview" :id="imgList[index]"></image>
		                </swiper-item>
		            </swiper>
		        </view>
		    </view>
			<view class="infoWrap">
				<view class="titleWrap">
					<view class="leftNuber">
						<text class="current">￥{{detaildata.itemendprice}}</text>
						<text class="original">￥{{detaildata.itemprice}}</text>
					</view>
					<view class="rightNuber">
						<text class="sales">销量:{{detaildata.itemsale | tranNumber }}{{getTrueLength(detaildata.itemsale) >=5 ? '万' : ''}}</text>
					</view>
				</view>
				<view class="titleTxtWrap">
					<text class="channel">{{detaildata.shoptype | shopType}}</text>
					<text class="titleTxt">{{detaildata.itemtitle}}</text>
				</view>
			</view>
		</view>
		
		<!-- 推荐词 -->
		<view class="recommend">
			<view class="leftRecommen">
				推荐理由
			</view>
			<view class="rightRecommen">
				{{detaildata.itemdesc}}
			</view>
		</view>
		<!-- banner -->
		<banner-item :titleName='"猜你喜欢"'></banner-item>
		<view class="recommendWrap">
			<scroll-view class="scroll-view_H" show-scrollba="true" scroll-x="true" @scroll="scroll" scroll-left="50">
				<view id="demo1" class="scroll-view-item_H uni-bg-red">猜你喜欢猜你喜欢猜你喜欢</view>
				<view id="demo2" class="scroll-view-item_H uni-bg-green">猜你喜欢猜你喜欢猜你喜欢</view>
				<view id="demo3" class="scroll-view-item_H uni-bg-blue">猜你喜欢猜你喜欢猜你喜欢</view>
			</scroll-view>
			
		</view>
		
		<!-- banner -->
		<banner-item :titleName='"商品详情"'></banner-item>
		<view class="detailWrap">
			<image  v-for="(item,index) in imgList" :key="index" :src="item"></image>
		</view>
		<!-- footer -->
		<view class="footerWrap">
			<view class="partition"></view>
			<view class="footer">
				<view class="footerIcon">
					<view class="souye flexs" @tap="goHome">
						<view class="syIcon"></view>
						<view class="syText">首页</view>
					</view>
					<view class="shoucang flexs">
						<view class="scIcon"></view>
						<view class="scText">收藏</view>
					</view>
				</view>
				<view class="footerCon">
					<view class="inputSeca">分享</view>
					<view class="inputSeca active">立即购买</view>
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
	    data() {
	        return {
	            indicatorDots: true, //是否显示面板指示点
	            autoplay: true, //是否自动切换
	            interval: 2000, //自动切换时间间隔
	            duration: 500, // 滑动时长
				nav:false, // 顶部背景颜色
				imgList:[],
				detaildata:{},
				showAbs:false,
				scrollTop:0,
				itemid:'', // 订单id
					
	        }
	    },
		// 计算属性
		computed: {
			
		},
		onLoad: function(e) {
			this.itemid = e.itemid
		},
		// 创建完成
		created(){
			let that = this
		},
		//挂载完成
		mounted(){
			//获取详情数据
			this.getDetaidata()
		},
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},
			//获取详情数据
			getDetaidata(){
				let self = this
				this.$tools.apiGet('api/item_detail/apikey/'+this.CONFIGAPI.apikey+'/itemid/'+this.itemid).then(function(res){
					if(res.code == 1){
						self.detaildata = res.data || {}
						if(self.detaildata.taobao_image!=null && self.detaildata.taobao_image!='') {
							self.imgList = self.detaildata.taobao_image.split(",")
						}else{
							self.imgList.push(self.detaildata.itempic) 
						}
						
					}
				})
			},
			// 首页
			goHome(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},	
			// 点击大图
		    preview(res){  
				let myindex = res.currentTarget.id;  
				uni.previewImage({  
					urls:this.imgList,  
					current:myindex  
				})  
			},
			// app 监听滚动事件
			onPageScroll(obj){
				this.handleScroll(obj.scrollTop)
			},
			// 滚动事件
			handleScroll(top){
				if(top > 88){
					this.nav = true;
					this.showAbs = true
				}else{
					this.showAbs = false
					this.nav = false;
				}
			},
			/* 左右滑动 */
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
			},
			//获取字符串的真实长度（字节长度）
		    getTrueLength(str){
				if(str==undefined) return '0'
			    let len = str.length, truelen = 0;
			    for(let x = 0; x < len; x++){
			        if(str.charCodeAt(x) > 128){
			            truelen += 2;
			        }else{
			            truelen += 1;
			        }
			    }
			    return truelen;
			}
		},
		// 离开该页面需要移除这个监听的事件
		destroyed(){
			window.removeEventListener('scroll',this.handleScroll)
		}
		
	}
	
	
</script>

<style>
	page{background: #f4f4f4 !important;}
	.swiper-container{min-height: 80vw;}
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
		background-color: transparent;
		font-size: 28rpx;
		color: #05a6fe;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}    
	.bg {background-color: #05a6fe !important;}	  
	.header-title-wrap {
		flex: 1;
		margin: 0 70rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
		position: relative;
	}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
	.detail_anchor_wrap  text.actives{color:#FFFF00 !important;font-size: 32rpx;}
	.headerLeftMenu{background: #05a6fe;border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
	.headerRightMenu{background: #05a6fe;border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;}
	.backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/left_bai_icon.png') no-repeat center center;background-size: 50rpx 50rpx;} 
	.menu{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/icon/sprite_bai_icon.png') no-repeat center center;background-size: 50rpx 50rpx;}   
	
	.padding-wrap{width: 750rpx;display: block;height: 100%;}
	.infoWrap{padding:15rpx 15rpx 20rpx;background:#FFFFFF;}
	.titleWrap{display: flex;align-items: center;justify-content: space-between;padding: 10rpx 0;}
	.leftNuber .current{font-size:40rpx;color: #f33;}
	.leftNuber .original{font-size:28rpx;margin-left: 15rpx;text-decoration:line-through;color: #666;}
	.rightNuber{padding-right: 20rpx;color: #666;}
	.titleTxtWrap{padding:0 10rpx 10rpx;color: #333;}
	.channel{color: #FFFFFF;background: #fe6900;padding: 3rpx 8rpx;font-size:25rpx;margin-right:10rpx;border-radius: 5rpx;}
	.titleTxt{font-size:32rpx}
	
	.recommend{padding: 15rpx;background: #FFFFFF;display: flex;margin-top:20rpx}
	.recommend .leftRecommen{color: #f33;width: 150rpx;text-align:center;font-size:30rpx}
	.recommend .rightRecommen{padding:0rpx 15rpx;color: #333;flex: 1;}
	/* 猜你喜欢 */
	.recommendWrap{display: flex;width: 100%; white-space: nowrap;}
	.scroll-view-item_H {
	    display: inline-block;
	    width: auto;
	    height: 150px;
	    line-height: 150px;
	    text-align: center;
	    font-size: 18px;
	}
	/* 详情 */
	.detailWrap{background: #FFFFFF;}
	.detailWrap image{width: 100%;}
	
	
	/* footerWrap */
	.footerWrap .partition{height: 120rpx;}
	.footer{position: fixed;zoom: 1;bottom: 0;z-index: 999;left:0;width: 710rpx;height: 80rpx;background: #FFFFFF;padding: 15rpx 20rpx;box-shadow: 0 -2px 2px 0 rgba(0,0,0,.1);display:flex;}
	.footerIcon{flex: 1;display: flex;margin-right: 10rpx;}
	.flexs{flex: 1;text-align: center;color: #707070;}
	.syIcon{width: 45rpx;height: 45rpx;margin: 0 auto;background: url(../../static/images/home_nosel.png) no-repeat center center;background-size:45rpx 45rpx;}
	.scIcon{width: 45rpx;height: 45rpx;margin: 0 auto;background: url(../../static/images/icon/sc_icon.png) no-repeat center center;background-size:45rpx 45rpx;}
	.footerCon {height: 80rpx;box-sizing: border-box;background-color: #FF9500;border-radius: 50rpx;color: #FFFFFF;display: flex;width: 500rpx;position: relative;flex: 2;}
	.footerCon .inputSeca { height: 80rpx;flex: 1;text-align: center;line-height: 80rpx;font-size: 30rpx;border-radius: 50rpx;}  
	.footerCon .inputSeca.active{color:#FFFFFF;background: #05a6fe;}
	.footerCon .inputSeca:nth-child(1){border-top-right-radius:0rpx;border-bottom-right-radius:0rpx;}
	.footerCon .inputSeca:last-child{border-top-left-radius:0rpx;border-bottom-left-radius:0rpx;} 


</style>
