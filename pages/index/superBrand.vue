<template>
	<view class="superbrand">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header">
					<view class="headerLeftMenu">
						<text class="backIcon" @click="navigateBack"></text>
					</view>
		            <view class="header-title-wrap">
						<view class="detail_anchor_wrap">
							<text>{{titleName}}</text>
						</view>
		            </view>
					<view class="headerRightMenu">
						<text class="menu"></text>
					</view>
		        </view>
		    </view>
			<view class="blank"></view>
		</view>
        
        <!-- tab列表 -->
        <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
        	<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="ontabtap($event,tab.cid)">
        		<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
        	</view>
        </scroll-view>
        
        <!-- searchNavWrap -->
        <view class="searchNavWrap">
        	<view class="searchNav">
        		<view class="navItem" :class="{active:current == 0}" @tap="tapHerd(0)">综合</view>
        		<view class="navItem" :class="{active:current == 1 && sort == 1,active2:current == 1 && sort == 2}" @tap="tapHerd(1)">
        			劵后价
        			<view class="tapImg">
        				<text class="up"></text>
        				<text class="drop"></text>
        			</view>
        		</view>
        		<view class="navItem" :class="{active:current == 2 && sort == 10,active2:current == 2 && sort == 9}" @tap="tapHerd(2)">
        			销量
        			<view class="tapImg">
        				<text class="up"></text>
        				<text class="drop"></text>
        			</view>
        		</view>
        	</view>
        </view>
        
		<!-- 内容 -->
		<view class="list_box">
			<view class="boxItem" v-for="(item,index) in dataList" :key="index" @tap="gotoDetail(item.itemid)">
				<view class="imgWrap">
					<image :src="item.itempic" mode=""></image>
				</view>
				<view class="content">
					<view class="titles"><text class="channel">{{item.shoptype | shopType}}</text>{{item.itemtitle}}</view>
					<view class="price">
						<text class="ruling">券后￥{{item.itemendprice}} </text>
						<text class="original">￥{{item.itemprice}}</text>
					</view>
					<view class="salesWrap">
						<view class="quan">
						    券<text class="quanNumb">{{item.couponmoney}}元</text>
						</view>
					</view>
                    <view class="salesWrap">
                    	<view class="shopName">{{item.shopname}}</view>
                        <view class="sales">销量{{item.itemsale | tranNumber}}{{item.itemsale.length >=5 ? '万' : ''}}</view>
                    </view>
                    
				</view>
			</view>
			
		</view>
        <!-- 加载更多-->
        <uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
		<!-- 暂无数据 -->
		<noData v-if="dataList.length<0"></noData>
		<!-- 返回顶部-->
		<back-top v-on:TobackTop="backTop" :isShow="isShowBackTop"></back-top>
	</view>
</template>

