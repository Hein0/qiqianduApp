<template>
    <view class="jiukuaiPage">
        <!-- 头部 -->
        <view class="pageHead">
            <view class="header-wrap">
                <view class="index-header">
        			<view class="headerLeftMenu">
        				<text class="backIcon"></text>
        			</view>
                    <view class="header-title-wrap">
        				<view class="detail_anchor_wrap">
        					<text>9.9包邮</text>
        				</view>
                    </view>
        			<view class="headerRightMenu">
        				<text class="menu"></text>
        			</view>
                </view>
            </view>
        </view>
        
        <!-- tab列表 -->
        <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
        	<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @tap="ontabtap($event,tab.cid)">
        		<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
        	</view>
        </scroll-view>
        <!-- 挺高度-->
        <view class="blank"></view>
        <!-- datalist-->
        <view class="bannerGap">
        	<view class="container">
        		<view class="item-warp" v-for="(item,index) in dataList" :key="index" @tap="gotoDetail(item.itemid)">
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
        <!-- 加载更多-->
        <uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
        <!-- 返回顶部-->
        <back-top v-on:TobackTop="backTop()" :isShow="isShowBackTop"></back-top>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/common/uni-load-more.vue';
    export default {
        name:"jiukuaijiu",
    	// 组件
    	components:{
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
                cid:"0",
                sort:0, //0.综合（最新），1.券后价(低到高)，2.券后价（高到低），3.券面额，4.销量，5.佣金比例，6.券面额（低到高），7.月销量（低到高），8.佣金比例（低到高），9.全天销量（高到低），10全天销量（低到高），11.近2小时销量（高到低），12.近2小时销量（低到高），13.优惠券领取量（高到低），14.好单库指数（高到低）
                dataList:[], // 列表数据
                loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
                contentText: {
                	contentdown:'上拉显示更多',
                	contentrefresh: '正在加载...',
                	contentnomore: '已经到底啦~',
                },
            }
        },
        // 监听页面加载时
        onLoad() {
            
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
        
        // 挂载完成
        mounted() {
            this.getdataList(this.cid)
        },
        // 方法
        methods: {
            
            // 点击tap
            ontabtap(e,cid) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                if(this.tabIndex == index) return 
                this.min_id = 1;
                this.tabIndex = index;
                this.cid = cid;
                this.scrollInto = this.tabBars[index].id;
                this.backTop(10);
                this.getdataList(this.cid)
            },
            
            //获取列表数据
            getdataList(cid) {
            	let self = this
                self.loadingType = 0;
                // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
                uni.showNavigationBarLoading();
                // #endif
                this.$tools.apiGet('api/column/apikey/'+this.CONFIGAPI.apikey+'/type/2'+'/back/10/sort/'+this.sort+'/min_id/'+this.min_id+'/cid/'+cid).then(function(res){
                    if(res.code == 1){
                        self.min_id = res.min_id;//获取下一页的参数值
                        self.dataList = res.data || []
                        // #ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-QQ || MP-WEIXIN
                        uni.hideNavigationBarLoading();//关闭加载动画
                        // #endif
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
            
            // 去详情页
            gotoDetail(id){
            	uni.navigateTo({
            		url: '/pages/index/detail?itemid='+id
            	});
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
            backTop(dur=300){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: dur
                });
            },
            
            
        }
    }        
    
</script>

<style scoped>
    page{background: #f4f4f4 !important;}
    .jiukuaiPage {
        height: 100%;min-height: 100%;
    	display: flex;
    	display: -webkit-flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        overflow: hidden;
        background-color: #f4f4f4;
    }
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
        /* height: 280rpx; */
        height: 206rpx;
        /* #endif */
        /* #ifdef H5 || MP-WEIXIN */
        /* height: 254rpx; */
        height: 166rpx;
        /* #endif */
    }
    .header-title-wrap {flex: 1;margin: 0 70rpx;height: 60rpx;line-height: 60rpx;color: #FFFFFF;position: relative;}
    .detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;font-size:33rpx}
    .detail_anchor_wrap  text{flex: 1;text-align: center;}
    .headerLeftMenu{border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
    .headerRightMenu{border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;}
    .backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;} 
    
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
    
    /* 列表 */
    .bannerGap{padding: 20rpx;width: 710rpx;}
    .bannerGap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
    .bannerGap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
    .bannerGap .container .item-warp:nth-child(2n){margin-right: 0;}
    .bannerGap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
    .bannerGap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
    .bannerGap .container .item-warp .textTitle .channel{background:#fe6900 ;color: #FFFFFF;font-size:22rpx;padding:3rpx 8rpx;margin-right: 10rpx;border-radius: 5rpx;}
    .bannerGap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:28rpx;overflow: hidden;line-height: 1.4;}
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
