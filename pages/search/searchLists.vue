<template>
	<view class="search">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<text class="backIcon" @click="navigateBack"></text>
		            <view class="input-wrap">
		                <input type="text" 
		                       placeholder="搜索商品名或粘贴淘宝商品标题"
		                        v-model="val"
		                       class="inputSeca"/>
		                <text class="iconfont iconfangdajing"></text>
						<text class="iconfont clear" v-if="val!=''" @click="clearVal"></text>
		            </view>
		            <view class="map-wrap" @click="goSearch">
		                <text>搜索</text>
		            </view>
		        </view>
		    </view>
		    <view class="blank"></view>
		</view>
		<!-- searchNavWrap -->
		<view class="searchNavWrap">
			<view class="searchNav">
				<view class="navItem active">综合</view>
				<view class="navItem">销量</view>
				<view class="navItem">价格</view>
				<view class="navItem">筛选<text class="icon-Filte"></text></view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="bannerGap">
			<view class="container">
				<view class="item-warp" v-for="(item,index) in searchLists" :key="index"  @tap="gotoDetail(item.itemid)">
					<view class="topImg">
						<image :src="item.itempic" mode=""></image>
					</view>
					<view class="textTitle">
						<text class="channel">{{item.shoptype | shopType}}</text>
						{{item.itemtitle}}
					</view>
					<view class="price">
						<text class="ruling">￥{{item.itemendprice}}  <text class="original">￥{{item.itemprice}}</text></text>
					</view>
					<view class="salesWrap">
						<view class="sales">已售{{item.itemsale | tranNumber}}{{item.itemsale.length >=5 ? '万' : ''}}</view>
						<view class="bond">{{item.couponmoney}}元劵</view>
					</view>
				</view>
				
			</view>
		</view>
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	</view>
  