<script>
	import noData from '@/components/common/noData.vue'
    import uniLoadMore from '@/components/common/uni-load-more.vue';
	export default {
		// 组件
		components:{
			noData,
            uniLoadMore
		},
		data() {
			return {
                tabIndex: 0, //当前下班
                scrollInto: "",//滚动到的下标
				min_id:1, //当前页码
				isShowBackTop:false, //是否显示返回顶部按钮
				tabBars: [{
				   name: '全部',
				   id:'quanbu',
				   cid: '0'
				}, {
				   name: '女装',
				   id:'nvzhuang',
				   cid: '1'
				}, {
				   name: '男装',
				   id:'nanzhuang',
				   cid: '2'
				}, {
				   name: '内衣',
				   id:'neiyi',
				   cid: '3'
				}, {
				   name: '美妆',
				   id:'meizhuang',
				   cid: '4'
				}, {
				   name: '配饰',
				   id:'peishi',
				   cid: '5'
				}, {
				   name: '鞋品',
				   id:'xiepin',
				   cid: '6'
				}, {
				   name: '箱包',
				   id:'xiangbao',
				   cid: '7'
				}, {
				   name: '儿童',
				   id:'ertong',
				   cid: '8'
				}, {
				   name: '母婴',
				   id:'muying',
				   cid: '9'
				}, {
				   name: '居家',
				   id:'jujia',
				   cid: '10'
				}, {
				   name: '美食',
				   id:'meishi',
				   cid: '11'
				}, {
				   name: '数码',
				   id:'shuma',
				   cid: '12'
				}, {
				   name: '家电',
				   id:'jiadian',
				   cid: '13'
				}, {
				   name: '车品',
				   id:'chepin',
				   cid: '15'
				}, {
				   name: '文体',
				   id:'wenti',
				   cid: '16'
				}, {
				   name: '宠物',
				   id:'chongwu',
				   cid: '17'
				}, {
				   name: '其他',
				   id:'qita',
				   cid: '14'
				}], 
                titleName:"",//名称
                type:"",//商品筛选类型
				cid:"0", //商品类目
                current:0,//当前选中
				sort:0, //0.综合（最新），1.券后价(低到高)，2.券后价（高到低），3.券面额，4.销量，5.佣金比例，6.券面额（低到高），7.月销量（低到高），8.佣金比例（低到高），9.全天销量（高到低），10全天销量（低到高），11.近2小时销量（高到低），12.近2小时销量（低到高），13.优惠券领取量（高到低），14.好单库指数（高到低）
				dataList:[], // 列表数据
                loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
                contentText: {
                	contentdown:'上拉显示更多',
                	contentrefresh: '正在加载...',
                	contentnomore: '没有更多数据啦~',
                },
			}
		},
		onLoad(option) {
            this.titleName = option.name
            this.type = option.type
		},
		
		//计算属性
		computed: {

		},
		
        // 下拉刷新
        onPullDownRefresh() {
        	//下拉刷新的时候请求一次数据
        	this.getdataList(this.cid);
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
        		self.getmoreData(self.cid);
        	}, 300);
        },
        
		// 完成挂载
		mounted() {
			this.getdataList(this.cid)
		},
		
		//方法
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},
            
            // 点击tap
            ontabtap(e,cid) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                if(this.tabIndex == index) return 
                this.min_id = 1;
                this.tabIndex = index;
                this.cid = cid;
                this.scrollInto = this.tabBars[index].id;
                this.backTop(0);
                this.getdataList(this.cid)
            },
            
            //点击筛选
            tapHerd(index){
                console.log(index)
                this.backTop(0);
            	if(index == 0){
                    this.min_id = 1;
            		this.current = index
            		this.sort = 0
            		this.getdataList(this.cid)
            	}else if(index == 1){
                    this.min_id = 1;
            		this.current = index
            		if(this.sort != 1 && this.sort != 2){
            			this.sort = 1
            		}else if(this.sort == 1){
            			this.sort = 2
            		}else if(this.sort == 2){
            			this.sort = 1
            		}
            		this.getdataList(this.cid)
            	}else if(index == 2){
                    this.min_id = 1;
            		this.current = index
            		if(this.sort != 9 && this.sort != 10){
            			this.sort = 10
            		}else if(this.sort == 10){
            			this.sort = 9
            		}else if(this.sort == 9){
            			this.sort = 10
            		}
            		this.getdataList(this.cid)
            	}
            },
            
            // 获取列表数据
            getdataList(cid) {
            	let self = this
                self.loadingType = 0;
                // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
                uni.showNavigationBarLoading();
                // #endif
                this.$tools.apiGet('api/column/apikey/'+this.CONFIGAPI.apikey+'/type/'+this.type+'/back/10/sort/'+this.sort+'/min_id/'+this.min_id+'/cid/'+cid).then(function(res){
                    if(res.code == 1){
                        self.min_id = res.min_id;//获取下一页的参数值
                        self.dataList = res.data || []
                        // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
                        uni.hideNavigationBarLoading();//关闭加载动画
                        // #endif
                    }else if (res.data == [] || res.min_id == 0) {//没有数据
                        self.loadingType = 2;
                        self.dataList = []
                        // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
                        uni.hideNavigationBarLoading();//关闭加载动画
                        // #endif
                        return;
                    }else{
                        // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
                        uni.hideNavigationBarLoading();//关闭加载动画
                        // #endif
                        uni.showToast({
                            title: res.msg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
            
            // 加载更多
            getmoreData(cid) {
            	let self = this
            	if (self.loadingType !== 0) {//loadingType!=0;直接返回
            		return false;
            	}
            	self.loadingType = 1;
                // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
                uni.showNavigationBarLoading();//显示加载动画
                // #endif
            	this.$tools.apiGet('api/column/apikey/'+this.CONFIGAPI.apikey+'/type/2'+'/back/10/sort/'+this.sort+'/min_id/'+this.min_id+'/cid/'+cid).then(function(res){
            		if (res.data == [] || res.min_id == 0) {//没有数据
            			self.loadingType = 2;
                        // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
            			uni.hideNavigationBarLoading();//关闭加载动画
                        // #endif
            			return;
            		}
            		self.min_id = res.min_id;//获取下一页的参数值
            		self.dataList = self.dataList.concat(res.data);//将数据拼接在一起
            		self.loadingType = 0;//将loadingType归0重置
            		// #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
            		uni.hideNavigationBarLoading();//关闭加载动画
            		// #endif
            	})
            },
            
            // app 监听滚动事件
            onPageScroll(obj){
            	if(obj.scrollTop > 500){
                    this.isShowBackTop = true
                } else {
                    this.isShowBackTop = false
                }
            },
            
            // 回到顶部
            backTop(){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
            },
			
			// 去详情页
			gotoDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?itemid='+id
				});
			}
			
		}
	}
</script>

<style scoped>
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
		height: 288rpx;
		/* #endif */
		/* #ifdef H5 || MP-WEIXIN */
		height: 254rpx;
		/* #endif */
	}
	.header-title-wrap {flex: 1;margin: 0 70rpx;height: 60rpx;line-height: 60rpx;color: #FFFFFF;position: relative;}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;font-size:33rpx}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
	.headerLeftMenu{border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
	.headerRightMenu{border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;}
	.backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/left_bai_icon.png') no-repeat 5% center;background-size: 48rpx 48rpx;} 
	
    /* tab */
    .scroll-h {
        width: 750rpx;
        height: 80rpx;
    	background: #FFFFFF;
        flex-direction: row;
        white-space: nowrap;
        position: fixed;
        z-index: 999;
        /* #ifdef APP-PLUS */
        top: 126rpx;
        /* #endif */
        /* #ifdef H5 || MP-WEIXIN */
        top: 88rpx;
        /* #endif */
    }
    .uni-tab-item {
        display: inline-block;
        flex-wrap: nowrap;
        padding-left: 34rpx;
        padding-right: 34rpx;
    }
    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifdef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }
    .uni-tab-item-title-active {
        color: #05a6fe;
    }
    /* searchNavWrap */
    .searchNavWrap{
    	display: block;
    	position: fixed;
    	left: 0;
    	/* #ifdef APP-PLUS */
    	top: 200rpx;
    	/* #endif */
    	/* #ifdef H5 || MP-WEIXIN */
    	top: 168rpx;
    	/* #endif */
    	right: 0;
    	z-index: 999;
    }
    .searchNav {display: -webkit-box;display: -ms-flexbox; display: flex;-ms-flex-pack: distribute;justify-content: space-around;-ms-flex-flow: row nowrap;border-top: 1rpx solid #dedede;background: #FFF;}	
    .searchNav .navItem {display: flex;padding: 18rpx 0;text-align: center;font-size: 28rpx;color: #666;letter-spacing: 0;align-items: center;}	
    .searchNav .navItem.active{color: #0b9aff;}	
    .searchNav .navItem.active2{color: #0b9aff;}
    .searchNav .navItem .tapImg{padding-top:5rpx;padding-left: 5rpx;width: 20rpx;}
    .searchNav .navItem .tapImg .up{width:16rpx;height:10rpx;display: block;background: url('../../static/images/icon/sheng1.png') no-repeat center center;background-size:16rpx 10rpx;}
    .searchNav .navItem.active .tapImg .up{width:16rpx;height:10rpx;display: block;background: url('../../static/images/icon/sheng2.png') no-repeat center center;background-size:16rpx 10rpx;}
    .searchNav .navItem .tapImg .drop{width:16rpx;height:10rpx;margin-top:5rpx;display: block;background: url('../../static/images/icon/jiang1.png') no-repeat center center;background-size:16rpx 10rpx;}
    .searchNav .navItem.active2 .tapImg .drop{width:16rpx;height:10rpx;margin-top:5rpx;display: block;background: url('../../static/images/icon/jiang2.png') no-repeat center center;background-size:16rpx 10rpx;}
    .icon-Filte {
        width: 30rpx;
        height: 33rpx;
        display: inline-block;
        background: url('../../static/images/screen-off@2x.png') no-repeat bottom ;
        margin-left: 5rpx;
        background-size: 30rpx 26rpx;
    }
	
	/* 内容 */
	.list_box {font-size: 28rpx;width:750rpx}
	.boxItem{display: flex;background: #FFFFFF;padding: 20rpx;position: relative;}
    .boxItem::after{ content: ''; position: absolute; left: 0; bottom: 0;height: 100%;width: 200%;box-sizing: border-box; border-bottom: 1rpx solid #dedede;transform-origin: 0 0;transform: scaleX(.5);}
	.imgWrap{width: 200rpx;height: 200rpx;margin-right: 15rpx;border-radius: 20rpx;}
	.imgWrap image{width: 200rpx;height: 200rpx;border-radius: 20rpx;}
	.content{flex: 1;height: 200rpx;}
	.content .titles{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:28rpx;overflow: hidden;line-height: 1.4;}
	.content .titles .channel{background:#fe6900 ;color: #FFFFFF;font-size:23rpx;padding:3rpx 10rpx;margin-right: 10rpx;border-radius: 5rpx;}
	.content .price{display: flex;padding: 5rpx 0rpx;}
	.content .price .ruling{color: #fe6900;font-size:30rpx;margin-right: 15rpx;}
	.content .price .original{color: #555555;font-size:26rpx;text-decoration:line-through}
	.content .salesWrap{display: flex;text-align: justify;margin-top: 7rpx;}
    .content .salesWrap .quan{color: #FF5351;border: 1rpx solid #FF5351;border-radius: 6rpx;display: inline-block;padding-left: 5rpx;font-size: 26rpx;}
    .content .salesWrap .quan .quanNumb{background: linear-gradient(90deg,#ff8873 0,#ff4f4f 100%); color: #fff;margin-left: 6rpx;padding: 0 6rpx;}
	.content .salesWrap .sales{font-size: 24rpx;color:#666;flex: 1;text-align: right;}
    .content .salesWrap .shopName{flex: 1;color:#666;font-size: 24rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left: 30rpx;background: url(../../static/images/icon/shop.png) no-repeat left center;background-size: 26rpx 26rpx;}

</style>