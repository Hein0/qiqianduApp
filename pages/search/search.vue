
<template>
	<view class="search">
		<!-- 头部 -->
		<index-header :input='true' rightIcon='rightIcon'></index-header>
		<view class="uni-tab-bar">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
				 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
			</scroll-view>
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
					 <view class="scBwzfXH" style="margin-top: 100rpx;color:red;font-size:100rpx;width: 100%;height: auto;background:red">
					 	sdfdsf
					 </view>
					 <view class="scBwzfXH" style="margin-top: 100rpx;color:red;font-size:100rpx;width: 100%;height: auto;background:red">
					 	sdfdsf
					 </view>
					 <view class="scBwzfXH" style="margin-top: 100rpx;color:red;font-size:100rpx;width: 100%;height: auto;background:red">
					 	sdfdsf
					 </view>
					 <view class="scBwzfXH" style="margin-top: 100rpx;color:red;font-size:100rpx;width: 100%;height: auto;background:red">
					 	sdfdsf
					 </view>
					 <view class="scBwzfXH" style="margin-top: 100rpx;color:red;font-size:100rpx;width: 100%;height: auto;background:red">
					 	sdfdsf
					 </view>
					{{tab.name}}
				</swiper-item>
			</swiper>
		</view>
		
		
	</view>
  
</template>
<script>
import indexHeader from '@/components/index-header.vue'
import choiceness from '../index/component/choiceness.vue'
export default {
	// 组件
	components:{
		indexHeader,
		choiceness
	},
	computed: {
		
	},
	data() {
		return {
			pay: {},
			status: '',
			paylists: {},
			payname: '',
			payid: '',
			tabindex:1,
			newsitems:[{
				name: '关注',
				id: 'guanzhu'
			}, {
				name: '推荐',
				id: 'tuijian'
			}, {
				name: '体育',
				id: 'tiyu'
			}, {
				name: '热点',
				id: 'redian'
			}, {
				name: '财经',
				id: 'caijing'
			}, {
				name: '娱乐',
				id: 'yule'
			}, {
				name: '军事',
				id: 'junshi'
			}, {
				name: '历史',
				id: 'lishi'
			}, {
				name: '本地',
				id: 'bendi'
			}],
			tabBars: [{
				name: '关注',
				id: 'guanzhu'
			}, {
				name: '推荐',
				id: 'tuijian'
			}, {
				name: '体育',
				id: 'tiyu'
			}, {
				name: '热点',
				id: 'redian'
			}, {
				name: '财经',
				id: 'caijing'
			}, {
				name: '娱乐',
				id: 'yule'
			}, {
				name: '军事',
				id: 'junshi'
			}, {
				name: '历史',
				id: 'lishi'
			}, {
				name: '本地',
				id: 'bendi'
			}],
			scrollLeft: 0,
			isClickChange: false,
			tabIndex: 0,
		};
	},
	onLoad: function(e) {

	},
	methods: {
		async changeTab(e) {
			let index = e.detail.current;
			if (this.isClickChange) {
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			let tabBar = await this.getElSize("tab-bar"),
				tabBarScrollLeft = tabBar.scrollLeft;
			let width = 0;
		
			for (let i = 0; i < index; i++) {
				let result = await this.getElSize(this.tabBars[i].id);
				width += result.width;
			}
			let winWidth = uni.getSystemInfoSync().windowWidth,
				nowElement = await this.getElSize(this.tabBars[index].id),
				nowWidth = nowElement.width;
			if (width + nowWidth - tabBarScrollLeft > winWidth) {
				this.scrollLeft = width + nowWidth - winWidth;
			}
			if (width < tabBarScrollLeft) {
				this.scrollLeft = width;
			}
			this.isClickChange = false;
			this.tabIndex = index; //一旦访问data就会出问题
		},
		async tapTab(index) { //点击tab-bar
		   console.log(index);
			if (this.tabIndex === index) {
				return false;
			} else {
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				this.scrollLeft = tabBarScrollLeft;
				this.isClickChange = true;
				this.tabIndex = index;
			}
		},
		switchtabar(index){
			this.tabindex=index;
		},
		getElSize(id) { //得到元素的size
			return new Promise((res, rej) => {
				uni.createSelectorQuery().select('#' + id).fields({
					size: true,
					scrollOffset: true
				}, (data) => {
					res(data);
				}).exec();
			});
		},
		golist() {
			uni.navigateTo({
				url: '/pages/c2c/selloutlist'
			});
		},
		goerwei() {
			uni.navigateTo({
				url: '/pages/c2c/opay?pay=1'
			});
		}
	}
};
</script>
<style>
	.swiper-box{
		width: 100%;
		height: 100%;
	}
.container {
	width: 100%;
	font-size: 28upx;
	background: #f2f2f2;
	color: #555;
	height: 100vh;
	overflow: scroll;
	position: absolute;
	font-weight: 400;
	text-align: center;
}
.navbar{
	width: 100%;
	font-size: 28upx;
	background: #fff;
	color: #000;
	height: 90upx;
}	
.navbar .navbtn{
	width:33%;
	float:left;
	line-height: 90upx;
	font-size:36px;
	border-bottom:5upx solid #E6BE7D;
}
.navbar .navactive{
	width:33%;
	float:left;
	line-height: 90upx;
	font-size:28px;
	border-bottom:5upx solid #fff;
	color:#ccc;
	
}
	

</style>