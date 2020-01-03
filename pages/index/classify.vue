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
							<text>分类</text>
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
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view class="item" v-for="(item,index) in leftArray" :key="index" :class="{ 'active':index==leftIndex }"
					 :data-index="index" @tap="leftTap">{{item.id}}</view>
				</scroll-view>
			</view>
			<view class="main">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto"
				 scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
					<block>
						<view class="listItem" :id="'item-'+index">
							<view class="title">
								<text style="color: #999;">一</text>
								<text style="margin-left: 10rpx;margin-right: 10rpx;color: #333;">名称</text>
								<text style="color: #999;">一</text>
							</view>
							<view class="goods">
								<view class="boxItem">
									<image src="../../static/images/banner.webp"></image>
									<view class="texts">第个商品</view>
								</view>
								<view class="boxItem">
									<image src="../../static/images/banner.webp"></image>
									<view class="texts">第个商品</view>
								</view>
								<view class="boxItem">
									<image src="../../static/images/banner.webp"></image>
									<view class="texts">第个商品</view>
								</view>
								<view class="boxItem">
									<image src="../../static/images/banner.webp"></image>
									<view class="texts">第个商品</view>
								</view>
								<view class="boxItem">
									<image src="../../static/images/banner.webp"></image>
									<view class="texts">第个商品</view>
								</view>
								<view class="boxItem">
									<image src="../../static/images/banner.webp"></image>
									<view class="texts">第个商品</view>
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
				scrollHeight: '500px',
				leftArray: [{
						id: 1
					},
					{
						id: 2
					},
					{
						id: 3
					},
					{
						id: 4
					},
					{
						id: 5
					},
					{
						id: 6
					},
					{
						id: 7
					},
					{
						id: 8
					},
					{
						id: 2
					},
					{
						id: 3
					},
					{
						id: 4
					},
					{
						id: 5
					},
					{
						id: 6
					},
					{
						id: 7
					},
					{
						id: 8
					}
				],
				mainArray: [],
				topArr: [],
				leftIndex: 0,
				isMainScroll: false,
				scrollInto: '',
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
		},
		computed: {

		},
		mounted() {
			this.getListData();

		},
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},
			/* 获取列表数据 */
			getListData() {
				/* 因无真实数据，当前方法模拟数据 */
				let [left, main] = [
					[],
					[]
				];

				for (let i = 0; i <8; i++) {
					left.push(`${i+1}类商品`);

					let list = [];
					for (let j = 0; j < (i + 1); j++) {
						list.push(j);
					}
					main.push({
						title: `第${i+1}类商品标题`,
						list
					})
				}
				this.mainArray = main;

				this.$nextTick(() => {
					this.getElementTop();
				});
			},
			//获取距离顶部的高度
			getScrollTop(selector) {
				return new Promise((resolve, reject) => {
					let query = uni.createSelectorQuery().in(this);
					query.select(selector + '').boundingClientRect(data => {
						resolve(data.top)
					}).exec();
				})
			},
			/* 获取元素顶部信息 */
			async getElementTop() {
				/* Promise 对象数组 */
				let p_arr = [];

				/* 遍历数据，创建相应的 Promise 数组数据 */
				for (let i = 0; i < this.mainArray.length; i++) {
					const resu = await this.getScrollTop(`#item-${i}`)
					p_arr.push(resu)
				}

				// console.log('p_arr', p_arr)

				/* 主区域滚动容器的顶部距离 */
				this.getScrollTop("#scroll-el").then((res) => {

					let top = res;
					// #ifdef H5
					top += 43; //因固定提示块的需求，H5的默认标题栏是44px
					// #endif

					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then((data) => {
						console.log('滚动', data)
						this.tipsTop = `${data}px`;
						this.topArr = data;
					});
				})
			},

			/* 主区域滚动监听 */
			mainScroll(e) {
				if (!this.isMainScroll) {
					return;
				}
				let top = e.detail.scrollTop;
				let index = -1;

				if (top >= this.topArr[this.topArr.length - 1]) {
					index = this.topArr.length - 1;
				} else {
					index = this.topArr.findIndex((item, index) => {
						return this.topArr[index + 1] >= top;
					});
				}
				this.leftIndex = (index < 0 ? 0 : index);
			},
			/* 主区域触摸 */
			mainTouch() {
				this.isMainScroll = true;
			},
			/* 左侧导航点击 */
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				this.isMainScroll = false;
				this.leftIndex = Number(index);
				this.scrollInto = `item-${index}`;
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
	.header-title-wrap {flex: 1;margin: 0 70rpx;height: 60rpx;line-height: 60rpx;color: #FFFFFF;position: relative;}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;font-size:33rpx}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
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
	.goods .boxItem image {width: 60%;height: calc(71.44vw / 3 * .6);margin: 0 auto;}
	.texts {font-size: 26rpx;color: #333;padding: 5px 0;overflow: hidden;}
	
	
	
</style>