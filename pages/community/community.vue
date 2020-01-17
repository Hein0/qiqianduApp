<template>
	<view class="community">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
		            <view class="input-wrap">
		                <view class="inputSeca" v-for="(item,index) in navList" :class="{active:tabCurrentIndex === index}" @tap="cuttab(index)" :key="index">{{item.text}}</view>
						
		            </view>
		        </view>
		    </view>
		    <view class="blank"></view>
		</view>
		<!-- 头部 END -->
		<!-- 列表 -->
		<view class="listWrap">
			<view class="listItem" v-if="tabCurrentIndex==0" v-for="(item,index) in handpickList" :key="index">
				<view class="itemTop">
					<image src="../../static/images/icon/sc_default.png" mode=""></image>
					<view class="titleWrap">
						<view class="titleName">仟度</view>
						<view class="tag">{{item.show_time | before_time}}</view>
					</view>
					<view class="share">
						{{item.dummy_click_statistics}}
					</view>
				</view>
				<!-- 内容 -->
				<view class="itemConten">
					<rich-text :nodes="item.show_content"></rich-text>
				</view>
				<!-- 图集 -->
				<view class="itemImg">
					<view class="boxImg" v-for="(items,indx) in item.itempic" :key="indx">
						<image :src="items" mode="" @tap="preview($event,item.itempic)" :id="item.itempic[indx]"></image>
					</view>
				</view>
				<!-- 劵 -->
				<view class="itemBottom">
					<view class="boxBottom" @tap="gotoDetail(item.itemid)"> 
						<image :src="item.sola_image" mode=""></image>
						<view class="rightConten">
							<view class="rightTitle">{{item.itemtitle}}</view>
							<view class="rightCon">
								<view class="itemList">
									<view class="itemNubs">￥{{item.itemendprice}}</view>
									<view class="itemTxt">券后价</view>
								</view>
								<view class="itemList">
									<view class="itemNubs">￥{{item.couponmoney}}</view>
									<view class="itemTxt">券额</view>
								</view>
								<view class="itemList">
									<view class="itemNubs">领劵</view>
									<view class="itemTxt">购买</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--  =========好货专场======  -->
			<view class="listItem" v-if="tabCurrentIndex==1" v-for="(item,index) in specialList" :key="index">
				<view class="itemTop">
					<image src="../../static/images/icon/sc_default.png" mode=""></image>
					<view class="titleWrap">
						<view class="titleName">仟度</view>
						<view class="tag">{{item.addtime | before_time}}</view>
					</view>
					<view class="share">
						{{item.share_times}} 
					</view>
				</view>
				<!-- 内容 -->
				<view class="itemConten">
					<rich-text :nodes="item.show_text"></rich-text>
				</view>
				<!-- 图集 -->
				<view class="itemImg">
					<view class="boxImg" v-for="(items,indx) in item.item_data" :key="indx" v-if="items.itemid" @tap="gotoDetail(items.itemid)">
						<image :src="items.itempic" mode=""></image>
						<view class="itemendprice">劵后￥{{items.itemendprice}}</view>
					</view>
				</view>
			</view>
			<!-- ==========精品专题============ -->
			<view class="listItem" v-if="tabCurrentIndex==2" v-for="(item,index) in specialRing" :key="index" @tap="gotoSpecial(item.id,item.name)">
				<view class="itemWrap">
					<view class="imgWrap">
						<image :src="'http://img.haodanku.com/'+item.app_image" mode=""></image>
						<view class="times">活动时间:{{item.activity_start_time | formatMD}}-{{item.activity_end_time | formatMD}}</view>
					</view>
					<view class="titleWrap">
						<view class="titleName">{{item.name}}</view>
						<view class="tag">{{item.content}}</view>
					</view>
				</view>
				
			</view>
		</view>
		<uni-load-more v-if="tabCurrentIndex!=2"  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/common/uni-load-more.vue';
	export default {
		// 组件
		components:{
			uniLoadMore
		},
		// 计算属性
		computed: {
			
		},
		data() {
			return {
				min_id:1, // 分页数
				tabCurrentIndex: 0,
				navList:[
					{
						state:0,
						text:'精选单品'
					},
					{
						state:1,
						text:'好货专场'
					},
					{
						state:2,
						text:'专题圈'
					}
				],
				imgList:[], // 查看大图
				handpickList:[] ,// 精选单品
				specialList:[], // 好货专场
				specialRing:[], // 专题圈
				loadingText: '加载中...',
				loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '已经到底啦~',
				}
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			//下拉刷新的时候请求一次数据
			this.cuttab(this.tabCurrentIndex);
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
				self.getmoreData(); //加载更多
			}, 300);
		},
		onLoad() {
			//获取列表数据
			this.cuttab(this.tabCurrentIndex);
		},	
		// 挂载完成
		mounted() {
			
		},
		// 方法
		methods: {
			// 切换
			cuttab(index){
				this.min_id = 1
				this.tabCurrentIndex = index
				switch(this.tabCurrentIndex){
					case 0:// 精选单品
						this.handpickList = []
						this.gethandpickList()
						break;
					case 1: //好货专场
						this.specialList = []
						this.getspecialList()
						break;
					case 2: //专题圈
						this.specialRing = []
						this.getspecialRing()
						break;	
					default:
						break;
				}
				
			},
			
			//获取精选单品列表数据
			gethandpickList() {
				let self = this
				self.min_id = 1;
				self.loadingType = 0;
				uni.showNavigationBarLoading();
				this.$tools.apiGet('api/selected_item/apikey/'+this.CONFIGAPI.apikey+'/min_id/'+this.min_id).then(function(res){
					if(res.code == 1){
						self.min_id = res.min_id;//获取下一页的参数值
						self.handpickList = self.disposeText(res.data)
					}else{
						uni.showToast({
						    title: res.msg,
						    duration: 1500,
							icon:'none'
						});
					}
					uni.hideNavigationBarLoading();
				})
			},
			
			// 好货专场
			getspecialList(){
				let self = this
				self.min_id = 1;
				self.loadingType = 0;
				uni.showNavigationBarLoading();
				this.$tools.apiGet('api/subject_hot/apikey/'+this.CONFIGAPI.apikey+'/min_id/'+this.min_id).then(function(res){
					if(res.code == 1){
						self.min_id = res.min_id;//获取下一页的参数值
						self.specialList = self.disposeText2(res.data)
					}else{
						uni.showToast({
						    title: res.msg,
						    duration: 1500,
							icon:'none'
						});
					}
					uni.hideNavigationBarLoading();
				})
			},
			
			// 专题圈
			getspecialRing(){
				let self = this
				self.min_id = 1;
				self.loadingType = 0;
				uni.showNavigationBarLoading();
				this.$tools.apiGet('api/get_subject/apikey/'+this.CONFIGAPI.apikey).then(function(res){
					if(res.code == 1){
						// self.min_id = res.min_id;//获取下一页的参数值
						self.specialRing = res.data
					}else{
						uni.showToast({
						    title: res.msg,
						    duration: 1500,
							icon:'none'
						});
					}
					uni.hideNavigationBarLoading();
				})
			},
			
			// 加载更多
			getmoreData() {
				let self = this,urls=''
				if (self.loadingType !== 0) {//loadingType!=0;直接返回
					return false;
				}
				if(self.tabCurrentIndex ==0){
					urls='api/selected_item/apikey/'+this.CONFIGAPI.apikey+'/min_id/'+this.min_id
				}else if(self.tabCurrentIndex ==1){
					urls='api/subject_hot/apikey/'+this.CONFIGAPI.apikey+'/min_id/'+this.min_id
				}else{
					return
				}	
				self.loadingType = 1;
				uni.showNavigationBarLoading();//显示加载动画
				this.$tools.apiGet(urls).then(function(res){
					if (res.min_id == 0 || res.data==[]) {//没有数据
						self.loadingType = 2;
						uni.hideNavigationBarLoading();//关闭加载动画
						return;
					}
					self.min_id = res.min_id;//获取下一页的参数值
					if(self.tabCurrentIndex ==0){
						self.handpickList = self.handpickList.concat(self.disposeText(res.data));//将数据拼接在一起
					}else if(self.tabCurrentIndex ==1){
						self.specialList = self.specialList.concat(self.disposeText2(res.data));//将数据拼接在一起
					}
					self.loadingType = 0;//将loadingType归0重置
					uni.hideNavigationBarLoading();//关闭加载动画
				})
			},
			
			// 处理富文本
			disposeText(datas){
				let self = this
				let lists = []
				for (let i = 0;i < datas.length;i++) {
				    datas[i].show_content = datas[i].show_content
				        .replace(/&lt;/g, "<")
				        .replace(/&gt;/g, ">")
				        .replace(/&amp;/g, "&")
				        .replace(/&quot;/g, '"')
				        .replace(/&apos;/g, "'");
				    lists.push(datas[i]);
				}
				return lists
			},
			
			// 处理富文本2
			disposeText2(datas){
				let self = this
				let lists = []
				for (let i = 0;i < datas.length;i++) {
				    datas[i].show_text = datas[i].show_text
				        .replace(/&lt;/g, "<")
				        .replace(/&gt;/g, ">")
				        .replace(/&amp;/g, "&")
				        .replace(/&quot;/g, '"')
				        .replace(/&apos;/g, "'");
				    lists.push(datas[i]);
				}
				return lists
			},
			
			// 点击大图
			preview(res,itempic){ 
				let myindex = res.currentTarget.id;  
				this.imgList = itempic
				uni.previewImage({  
					urls:this.imgList,  
					current:myindex  
				})  
			},
			
			// 去详情页
			gotoDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?itemid='+id
				});
			},
			
			//去专场圈
			gotoSpecial(id,title){
				uni.navigateTo({
					url:'/pages/community/specialList?name='+id+"&title="+title
				})
				
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
		background-color: #FFFFFF;
		font-size: 28rpx;
		color: #05a6fe;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}      
	.input-wrap {
		height: 60rpx;
		box-sizing: border-box;
		background-color: #e8e8e8;
		border-radius: 50rpx;
		color: #666;
		display: flex;
		width: 500rpx;
		margin: 0 auto;
		position: relative;
	}
	.input-wrap .inputSeca {
	    height: 60rpx;
		flex: 1;
		text-align: center;
		line-height: 60rpx;
		font-size: 30rpx;
		border-radius: 50rpx;
	}  
	.input-wrap .inputSeca.active{color:#FFFFFF;background: #05a6fe;}
	.input-wrap .inputSeca:nth-child(1){border-top-right-radius:0rpx;border-bottom-right-radius:0rpx;}
	.input-wrap .inputSeca:last-child{border-top-left-radius:0rpx;border-bottom-left-radius:0rpx;}  
	.blank {
		/* #ifdef APP-PLUS */
	    height: 126rpx; 
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 88rpx;
		/* #endif */
	}
	/* 列表 */
	.listWrap{margin-top: 20rpx;padding:0 20rpx}
	.listItem{background: #FFFFFF;border-radius: 20rpx;margin-bottom: 20rpx;padding: 20rpx;}
	.itemTop{display: flex;}
	.itemTop image{width: 80rpx;height: 80rpx;margin-right: 20rpx;border-radius: 100%;}
	.titleWrap{flex: 1;}
	.titleWrap .tag{font-size: 26rpx;color: #666;}
	.share{height:35rpx;line-height: 35rpx;font-size:28rpx;color:#ffffff;padding:10rpx 15rpx 10rpx 55rpx;border-radius: 30rpx;background:#FF9500 url(../../static/images/icon/fx_icon.png) no-repeat 13% center;background-size:35rpx 35rpx}
	.itemConten{padding:15rpx;font-size: 30rpx;}
	.itemImg{padding:10rpx 0rpx;display: flex;flex-wrap: wrap;}
	.itemImg .boxImg{width: 208rpx;margin-left:15rpx;margin-bottom: 10rpx;position: relative;}
	.itemImg .boxImg image{width: 100%;height: 208rpx;}
	.itemImg .boxImg .itemendprice{text-align: center;color: #FFFFFF;font-size:26rpx;background: #e42424;position: absolute;bottom:0rpx;left: 0;right: 0;z-index: 2;padding:10rpx 0}
	
	.listItem .itemWrap .imgWrap{position: relative;width: 100%;}
	.listItem .itemWrap .imgWrap image{width: 100%;}
	.listItem .itemWrap .imgWrap .times{position: absolute;right: 30rpx;bottom: 20rpx;padding: 8rpx 10rpx;border: 1rpx solid #FFFFFF;border-radius: 20rpx;color: #FFFFFF;background: #05a6fe;font-size: 26rpx;}
	
	.itemBottom{border-radius: 20rpx;}
	.boxBottom{padding: 15rpx;background: #f4f4f4;display: flex;border-radius: 20rpx;}
	.boxBottom image{width: 180rpx;height: 180rpx;}
	.rightConten{margin-left: 20rpx;flex: 1;}
	.rightConten .rightTitle{width: 415rpx;color:#333;font-size:32rpx;margin-top:10rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.rightCon{display:flex;border: 1rpx solid #d4237a;margin-top: 15rpx;background: #FFFFFF;border-radius:15rpx;}
	.rightCon .itemList{padding: 15rpx;flex: 1;text-align: center;border-right: 1rpx solid #d4237a;}
	.rightCon .itemList:last-child{border-right: none;background:#d4237a;border-top-right-radius: 10rpx;border-bottom-right-radius: 10rpx;}
	.rightCon .itemList:last-child .itemNubs{font-size:28rpx;color:#FFFFFF}
	.rightCon .itemList:last-child .itemTxt{font-size:28rpx;color:#FFFFFF}
	.rightCon .itemList .itemNubs{font-size:28rpx;color:#d4237a}
	.rightCon .itemList .itemTxt{font-size:25rpx;color:#333}
	
</style>
