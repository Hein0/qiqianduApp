<template>
	<view class="classify">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<view class="headerLeftMenu">
						<text class="backIcon" @click="navigateBack"></text>
					</view>
		            <view class="header-title-wrap" @tap="goSearchPage">
						<view class="detail_anchor_wrap">
							<text>搜索商品名或粘贴淘宝标题</text>
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
			<!-- 菜单左边 -->
			<view class="left">
				<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" :style="{ 'height':scrollHeight }">
					<view class="item" v-for="(item,index) in leftArray" :key="index" :id='"item-"+index' :class="{ 'active':index==leftIndex }"
					 :data-index="index" @tap="leftTap($event,index,item.cid,item.data)">{{item.main_name}}</view>
				</scroll-view>
			</view>
			<view class="main">
				<scroll-view :scroll-y="true" :style="{ 'height':scrollHeight }" scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
					<block v-for="(item,index) in mainArray" :key="index">
						<view class="listItem">
							<view class="title">
								<text style="color: #999;">一</text>
								<text style="margin-left: 10rpx;margin-right: 10rpx;color: #333;">{{item.next_name}}</text>
								<text style="color: #999;">一</text>
							</view>
							<view class="goods">
								<view class="boxItem" v-for="(items,indexs) in item.info" :key="indexs" @tap="gotoSearchLists(items.son_name)">
									<image :src="items.imgurl"></image>
									<view class="texts">{{items.son_name}}</view>
								</view>
							</view>
						</view>
					</block>
		
				</scroll-view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight: '500rpx',
				min_id:1, // 分页数
				cid:'', // cid
				leftArray: [], //左边导航
				mainArray: [], //右边列表
				topArr: [],
				leftIndex: 0, // 下标
				isMainScroll: false,
				scrollInto: '',
                scrollInto:"", // 滚动的id名
				tipsTop: '0px'
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
					// #ifdef APP-PLUS
					this.scrollHeight = `${res.windowHeight - 60}px`;
					// #endif
					// #ifdef H5 || MP-WEIXIN
					this.scrollHeight = `${res.windowHeight - 45}px`;
					// #endif
					console.log('gaodu', res.windowHeight)
				}
			});
			//获取列表数据
			this.getListData();
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},
			// 搜索
			goSearchPage() {
				uni.switchTab({
					url:'/pages/search/search'
				})
			},
			/* 获取列表数据 */
			getListData() {
				let self = this
				this.$tools.apiGet('api/super_classify/apikey/Hein').then(function(res){
					if(res.code == 1){
						self.leftArray = res.general_classify
						self.cid = res.general_classify[0].cid
						self.mainArray = res.general_classify[0].data  // 初始化第一条数据
					}
				})
			},
			// 跳转搜索页
			gotoSearchLists (name){
				uni.navigateTo({
					url: '/pages/index/classifyLists?cid='+this.cid+'&name='+name
				});
			},
			
			/* 主区域触摸 */
			mainTouch() {
				this.isMainScroll = true;
			},
            
			/* 左侧导航点击 */
			leftTap(e,index,cid,data) {
				let inds = e.currentTarget.dataset.index;
				this.isMainScroll = false;
				this.cid = cid
				this.mainArray = data || [];
				this.leftIndex = Number(index);
				this.scrollInto = `item-${inds}`;
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
	.header-title-wrap {flex: 1;height: 60rpx;line-height: 60rpx;color: #999;position: relative;}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;font-size:28rpx;display: flex;background: #FFFFFF;border-radius: 30rpx;text-indent: 50rpx;}
	.detail_anchor_wrap  text{flex: 1;}
	.headerLeftMenu{border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
	.headerRightMenu{border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;}
	.backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/left_bai_icon.png') no-repeat 5% center;background-size: 48rpx 48rpx;} 
	
	
	/* 内容 */
	.list_box {display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: flex-start;align-content: flex-start;font-size: 28rpx;}
	.left {width: 199rpx;background-color: #f6f6f6;line-height: 90rpx;box-sizing: border-box;font-size: 32rpx;text-align:center;border-right: 1rpx solid #ccc;}
	.item {padding-left: 20rpx;position: relative;}
	.item.active,.item:active {color: #0b9aff;background-color: #fff;border-left: 5rpx solid #0b9aff;}
	
	.main {padding-left: 20rpx;width: 0;flex-grow: 1;box-sizing: border-box;}
	.listItem{text-align: center;}
	.tips {line-height: 64rpx;font-size: 24rpx;font-weight: bold;color: #666;height: 64rpx;position: fixed;top: 44px;right: 0;width: 530rpx;z-index: 10;background-color: #fff;padding-left: 10rpx;}
	.title {line-height: 80rpx;position: relative;font-size: 30rpx;color: #666;height: 80rpx;text-align: center;}
	.goods {display: flex; flex-wrap: wrap;}
	.goods .boxItem{width: 176rpx;margin-bottom: 15rpx;}
	.goods .boxItem image {width: 60%;height: calc(71.44vw / 3 * .6);margin: 0 auto;border-radius: 50%;}
	.texts {font-size: 26rpx;color: #333;padding: 5px 0;overflow: hidden;}
	
	
	
</style>