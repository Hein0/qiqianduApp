<template>
	<view class="search">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
		            <view class="input-wrap">
		                <input type="text" 
		                       placeholder="搜索商品名或粘贴淘宝商品标题"
		                        v-model="value"
		                       class="inputSeca"/>
		                <text class="iconfont iconfangdajing"></text>
						<text class="iconfont clear" v-if="value!=''" @click="clearVal"></text>
		            </view>
		            <view class="map-wrap" @click="goSearch">
		                <text>搜索</text>
		            </view>
		        </view>
		    </view>
		    <view class="blank"></view>
		</view>
		<!-- 搜索 -->
		<view class="search-pre">
			<!-- 历史记录 -->
			<view class="search-pre-history-wrap" v-if="historyList.length>0">
				<view class="search-pre-history-head">
					<text class="textLis">历史记录</text>
					<text class="clearIcon" @click="clearHistoryList"></text>
				</view>
				<view class="historyList">
					<text v-for="(item,inde) in historyList" :key="inde" @click="selectList(item)">{{item}}</text>
				</view>
			</view>
			<!-- 热门搜索 -->
			<view class="search-pre-host-wrap">
				<view class="search-pre-history-head">
					<text class="textLis">热门搜索</text>
				</view>
				<view class="historyList">
					<text  v-for="(item,inde) in hotWords" :key="inde" @click="selectList(item)">{{item}}</text>
					
				</view>
			</view>
		</view>
		<!-- banner -->
		<banner-item :titleName='"猜你喜欢"'></banner-item>
		<!-- 列表 -->
		<view class="bannerGap">
			<view class="container">
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
				<view class="item-warp">
					<view class="topImg">
						<image src="../../static/images/activation_my.png" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">渠道</text>
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">
						<text class="ruling">￥100 <text class="original">￥500</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售100万</view>
						<view class="bond">100元劵</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
  
</template>
<script>
import bannerItem from '@/components/common/banner.vue';
export default {
	// 组件
	components:{
		bannerItem
	},
	computed: {
		
	},
	data() {
		return {
			pay: {},
			status: '',
			historyList:[],//搜索历史
			hotWords:["让他人",
					"历史记录",
					"风格",
					"发GV讽德诵功",
					"从VBVCD非凡哥",
					"让他个人",
					"海景房",
					"电饭锅电饭锅",
					"东方饭店",
					"45让他的风格",
					"规划局",
					"回家了"],//热门搜索
			payname: '',
			payid: '',
			value: ''  // 搜索值
		};
	},
	onLoad: function() {
		const than = this
		uni.getStorage({
		    key: 'searchAll_key',
		    success: function (res) {
		        than.historyList = res.data
		    }
		});
	},
	methods: {
		// 点击搜索
		goSearch() {
			if(this.value !==''){
				if(this.historyList){
					var str = false;
					for (let i=0;i<this.historyList.length;i++) {
						if(this.historyList[i] === this.value){
							str = true
							break
						}
					}
					if(!str){
						this.historyList.push(this.value)    // 将输入框的值添加到搜索记录数组中存储
						uni.setStorage({
							key: 'searchAll_key',
							data: this.historyList,    
							success: function () {
										
							}
						})
					}
				}else{
					this.historyList.push(this.value)    // 将输入框的值添加到搜索记录数组中存储
					uni.setStorage({
						key: 'searchAll_key',
						data: this.historyList,    
						success: function () {
									
						}
					})
				}
				
				uni.navigateTo({
					url: '/pages/search/searchLists?val='+this.value
				});
			}else if(this.value ===''){
				uni.showToast({
					title:'请输入搜索内容！',
					icon:'none',
					duration:2000
				})
			}
			
		},
		// 清除历史记录
		clearHistoryList(){
			this.historyList = []
			uni.removeStorage({
				key: 'searchAll_key',
				success: function (res) {
					console.log('success');
				}
			});
		},
		// 选中搜索记录 搜索热门
		selectList(val){
			this.value = val
			this.goSearch()
		},	
		// 清除
		clearVal() {
			this.value = ''
		}
	}
};
</script>
<style>
	page{background: #f4f4f4;}
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
		padding: 0 30rpx;
		/* #ifdef APP-PLUS */
		padding-top: 40rpx;
		/* #endif */
		background-color: #FFFFFF;
		font-size: 28rpx;
		color: #05a6fe;
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
		padding: 10rpx 60rpx 10rpx 80rpx;
		box-sizing: border-box;
		background-color: #e8e8e8;
		border-radius: 50rpx;
		color: #666;
		position: relative;
	}
	.input-wrap .inputSeca {
	    height: 25rpx;
		line-height: 25rpx;
		font-size: 26rpx;
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
		font-size: 30rpx;
		position: absolute;
		top:15rpx;
		left: 40rpx;
		background: url('../../static/images/sousuo.png') no-repeat center center;
		background-size: 30rpx 30rpx;
	}	
	.input-wrap .clear {
		width: 25rpx;
		height: 25rpx;
		position: absolute;
		top:20rpx;
		right: 30rpx;
		background: url('../../static/images/p7.png') no-repeat center center;
		background-size: 30rpx 30rpx;
	}
	.rightIcon{
		width: 60rpx;
		height: 60rpx;
		display: block;
		background: url('../../static/images/fenlei.png') no-repeat center center;
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
	
	/* 搜索 */
	.search-pre{
		background-color: #f4f4f4;
		position: relative;
		z-index: 1;
		width: 750rpx;
	}
	.search-pre-history-wrap {
		background: #fff;
		width: 710rpx;
		padding: 0 20rpx	
	}
	.search-pre-host-wrap{
		background: #fff;
		width: 710rpx;
		padding: 0 20rpx
	}
	.search-pre-history-head{
		display: flex;
		padding: 15rpx 0;
		color: #666;
	}
	.search-pre-history-head .textLis{width: 660rpx;height: 50rpx;line-height: 50rpx;color: #666;display: flex;}
	.search-pre-history-head .clearIcon{
		width: 50rpx;
		height: 50rpx;
		background: url('../../static/images/icon_delete.png') no-repeat center center;
		background-size: 60% 60%;
	}
	.historyList{display: flex;flex-wrap: wrap;padding-bottom: 15rpx;}
	.historyList text{margin: 10rpx;padding:10rpx 15rpx;border-radius:10rpx;height:35rpx;line-height: 35rpx;background: #e4e4e4;color: #333;}
	
	/* 列表 */
	.bannerGap{padding: 20rpx;width: 710rpx;}
	.bannerGap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
	.bannerGap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
	.bannerGap .container .item-warp:nth-child(2n){margin-right: 0;}
	.bannerGap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.bannerGap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
	.bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.bannerGap .container .item-warp .price{display: flex;}
	.bannerGap .container .item-warp .price .ruling{color: #fe6900;font-size:32rpx}
	.bannerGap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 28rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 26rpx;background: #e42424;color: #FFFFFF;padding:5rpx 10rpx}
	

</style>