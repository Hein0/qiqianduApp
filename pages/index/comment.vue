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
							<text>评论</text>
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
		<view class="commentBox">
			<view class="commentAtion">
			    <view class="Praise" v-if="commentsData.keywords && commentsData.keywords.length>0">
			        <text class="praiseItem" v-for="(items,index) in commentsData.keywords" :key="index">{{items.word}}({{items.count}})</text>
			    </view>
			</view>
			<!-- commentsList -->
            <view class="conmentsList" v-if="commentsData.comments && commentsData.comments.length>0">
                <view class="conment-item" v-for="(ite,ind) in commentsData.comments" :key="ind">
                    <view class="conment-itemWrap">
                        <view class="conment-item-name">{{ite.name}}</view>
                        <view class="conment-item-name">{{ite.commentDate}}</view>
                        <view class="conment-item-text">{{ite.hotComment}}</view>
                    </view>
                    <view class="conment-itemImg" v-if="ite.images">
                        <image  v-for="(itemImg,index2) in ite.images" :key="index2" :src="itemImg"></image>
                    </view>
                </view>    
            </view>
		</view>
		<!-- 暂无数据 -->
		<noData v-if="noData"></noData>
		<!-- footer -->
		<!-- <view class="footerWrap">
			<view class="partition"></view>
			<view class="footer">
				<view class="footerIcon">
					<view class="souye flexs" @tap="goHome">
						<view class="syIcon"></view>
						<view class="syText">首页</view>
					</view>
					<view class="shoucang flexs" @tap="clickCollect">
						<view class="scIcon" :class="collect.icon"></view>
						<view class="scText" :class="{fontLs:collect.isCollect==true}">{{collect.name}}</view>
					</view>
				</view>
				<view class="footerCon">
					<view class="inputSeca">分享</view>
		            <view class="inputSeca active" @tap="getLoanbond(detaildata.couponurl)">立即购买</view>
				</view>
			</view>
		</view> -->
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
                goodsId:"",
				collectData:[],
                commentsData:{},
				collectKey: 'orange-collect',
				noData:false,
                collect: { // 收藏样式
                    icon: 'star-o',
                    name: '收藏',
                    isCollect: false,
                },
			}
		},
        //监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		onLoad(e) {
			this.goodsId = e.itemid
		},
		
		//计算属性
		computed: {

		},
		
		// 完成挂载
		mounted() {
			this.getGoodsComments() // 获取评论
		},
		
		//方法
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},
            // 获取评论
			getGoodsComments(){
                let self = this
                uni.request({
                    url: 'http://cmsjapi.ffquan.cn/api/goods/get-goods-comments?goodsId='+this.goodsId, 
                    success: (res) => {
                       if(res.data.code == 0){
                       		self.commentsData = res.data.data || {}
                            if(self.commentsData.keywords.length<=0){
                                self.noData = true
                            }
                       	}else{
                       		uni.showToast({
                       		    title: res.msg,
                       		    duration: 1500,
                       			icon:'none'
                       		});
                       	}
                    }
                })
            }
			
			
		}
	}
</script>

<style>
	page{background: #FFFFFF !important;}
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
	.commentBox {font-size: 28rpx;background: #FFFFFF;}
    .commentAtion{margin-top: 15rpx;overflow: hidden;height: 60rpx;}
    .commentAtion .Praise{padding: 10rpx;}
    .commentAtion .Praise .praiseItem{padding: 10rpx 15rpx;margin:0 8rpx 15rpx; background: #ffede7;font-size:25rpx;border-radius: 20rpx;display: inline-block;}
    
    .conmentsList{margin-top: 30rpx;}
    .conment-item{margin: 0 20rpx;padding: 20rpx 0rpx;border-bottom: 1rpx solid #ececec;}
    .conment-item .conment-itemWrap .conment-item-name{color: #333;line-height: 50rpx;font-size:28rpx}
    .conment-item .conment-itemWrap .conment-item-text{font-size: 26rpx;color: #333;margin-bottom: 15rpx;}
    .conment-item .conment-itemImg {width: 100%;}
    .conment-item .conment-itemImg image{width:31%;height: 180rpx;margin-left: 15rpx;margin-bottom: 10rpx;border-radius: 10rpx;}
    
	
    /* footerWrap */
    .footerWrap .partition{height: 120rpx;}
    .footer{position: fixed;zoom: 1;bottom: 0;z-index: 999;left:0;width: 710rpx;height: 80rpx;background: #FFFFFF;padding: 15rpx 20rpx;box-shadow: 0 -2px 2px 0 rgba(0,0,0,.1);display:flex;}
    .footerIcon{flex: 1;display: flex;margin-right: 10rpx;}
    .flexs{flex: 1;text-align: center;color: #707070;}
    .syIcon{width: 45rpx;height: 45rpx;margin: 0 auto;background: url(../../static/images/home_nosel.png) no-repeat center center;background-size:45rpx 45rpx;}
    .scIcon{width: 45rpx;height: 45rpx;margin: 0 auto;}
    .fontLs{color:#05a6fe}
    .scIcon.star{background: url(../../static/images/icon/sc_icon_sel.png) no-repeat center center;background-size:45rpx 45rpx;}
    .scIcon.star-o{background: url(../../static/images/icon/sc_icon.png) no-repeat center center;background-size:45rpx 45rpx;}
    
    .footerCon {height: 80rpx;box-sizing: border-box;background-color: #FF9500;border-radius: 50rpx;color: #FFFFFF;display: flex;width: 500rpx;position: relative;flex: 2;}
    .footerCon .inputSeca { height: 80rpx;flex: 1;text-align: center;line-height: 80rpx;font-size: 30rpx;border-radius: 50rpx;}  
    .footerCon .inputSeca.active{color:#FFFFFF;background: #05a6fe;}
    .footerCon .inputSeca:nth-child(1){border-top-right-radius:0rpx;border-bottom-right-radius:0rpx;}
    .footerCon .inputSeca:last-child{border-top-left-radius:0rpx;border-bottom-left-radius:0rpx;} 
    
</style>