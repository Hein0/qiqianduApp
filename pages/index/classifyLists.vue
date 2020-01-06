<template>
	<view class="search">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<view class="headerLeftMenu">
						<text class="backIcon" @click="navigateBack"></text>
					</view>
		            <view class="header-title-wrap">
						<view class="detail_anchor_wrap">
							<text>{{name}}</text>
						</view>
		            </view>
					<view class="headerRightMenu">
						<text class="menu"></text>
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
				<view class="item-warp" v-for="(item,index) in classifyList" :key="index">
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
						<view class="bond">{{item.couponmoney}}元</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
  
</template>
<script>
export default {
	// 组件
	components:{

	},
	// 计算属性
	computed: {
		
	},
	data() {
		return {
			min_id:1, // 分页数
			name: '', // 路由带过来的名称
			cid:'', // 路由带过来的id   0全部，1女装，2男装，3内衣，4美妆，5配饰，6鞋品，7箱包，8儿童，9母婴，10居家，11美食，12数码，13家电，14其他，15车品，16文体
			sort:4, //0.综合（最新），1.券后价(低到高)，2.券后价（高到低），3.券面额，4.销量，5.佣金比例，6.券面额（低到高），7.月销量（低到高），8.佣金比例（低到高），9.全天销量（高到低），10全天销量（低到高），11.近2小时销量（高到低），12.近2小时销量（低到高），13.优惠券领取量（高到低），14.好单库指数（高到低）
			classifyList:[],  // 数据列表
		}
	},
	onLoad: function(e) {
		this.name = e.name 
		this.cid = e.cid
	},
	// 挂载完成
	mounted() {
		//获取列表数据
		this.getdataList();
	
	},
	methods: {
		// 返回
		navigateBack() {
			uni.navigateBack()
		},	
		//获取列表数据
		getdataList() {
			if(this.name !=''){
				uni.request({
				    url: '/api/get_keyword_items/apikey/'+this.CONFIGAPI.apikey+'/keyword/'+this.name+'/back/10/sort/'+this.sort+'/min_id/'+this.min_id+'/cid/'+this.cid, 
				    success: (res) => {
						if(res.data.code == 1){
							this.classifyList = res.data.data || []
						}
				    }
				});
				
			}
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
	.header-title-wrap {flex: 1;margin: 0 70rpx;height: 60rpx;line-height: 60rpx;color: #FFFFFF;position: relative;}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;font-size:33rpx}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
	.headerLeftMenu{border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
	.headerRightMenu{border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;}
	.backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/left_bai_icon.png') no-repeat 5% center;background-size: 48rpx 48rpx;} 
	
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
	.bannerGap{padding: 20rpx;width: 710rpx;}
	.bannerGap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
	.bannerGap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
	.bannerGap .container .item-warp:nth-child(2n){margin-right: 0;}
	.bannerGap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.bannerGap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
	.bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.bannerGap .container .item-warp .textTitle .channel{background:#fe6900 ;color: #FFFFFF;font-size:24rpx;padding:5rpx 10rpx;margin-right: 10rpx;}
	.bannerGap .container .item-warp .price{display: flex;padding: 10rpx 0rpx;}
	.bannerGap .container .item-warp .price .ruling{color: #fe6900;font-size:34rpx}
	.bannerGap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 26rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 28rpx;background: #e42424;color: #FFFFFF;padding:5rpx 10rpx}
	

</style>