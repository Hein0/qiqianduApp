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
					<text  v-for="(item,inde) in hotWords" v-if="inde<20" :key="inde" @click="selectList(item.keyword)">{{item.keyword}}</text>
				</view>
			</view>
		</view>
		<!-- banner -->
		<banner-item :titleName='"今日值得买"'></banner-item>
		<!-- 列表 -->
		<view class="bannerGap">
			<view class="container">
				<view class="item-warp" v-for="(item,index) in likeList" :key="index" @tap="gotoDetail(item.itemid)">
					<view class="topImg">
						<image :src="item.itempic" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">{{item.shoptype | shopType}}</text>
						{{item.itemtitle}}
					</view>
					<view class="price">
						<text class="ruling">￥{{item.itemendprice}} <text class="original">￥{{item.itemprice}}</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售{{item.itemsale | tranNumber}}{{item.itemsale.length >=5 ? '万' : ''}}</view>
						<view class="bond">{{item.couponmoney}}元劵</view>
					</view>
                    <view class="shopName">{{item.shopname}}</view>
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
			historyList:[],//搜索历史
			hotWords:[],//热门搜索
			likeList:[], // 今日推荐
			value: ''  // 搜索值
		};
	},
	// 挂载完成
	mounted() {
		//获取热门搜索数据
		this.getHotdata();
		//获取今天值得买
		this.getlikeList();
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
        
		// 获取热门搜索数据
		getHotdata(){
			let self = this
			this.$tools.apiGet('api/hot_key/apikey/'+this.CONFIGAPI.apikey).then(function(res){
				if(res.code == 1){
					self.hotWords = res.data || []
				}else{
					uni.showToast({
						title: res.msg,
						duration: 1500,
						icon:'none'
					});
				}
			})
		},
        
		// 获取今日推荐
		getlikeList(){
			let self = this
			this.$tools.apiGet('api/get_deserve_item/apikey/'+this.CONFIGAPI.apikey).then(function(res){
				if(res.code == 1){
					self.likeList = res.item_info || []
				}else{
					uni.showToast({
						title: res.msg,
						duration: 1500,
						icon:'none'
					});
				}
			})
		},
        
		// 去详情页
		gotoDetail(id){
			uni.navigateTo({
				url: '/pages/index/detail?itemid='+id
			});
			
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
		background-color: #05a6fe;
		font-size: 28rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}    
	.address {
		font-size: 26rpx;
	}
	        
	.input-wrap {
		/* width: 615rpx; */
		display: flex;
		flex: 1;
		/* height: 60rpx; */
		padding: 10rpx 60rpx 10rpx 80rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 50rpx;
		color: #666;
		position: relative;
	}
	.input-wrap .inputSeca {
	    height: 35rpx;
		width: 100%;
		line-height: 35rpx;
		font-size: 26rpx;
        /* #ifdef H5 || MP */
        margin-top: 3rpx;
        /* #endif*/
        /* #ifdef APP-PLUS || APP-PLUS-NVUE*/
        margin-top: 6rpx;
        /* #endif*/
	}   
	.map-wrap{margin-left: 25rpx;}	 
	.map-wrap .iconfont {
	    font-size: 34rpx;
	    margin-right: 5rpx;
	}    
	.map-wrap text {
	    font-size: 30rpx;
	}
	.input-wrap .iconfangdajing {
		width: 30rpx;
		height: 30rpx;
		font-size: 30rpx;
		position: absolute;
		top:15rpx;
		left: 40rpx;
		background: url('../../static/images/sousuo.png') no-repeat center center;
		background-size: 28rpx 28rpx;
	}	
	.input-wrap .clear {
		width: 25rpx;
		height: 25rpx;
		position: absolute;
		top:18rpx;
		right: 30rpx;
		background: url('../../static/images/p7.png') no-repeat center center;
		background-size: 20rpx 20rpx;
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
	.bannerGap .container .item-warp .textTitle .channel{background:#fe6900 ;color: #FFFFFF;font-size:22rpx;padding:3rpx 8rpx;margin-right: 10rpx;border-radius: 5rpx;}
	.bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.bannerGap .container .item-warp .price{display: flex;padding: 8rpx 0rpx;}
	.bannerGap .container .item-warp .price .ruling{color: #fe6900;font-size:32rpx}
	.bannerGap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 26rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 24rpx;background: #e42424;color: #FFFFFF;padding:3rpx 15rpx;position: relative;}
	.salesWrap .bond::before{position: absolute;width: 20rpx;height: 20rpx;content: "";left: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
	.salesWrap .bond::after{position: absolute;width: 20rpx;height: 20rpx;content: "";right: -13rpx; top: 10rpx;background: #FFF;display: block;border-radius: 20rpx;}
	.shopName{display: flex;margin-top: 10rpx;color:#666;font-size: 26rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left: 35rpx;background: url(../../static/images/icon/shop.png) no-repeat left center;background-size: 28rpx 28rpx;}

</style>