<template>
	<view class="detail">
		<!-- 头部 -->
		<view class="pageHead">
		    <view class="header-wrap">
		        <view class="index-header" :class="nav? 'bg':''">
					<view class="headerLeftMenu">
						<text class="backIcon" @tap="navigateBack"></text>
					</view>
		            <view class="header-title-wrap" v-show="showAbs">
						<view class="detail_anchor_wrap">
                            <text v-for="(item,index) in anchor_wrap" @tap="anchorTap(index)" :class="{'actives':anchorIndex==index}">{{item}}</text>
						</view>
		            </view>
					<view class="headerRightMenu">
						<text class="menu" @tap="isShowNewListFun"></text>
                        <!-- 二级菜单-->
                        <view class="H-newlist" :class="{'active':isShowNewList==true}">
                            <view class="HnewlistWrap">
                                <view class="listItem" @tap="gotopage('/pages/index/index')">
                                    <image src="../../static/images/home_nosel.png" mode=""></image>
                                    <text>首页</text>
                                </view>
                                <view class="listItem" @tap="gotopage('/pages/index/classify')">
                                    <image src="../../static/images/home_nosel.png" mode=""></image>
                                    <text>分类</text>
                                </view>
                                <view class="listItem" @tap="gotopage('/pages/search/search')">
                                    <image src="../../static/images/home_nosel.png" mode=""></image>
                                    <text>搜索</text>
                                </view>
                                <view class="listItem" @tap="gotopage('/pages/mine/mine')">
                                    <image src="../../static/images/home_nosel.png" mode=""></image>
                                    <text>我的</text>
                                </view>
                            </view>
                        </view>
					</view>
		        </view>
		    </view>
		</view>
		<!-- banner图 -->
		<view class="padding-wrap">
		    <view class="page-section">
		        <view class="page-section-spacing">
		            <swiper class="swiper-container" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#FFFFFF">
		                <swiper-item v-for="(item,index) in imgList" :key="item.index">
		                    <image style="width: 100%;height:100%;" :src="item" @tap="preview" :id="imgList[index]"></image>
		                </swiper-item>
		            </swiper>
		        </view>
		    </view>
			<view class="infoWrap">
				<view class="titleWrap">
					<view class="leftNuber">
						<text class="current">￥{{detaildata.itemendprice}}</text>
						<text class="original">￥{{detaildata.itemprice}}</text>
					</view>
					<view class="rightNuber">
						<text class="sales">销量:{{detaildata.itemsale | tranNumber }}{{getTrueLength(detaildata.itemsale) >=5 ? '万' : ''}}</text>
					</view>
				</view>
				<view class="titleTxtWrap">
					<text class="channel">{{detaildata.shoptype | shopType}}</text>
					<text class="titleTxt">{{detaildata.itemtitle}}</text>
				</view>
				<view class="loanbond" v-if="detaildata.couponsurplus >0" @tap="getLoanbond(detaildata.couponurl)">
					<view class="textWrap">
						<view class="titles">{{detaildata.couponmoney}}元优惠劵</view>
						<view class="times">有效日期{{detaildata.couponstarttime | formatMD}}至{{detaildata.couponendtime | formatMD}}</view>
					</view>
					<view class="rigTextWrap">
						<view class="textItem">
							立即
						</view>
						<view class="textItem">
							领券
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 推荐词 -->
		<view class="recommend">
			<view class="leftRecommen">
				推荐语
			</view>
			<view class="rightRecommen">
				{{detaildata.itemdesc}}
			</view>
		</view>
        
        <!-- 评论-->
        <view class="commentMode">
            <view class="conment-centent">
                <view class="conment-title">
                    <text class="pinglun">评论({{introduce.totalCount | calNum}})</text>
                    <text class="showAll" @tap="gotoComment">查看更多</text>
                </view>
                <view class="conment-item">
                    <view class="Praise" v-if="introduce.keywords && introduce.keywords.length>0">
                        <text class="praiseItem" v-for="(items,indexs) in introduce.keywords" :key="indexs">{{items.word}}({{items.count}})</text>
                    </view>
                    <view class="conment-itemWrap">
                        <view class="conment-item-name">{{introduce.name}}</view>
                        <view class="conment-item-text">{{introduce.hotComment}}</view>
                    </view>
                    <view class="conment-itemImg">
                        <image  v-for="(item,index) in introduce.images" :key="index" :src="item"></image>
                    </view>
                </view>
            </view>
        </view>
        
        <!-- 店铺信息-->
        <view class="Shop-info">
            <view class="shopInfoWrap">
                <view class="shopInfoCent">
                    <view class="shopInfoCent-logo">
                        <image :src="shopInfo.shopLogo" mode=""></image>
                    </view>
                    <view class="shopInfoCent-desc">
                        <view class="shopName">{{shopInfo.shopName}}</view>
                        <view class="shopTxt"><text class="channel">天猫</text>在售有优惠商品<text class="numbers">{{shopInfo.goodsCount}}</text>件</view>
                    </view>
                </view>
                <view class="shopInfoSever">
                    <view class="severItem">
                        卖家服务：{{shopInfo.serviceScore}}
                        <text class="status">{{shopInfo.serviceLevel >=1? '高' : '底'}}</text>
                    </view>
                    <view class="severItem">
                        宝贝描述：{{shopInfo.dsrScore}}
                        <text class="status">{{shopInfo.dsrLevel >=1? '高' : '底'}}</text>
                    </view>
                    <view class="severItem">
                        物流服务：{{shopInfo.shipScore}}
                        <text class="status">{{shopInfo.shipLevel >=1? '高' : '底'}}</text>
                    </view>
                </view>
                <view class="shopInfoGoods">
                    <view class="uni-margin-wrap">
                    	<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
                    		<view id="demo1" class="scroll-view-item_H " v-for="(item,index) in shopInfo.listGoodsDisplay" :key="index" @tap="gotoDetail(item.goodsId)">
                                <view class="scrollViewCen">
                                    <view class="centImg">
                                        <image :src="item.pic" mode=""></image>
                                    </view>
                                    <view class="centName"> {{item.dtitle}}</view>
                                    <view class="quan">
                                        券<text class="quanNumb">{{item.quanJine}}元</text>
                                    </view>
                                    <view class="quanAfter">
                                        券后<text class="quanAfterNmb">￥{{item.jiage}}</text>
                                    </view>
                                </view>
                            </view>
                    	</scroll-view>
                    </view>
                </view>
            </view>
        </view>
        
		<!-- banner -->
		<banner-item :titleName='"猜你喜欢"' ref="recommend"></banner-item>
		<view class="recommendWrap">
			<view class="container">
				<view class="item-warp" v-for="(item,index) in recommend" :key="index" @tap="gotoDetail(item.itemid)">
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
				</view>
			</view>
		</view>
		
		<!-- banner -->
		<banner-item :titleName='"商品详情"' ref="detail"></banner-item>
		<view class="detailWrap">
			<!-- <rich-text :nodes="pcDescContent"></rich-text> -->
			<image  v-for="(item,index) in detalImgList" :key="index" :src="item.img" :style="{height: item.height+'rpx'}"></image>
		</view>
		<!-- footer -->
		<view class="footerWrap">
			<view class="partition"></view>
			<view class="footer">
				<view class="footerIcon">
					<view class="souye flexs" @tap="goHome">
						<view class="syIcon"></view>
						<view class="syText">首页</view>
					</view>
					<view class="shoucang flexs" @tap="clickCollect">
						<view class="scIcon" :class="collect.icon"></view>
						<view class="scText" :class="{fontLs:collect.isCollect==true}">{{collect.name}}</view>
					</view>
				</view>
				<view class="footerCon">
					<view class="inputSeca">分享</view>
                    <view class="inputSeca active" @tap="getLoanbond(detaildata.couponurl)">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bannerItem from '@/components/common/banner.vue'
	export default {
		components:{
		    bannerItem
		},
	    data() {
	        return {
	            indicatorDots: true, //是否显示面板指示点
	            autoplay: true, //是否自动切换
	            interval: 2000, //自动切换时间间隔
	            duration: 500, // 滑动时长
				nav:false, // 顶部背景颜色
                isShowNewList:false, // 二级菜单
				imgList:[],
				detaildata:{}, // 产品详情页的数据
				showAbs:false,
				scrollTop:0,
				anchor_wrap:["商品","推荐","详情"],
				anchorIndex:0,
				recommend:[], // 推荐
				itemid:'', // 订单id
				pcDescContent:"", //详情图
                detalImgList:[],// 详情图列表
				collect: { // 收藏样式
				    icon: 'star-o',
				    name: '收藏',
				    isCollect: false,
				},
                introduce:{}, //评论消息
                shopInfo:{},//店铺信息
				historyKey: 'orange-history',
				collectKey: 'orange-collect'   // 收藏json数据key
					
	        }
	    },
		// 计算属性
		computed: {
			
		},
        //监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		onLoad: function(e) {
			this.itemid = e.itemid
		},
        //监听页面隐藏
        onHide(){
            
        },
		// 创建完成
		created(){
			let that = this
		},
		//挂载完成
		mounted(){	
			//获取详情数据
			this.getDetaidata()
            //获取推荐数据
			this.getRecommend() 
            //店铺信息
            this.getshopUserInfo()
            //评论
            this.getComment()
            // 获取详情页图
			this.getDetailImg() 
		},
		methods: {
			// 返回
			navigateBack() {
				uni.navigateBack()
			},
            
			//头部锚点tap
			anchorTap(index){
				let dom = ""
				if(index == 0){
					dom = ".padding-wrap"
					this.anchorIndex = index
				}else if(index == 1){
					dom = ".recommendWrap"
					this.anchorIndex = index
				}else if(index == 2){
					dom = ".detailWrap"
					this.anchorIndex = index
				}
				uni.createSelectorQuery().select(".detail").boundingClientRect(data=>{
				    uni.createSelectorQuery().select(dom).boundingClientRect((res)=>{
				        uni.pageScrollTo({
				            duration:300,
				            scrollTop:res.top - data.top
				        })
				    }).exec()
				}).exec();
			},
            
            //获取评论
            getComment(){
                let self = this
                uni.request({
                    url: 'http://cmsjapi.ffquan.cn/api/goods/get-comment-introduce?goodsId='+this.itemid, 
                    success: (res) => {
                       if(res.data.code == 0){
                            self.introduce =  res.data.data || {}
                        }else{
                            uni.showToast({
                                title: res.msg,
                                duration: 1500,
                                icon:'none'
                            });
                        }
                    }
                })
			},
            
            //获取店铺信息
            getshopUserInfo(){
                let self = this
                uni.request({
                    url: 'http://cmsjapi.ffquan.cn/api/goods/get-goods-shop-info?goodsId='+this.itemid, 
                    success: (res) => {
                       if(res.data.code == 0){
                            self.shopInfo =  res.data.data || {}
                        }else{
                            uni.showToast({
                                title: res.msg,
                                duration: 1500,
                                icon:'none'
                            });
                        }
                    }
                })
            },
            
			//获取详情数据
			getDetaidata(){
				let self = this
				this.$tools.apiGet('api/item_detail/apikey/'+this.CONFIGAPI.apikey+'/itemid/'+this.itemid).then(function(res){
					if(res.code == 1){
						self.detaildata = res.data || {}
						if(self.detaildata.taobao_image != null && self.detaildata.taobao_image != '') {
							self.imgList = self.detaildata.taobao_image.split(",")
						}else{
							self.imgList.push(self.detaildata.itempic) 
						}
						try {
							//收藏
						    let isExist = self.$queue.isExist(self.collectKey, res.data.itemid);
                            console.log(isExist)
                            if (isExist == true) {
						        self.collect.name = "已收藏";
						        self.collect.icon = "star";
						        self.collect.isCollect = true;
						    } else {
						        self.collect.name = "收藏";
						        self.collect.icon = "star-o";
						        self.collect.isCollect = false;
						    }
							//浏览记录
						    isExist = self.$queue.isExist(self.historyKey, res.data.itemid);
						    if (isExist == false) {
						        self.$queue.insert({
						            key: self.historyKey,
						            value: self.detaildata,
						        });
						    }
						} catch (e) {
						    console.log(e);
						}
					}else{
						uni.showToast({
						    title: res.msg,
						    duration: 1500,
							icon:'none'
						});
					}
				})
			},
            
			// 获取详情图片
			getDetailImg(){
				let self = this
                uni.request({
                    url: 'http://cmsjapi.ffquan.cn/api/goods/get-goods-detail-img?goodsId='+this.itemid, 
                    success: (res) => {
                       if(res.data.code == 0){
                            // console.log( JSON.parse(res.data.data))
                       		self.detalImgList = res.data.data ? JSON.parse(res.data.data) : []
                       	}else{
                       		uni.showToast({
                       		    title: res.msg,
                       		    duration: 1500,
                       			icon:'none'
                       		});
                       	}
                    }
                })
				// uni.request({
				//     url: "tao/h5/mtop.taobao.detail.getdesc/6.0/?data=%7Bid:\"" + self.itemid + "\"%7D", 
                //     success: (res) => {
                //         console.log(res)
				// 		let richtext=  res.data.data.pcDescContent;
				// 		    const regex = new RegExp('<img', 'gi');
				// 		    richtext= richtext.replace(regex, `<img style="width: 100%;"`);
				//         self.pcDescContent = richtext 
				//     }
				// })
			},
			
			// 获取推荐数据
			getRecommend() {
				let self = this
				this.$tools.apiGet('api/get_similar_info/apikey/'+this.CONFIGAPI.apikey+'/itemid/'+this.itemid).then(function(res){
					if(res.code == 1){
						self.recommend = res.data || []
					}else{
						uni.showToast({
						    title: res.msg,
						    duration: 1500,
							icon:'none'
						});
					}
				})
			},
			
			// 收藏、取消收藏
			clickCollect() { //收藏
			    if (this.collect.isCollect == true) {
					uni.showToast({
					    title: "收藏已取消",
					    duration: 1500,
						icon:'none'
					});
			        this.$queue.removeItem(this.collectKey, [this.detaildata.itemid]);
			        this.collect.name = "收藏";
			        this.collect.icon = "star-o";
			        this.collect.isCollect = false;
			    } else {
					uni.showToast({
					    title: "收藏成功",
					    duration: 1500,
						icon:'none'
					});
			        this.$queue.insert({
			            key: this.collectKey,
			            value: this.detaildata,
			        });
			        this.collect.name = "已收藏";
			        this.collect.icon = "star";
			        this.collect.isCollect = true;
			    }
			},
			
			// 首页
			goHome(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
            
            // 显示隐藏二级菜单
            isShowNewListFun(){
                if(this.isShowNewList == false){
                    this.isShowNewList = true
                }else{
                    this.isShowNewList = false
                }
            },
            
            // 二级页面跳转路由
            gotopage(page){
                if(page == '/pages/index/index' || page == '/pages/mine/mine' || page == '/pages/search/search'){
                   uni.switchTab({
                   	url:page
                   }) 
                }else{
                   uni.navigateTo({
                   	url:page
                   }); 
                }
            },
			
			// 点击大图
		    preview(res){  
				let myindex = res.currentTarget.id;  
				uni.previewImage({  
					urls:this.imgList,  
					current:myindex  
				})  
			},
			
			// app 监听滚动事件
			onPageScroll(obj){
				this.handleScroll(obj.scrollTop)
			},
			
			// 滚动事件
			handleScroll(top){
				if(top > 88){
					this.nav = true;
					this.showAbs = true
				}else{
					this.anchorIndex = 0
					this.showAbs = false
					this.nav = false;
				}
			},
			
			// 去详情页
			gotoDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?itemid='+id
				});
			},
            
            // 去评论页
            gotoComment(){
            	uni.navigateTo({
            		url: '/pages/index/comment?itemid='+this.itemid 
            	});
            },
			
			// 领劵购买
			getLoanbond(tburl){
                console.log(tburl)
                //#ifdef H5 || MP-WEIXIN
                    window.location.href = tburl
                //#endif
                //#ifdef APP-PLUS || APP-PLUS-NVUE
                    plus.runtime.openURL(tburl)
                //#endif
			},
			
			//获取字符串的真实长度（字节长度）
		    getTrueLength(str){
				if(str == undefined) return '0'
                if(str == Number) return str+''
			    let len = str.length, truelen = 0;
			    for(let x = 0; x < len; x++){
			        if(str.charCodeAt(x) > 128){
			            truelen += 2;
			        }else{
			            truelen += 1;
			        }
			    }
			    return truelen;
			}
		},
		
		// 离开该页面需要移除这个监听的事件
		destroyed(){
			window.removeEventListener('scroll',this.handleScroll)
		}
		
	}
	
	