</template>
<script>
	import uniLoadMore from '@/components/common/uni-load-more.vue';
	export default {
		// 组件
		components:{
			uniLoadMore
		},
		computed: {
			
		},
		data() {
			return {
				min_id:1, // 分页数
				timer: null,
				val: '', // 路由带过来的名称
				cid:'', // 路由带过来的id   0全部，1女装，2男装，3内衣，4美妆，5配饰，6鞋品，7箱包，8儿童，9母婴，10居家，11美食，12数码，13家电，14其他，15车品，16文体
				sort:0, //0.综合（最新），1.券后价(低到高)，2.券后价（高到低），3.券面额，4.销量，5.佣金比例，6.券面额（低到高），7.月销量（低到高），8.佣金比例（低到高），9.全天销量（高到低），10全天销量（低到高），11.近2小时销量（高到低），12.近2小时销量（低到高），13.优惠券领取量（高到低），14.好单库指数（高到低）
				searchLists:[],  // 数据列表
				loadingText: '加载中...',
				loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '已经到底啦~',
				}
			}
		},
		onLoad: function(e) {
			this.val = e.val
		},
		// 挂载完成
		mounted() {
			//获取列表数据
			this.getdataList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			//下拉刷新的时候请求一次数据
			this.getdataList();
		},
		// 上拉加载
		onReachBottom() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			let self = this
			if (self.timer != null) {
				clearTimeout(self.timer);
			}
			self.timer = setTimeout(function() {
				self.getmoreData();
			}, 300);
		},				
		// 方法
		methods: {
			//获取列表数据
			getdataList() {
				let self = this
				if(self.val !=''){
					self.min_id = 1;
					self.loadingType = 0;
					uni.showNavigationBarLoading();
					this.$tools.apiGet('api/supersearch/apikey/'+this.CONFIGAPI.apikey+'/keyword/'+this.val+'/back/10/sort/'+this.sort+'/min_id/'+this.min_id+'/tb_p/'+1).then(function(res){
						if(res.code == 1){
							self.min_id = res.min_id;//获取下一页的参数值
							self.searchLists = res.data || []
						}
					})
				}
			},
			// 加载更多
			getmoreData() {
				let self = this
				if (self.loadingType !== 0) {//loadingType!=0;直接返回
					return false;
				}
				self.loadingType = 1;
				uni.showNavigationBarLoading();//显示加载动画
				this.$tools.apiGet('api/supersearch/apikey/'+this.CONFIGAPI.apikey+'/keyword/'+this.val+'/back/10/sort/'+this.sort+'/min_id/'+this.min_id+'/tb_p/'+1).then(function(res){
					if (res.data == null) {//没有数据
						self.loadingType = 2;
						uni.hideNavigationBarLoading();//关闭加载动画
						return;
					}
					self.min_id = res.min_id;//获取下一页的参数值
					self.searchLists = self.searchLists.concat(res.data);//将数据拼接在一起
					self.loadingType = 0;//将loadingType归0重置
					uni.hideNavigationBarLoading();//关闭加载动画
				})
			},
			// 去详情页
			gotoDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?itemid='+id
				});
			},
			// 返回
			navigateBack() {
				uni.navigateBack()
			},	
			//搜索
			goSearch() {
				if(this.value !=''){
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
					
				}
			},
			// 清除
			clearVal() {
				this.val = ''
			}
		}
	}
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
	.input-wrap {
		/* width: 615rpx; */
		flex:1;
		height: 60rpx;
		padding: 10rpx 60rpx 10rpx 80rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 50rpx;
		color: #666;
		position: relative;
	}
	.input-wrap .inputSeca {
	    height: 31rpx;
		width: 100%;
		line-height: 31rpx;
		font-size: 26rpx;
	}    
	.backIcon{height: 60rpx;width: 70rpx;background: url('../../static/images/left_bai_icon.png') no-repeat 5% center;background-size: 50rpx 50rpx;} 
	.map-wrap{margin-left: 25rpx;}   
	.map-wrap .iconfont {font-size: 34rpx; margin-right: 5rpx;}    
	.map-wrap text { font-size: 30rpx;}
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
		top:20rpx;
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
	    height: 203rpx; 
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 165rpx;
		/* #endif */
	}
	
	/* searchNavWrap */
	.searchNavWrap{
		display: block;
		position: fixed;
		left: 0;
		/* #ifdef APP-PLUS */
		top: 120rpx;
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		top: 88rpx;
		/* #endif */
		right: 0;
		z-index: 999;
	}
	.searchNav {display: -webkit-box;display: -ms-flexbox; display: flex;-ms-flex-pack: distribute;justify-content: space-around;-ms-flex-flow: row nowrap;border-bottom: 1rpx solid #f4f4f4; background: #FFF;}	
	.searchNav .navItem {-webkit-box-flex: 1;-moz-flex-grow: 1;-ms-flex-positive: 1;flex-grow: 1; padding: 20rpx 0;text-align: center;font-size: 30rpx;color: #666;letter-spacing: 0;}	
	.searchNav .navItem.active{color: #0b9aff;}	
	.icon-Filte {
	    width: 30rpx;
	    height: 33rpx;
	    display: inline-block;
	    background: url('../../static/images/screen-off@2x.png') no-repeat bottom ;
	    margin-left: 5rpx;
	    background-size: 30rpx 26rpx;
	}
		
	/* 列表 */
	.bannerGap{padding: 20rpx 20rpx 0rpx;width: 710rpx;}
	.bannerGap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
	.bannerGap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
	.bannerGap .container .item-warp:nth-child(2n){margin-right: 0;}
	.bannerGap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.bannerGap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
	.bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.bannerGap .container .item-warp .textTitle .channel{background:#fe6900 ;color: #FFFFFF;font-size:24rpx;padding:5rpx 10rpx;margin-right: 10rpx;border-radius: 5rpx;}
	.bannerGap .container .item-warp .price{display: flex;padding: 10rpx 0rpx;}
	.bannerGap .container .item-warp .price .ruling{color: #fe6900;font-size:34rpx}
	.bannerGap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 28rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 26rpx;background: #e42424;color: #FFFFFF;padding:5rpx 10rpx}
	

</style>