</script>

<style>
	page{background: #f4f4f4 !important;}
	.swiper-container{min-height: 80vw;}
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
		background-color: transparent;
		font-size: 28rpx;
		color: #05a6fe;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}    
	.bg {background-color: #05a6fe !important;}	  
	.header-title-wrap {
		flex: 1;
		margin: 0 70rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
		position: relative;
	}
	.detail_anchor_wrap{line-height: 60rpx;height: 60rpx;display: flex;}
	.detail_anchor_wrap  text{flex: 1;text-align: center;}
	.detail_anchor_wrap  text.actives{color:#FFFF00 !important;font-size: 32rpx;}
	.headerLeftMenu{background: #05a6fe;border-radius: 100%;height: 60rpx;width: 60rpx;display: flex;}
	.headerRightMenu{background: #05a6fe;border-radius: 50%;height: 60rpx;width: 60rpx;display: flex;position: relative;}
	.backIcon{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/left_bai_icon.png') no-repeat center center;background-size: 50rpx 50rpx;} 
	.menu{height: 60rpx;width: 60rpx;border-radius: 50%;background: url('../../static/images/icon/sprite_bai_icon.png') no-repeat center center;background-size: 50rpx 50rpx;}   
	.H-newlist{position: absolute;top: 80rpx;width: 200rpx;text-align: center;background: #05a6fe;overflow: inherit; right: 5rpx;border-radius: 10rpx;padding-bottom: 5rpx;opacity: 0;}
    .H-newlist.active{position: absolute;opacity: 1;z-index: 20;}
    .H-newlist .HnewlistWrap:before{content: "";width: 0; height: 0;border-left: 7px transparent solid;border-right: 7px transparent solid;border-bottom: 7px #05a6fe solid;border-top: none;position: absolute; z-index: 1; zoom: 1;right: 8px; top: -7px;}
    .H-newlist .HnewlistWrap{position: relative;z-index: 5;zoom: 1;}
    .H-newlist .HnewlistWrap .listItem{font-size: 24rpx;margin: 0 12rpx;border-bottom: 1rpx #DDEEDD solid;color: #FFFFFF;padding-left: 35rpx;display: flex;line-height: 70rpx;text-align: center;}
    .H-newlist .HnewlistWrap .listItem:last-child{border-bottom: none;}
    .H-newlist .HnewlistWrap .listItem image{width: 45rpx;height: 45rpx;margin-right: 8rpx;margin-top: 10rpx;}
    
	.padding-wrap{width: 750rpx;display: block;height: 100%;}
	.infoWrap{padding:15rpx 15rpx 20rpx;background:#FFFFFF;}
	.loanbond{display: flex;width: 720rpx;height: 160rpx;text-align: center;padding: 15rpx 0rpx;background: url('../../static/images/yhj.png') no-repeat center center;background-size:700rpx 160rpx;}
	.loanbond .textWrap{width:520rpx;height: 160rpx;color: #FFFFFF;}
	.loanbond .textWrap .titles{font-size: 36rpx;padding-bottom: 8rpx;margin-top:35rpx}
	.loanbond .textWrap .times{font-size: 28rpx;}
	.loanbond .rigTextWrap{flex: 1;height: 130rpx;text-align: center;padding-top:35rpx;color: #FFFFFF;font-size: 36rpx;}
	.titleWrap{display: flex;align-items: center;justify-content: space-between;padding: 10rpx 0;}
	.leftNuber .current{font-size:40rpx;color: #f33;}
	.leftNuber .original{font-size:28rpx;margin-left: 15rpx;text-decoration:line-through;color: #666;}
	.rightNuber{padding-right: 20rpx;color: #666;}
	.titleTxtWrap{padding:0 10rpx 10rpx;color: #333;}
	.channel{color: #FFFFFF;background: #fe6900;padding: 3rpx 8rpx;font-size:25rpx;margin-right:10rpx;border-radius: 5rpx;}
	.titleTxt{font-size:32rpx}
	
	.recommend{padding: 15rpx;background: #FFFFFF;display: flex;margin-top:20rpx}
	.recommend .leftRecommen{color: #f33;width: 150rpx;text-align:center;font-size:30rpx}
	.recommend .rightRecommen{padding:0rpx 15rpx;color: #333;flex: 1;}
	
    /* 店铺信息*/
    .Shop-info{margin: 20rpx 0;background: #FFFFFF;padding: 10rpx 0;}
    .Shop-info .shopInfoWrap .shopInfoCent{margin: 0 10rpx;height: 120rpx;display: flex;}
    .Shop-info .shopInfoWrap .shopInfoCent .shopInfoCent-logo{width:120rpx;height: 120rpx;text-align: center;margin-right: 10rpx;}
    .Shop-info .shopInfoWrap .shopInfoCent .shopInfoCent-logo image{width: 100rpx;height: 100rpx;}
    .Shop-info .shopInfoWrap .shopInfoCent .shopInfoCent-desc{flex: 1;}
    .Shop-info .shopInfoWrap .shopInfoCent .shopInfoCent-desc .shopName{font-size: 32rpx;margin-top: 10rpx;margin-bottom: 5rpx;}
    .Shop-info .shopInfoWrap .shopInfoCent .shopInfoCent-desc .shopTxt{color: #888;font-size: 26rpx;}
    .Shop-info .shopInfoWrap .shopInfoCent .shopInfoCent-desc .shopTxt .channel{color: #FFFFFF;background: #fe6900;padding: 0rpx 5rpx;margin-right:10rpx;border-radius: 5rpx;font-size: 22rpx;}
    .Shop-info .shopInfoWrap .shopInfoCent .shopInfoCent-desc .shopTxt .numbers{color: #e42424;}
    .Shop-info .shopInfoWrap .shopInfoSever{margin: 0 10rpx;display: flex;text-align: center;padding:0 0 8rpx 0;}
    .Shop-info .shopInfoWrap .shopInfoSever .severItem{flex: 1;color: #888;font-size: 26rpx;}
    .Shop-info .shopInfoWrap .shopInfoSever .severItem .status{border-radius: 100%;padding:5rpx;margin-left: 10rpx;background: #f0f0f0;color: #888;display: inline-block;font-size: 18rpx;height:30rpx;width: 30rpx;line-height: 30rpx;}
    
    .shopInfoGoods .scroll-view_H{width: auto;white-space: nowrap;display: block;padding: 15rpx;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H{display: inline-block;width: 30%;height: 100%;flex-shrink: 0;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen{height: 100%;margin-right: 15rpx;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen .centImg{display: block;width: 100%;height: 100%;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen .centImg image{width: 100%;display: block;border-radius: 10rpx;max-height: 180rpx;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen .centName{color: #666;word-break: break-all;text-overflow: ellipsis;overflow: hidden;padding: 10rpx 0 0;margin-bottom: 8rpx;font-size: 28rpx;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen .quan{color: #FF5351;border: 1rpx solid #FF5351;border-radius: 6rpx;display: inline-block;padding-left: 5rpx;font-size: 26rpx;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen .quan .quanNumb{background: linear-gradient(90deg,#ff8873 0,#ff4f4f 100%); color: #fff;margin-left: 6rpx;padding: 0 6rpx;}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen .quanAfter { color: #666;font-weight: 500;font-size: 26rpx;line-height: 60rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden}
    .shopInfoGoods .scroll-view_H .scroll-view-item_H .scrollViewCen .quanAfter .quanAfterNmb{color: #ff2b22;font-weight: 500;}
    
    
	/* 猜你喜欢 */
	.recommendWrap{padding: 20rpx;width: 710rpx;}
	.recommendWrap .container { display: -webkit-box;display: -ms-flexbox;display: flex;flex-wrap: wrap;}
	.recommendWrap .container .item-warp {width: 305rpx;padding: 20rpx;background: #FFFFFF;margin-right: 10px;margin-bottom: 20rpx;border-radius: 20rpx;}
	.recommendWrap .container .item-warp:nth-child(2n){margin-right: 0;}
	.recommendWrap .container .item-warp .topImg{margin-bottom: 10rpx;display: flex;align-items: center;justify-content: center;}
	.recommendWrap .container .item-warp .topImg image{width: 280rpx;height: 300rpx;}
    .recommendWrap .container .item-warp .textTitle{display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:30rpx;overflow: hidden;line-height: 1.4;}
	.recommendWrap .container .item-warp .textTitle .channel{background:#fe6900 ;color: #FFFFFF;font-size:24rpx;padding:5rpx 10rpx;margin-right: 10rpx;border-radius: 5rpx;}
	.recommendWrap .container .item-warp .textTitle .numbers{color: #e42424;}
    .recommendWrap .container .item-warp .price{display: flex;padding: 8rpx 0rpx;}
	.recommendWrap .container .item-warp .price .ruling{color: #fe6900;font-size:32rpx}
	.recommendWrap .container .item-warp .price .ruling .original{color: #555555; text-decoration: line-through;font-size:26rpx}
	.salesWrap{display: flex;}
	.salesWrap .sales{font-size: 28rpx;color:#666;flex: 1;}
	.salesWrap .bond{font-size: 26rpx;background: #e42424;color: #FFFFFF;padding:5rpx 10rpx}
	
	/* 详情 */
	.detailWrap{background: #FFFFFF;margin: 0 auto;text-align: center;width: 100%;overflow: hidden;}
	.detailWrap image{width: 100%;border: none;overflow: hidden;}
	
    /* 评论*/
    .commentMode{margin:20rpx 0;background: #FFFFFF;padding: 15rpx;cursor: pointer;}
    .conment-centent .conment-title{height: 60rpx;line-height: 60rpx;font-size: 28rpx;display: flex;justify-content: space-between;}
    .conment-centent .conment-title .showAll{color: #fe3738;position: relative;font-size: 26rpx;}
    .conment-centent .conment-title .showAll:after{ content: '';display: inline-block; width: 18rpx;height: 18rpx;border-top: 1rpx solid #fe3738;border-right: 1rpx solid #fe3738;transform: rotate(45deg);-webkit-transform: rotate(45deg);}
    .conment-centent .Praise{padding: 10rpx;}
    .conment-centent .Praise .praiseItem{padding: 10rpx 15rpx;margin:0 8rpx 15rpx; background: #ffede7;font-size:25rpx;border-radius: 20rpx;display: inline-block;}
    .conment-item .conment-itemWrap .conment-item-name{color: #888;line-height: 50rpx;font-size:28rpx}
    .conment-item .conment-itemWrap .conment-item-text{font-size: 28rpx;color: #333;margin-bottom: 15rpx;}
    .conment-item .conment-itemImg {width: 100%;}
    .conment-item .conment-itemImg image{width:31%;height: 180rpx;margin-left: 15rpx;margin-bottom: 10rpx;border-radius: 10rpx;}
    
	/* footerWrap */
	.footerWrap .partition{height: 120rpx;}
	.footer{position: fixed;zoom: 1;bottom: 0;z-index: 999;left:0;width: 710rpx;height: 80rpx;background: #FFFFFF;padding: 15rpx 20rpx;box-shadow: 0 -2px 2px 0 rgba(0,0,0,.1);display:flex;}
	.footerIcon{flex: 1;display: flex;margin-right: 10rpx;}
	.flexs{flex: 1;text-align: center;color: #707070;}
	.syIcon{width: 45rpx;height: 45rpx;margin: 0 auto;background: url(../../static/images/home_nosel.png) no-repeat center center;background-size:45rpx 45rpx;}
	.scIcon{width: 45rpx;height: 45rpx;margin: 0 auto;}
	.fontLs{color:#05a6fe}
	.scIcon.star{background: url(../../static/images/icon/sc_icon_sel.png) no-repeat center center;background-size:45rpx 45rpx;}
	.scIcon.star-o{background: url(../../static/images/icon/sc_icon.png) no-repeat center center;background-size:45rpx 45rpx;}
	
	.footerCon {height: 80rpx;box-sizing: border-box;background-color: #FF9500;border-radius: 50rpx;color: #FFFFFF;display: flex;width: 500rpx;position: relative;flex: 2;}
	.footerCon .inputSeca { height: 80rpx;flex: 1;text-align: center;line-height: 80rpx;font-size: 30rpx;border-radius: 50rpx;}  
	.footerCon .inputSeca.active{color:#FFFFFF;background: #05a6fe;}
	.footerCon .inputSeca:nth-child(1){border-top-right-radius:0rpx;border-bottom-right-radius:0rpx;}
	.footerCon .inputSeca:last-child{border-top-left-radius:0rpx;border-bottom-left-radius:0rpx;} 


</style>
