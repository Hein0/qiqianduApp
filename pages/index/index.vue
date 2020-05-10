<template>
	<view class="indexpage">
		<!-- 头部 -->
		<index-header :input='true' rightIcon='rightIcon' v-on:goToSearchPage="goSearchPage"></index-header>
		<!-- tab列表 -->
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<!-- 内容 -->
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1" :duration="300" @change='isClick ? ontabchange($event) : ""'>
			<swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v list" scroll-y @scrolltolower="loadMore(index1)">
					<!-- #ifdef APP-PLUS-NVUE -->
					<refresh class="refresh" @refresh="onrefresh(index1)" @pullingdown="onpullingdown" :display="tab.refreshing ? 'show' : 'hide'">
						<div class="refresh-view">
							<image class="refresh-icon" :src="refreshIcon" :style="{width: (tab.refreshing || pulling) ? 0: '32px'}" :class="{'refresh-icon-active': tab.refreshFlag}"></image>
							<image class="loading-icon" :src="loadingIcon" v-if="tab.refreshing"></image>
							<text class="loading-text">{{tab.refreshText}}</text>
						</div>
					</refresh>
					<!-- #endif -->
                    <view>
                       <gather :current="tabIndex" :dataList="tab.data"></gather> 
                    </view>
					<view class="loading-more"  v-if="tab.isLoading || tab.data.length > 4">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 返回顶部-->
		<back-top v-on:TobackTop="backTop" :isShow="isShowBackTop"></back-top>
		
	</view>
</template>

<script>
	import indexHeader from '@/components/index-header.vue'
	import gather from './gather.vue'
    // 缓存每页最多
    const MAX_CACHE_DATA = 20;
	const MAX_CACHE_PAGE = 3;
	export default {
		// 组件
		components:{
			indexHeader,
			gather
		},
		data() {
			return {
				newsList: [],
				cacheTab: [],
				tabIndex: 0,
                isShowBackTop:false, //是否显示返回顶部按钮
                // 0全部，，，，，，，，，，，，，，，，，
				tabBars: [{
				    name: '精选',
                    id:'jingxuan',
				    cid: '0'
				}, {
				    name: '美食',
                    id:'meishi',
				    cid: '11'
				}, {
				    name: '女装',
                    id:'nvzhuang',
				    cid: '1'
				}, {
				    name: '美妆',
                    id:'meizhuang',
				    cid: '4'
				}, {
				    name: '男装',
                    id:'nanzhuang',
				    cid: '2'
				}, {
				    name: '居家日用',
                    id:'jujia',
				    cid: '10'
				}, {
				    name: '鞋品',
                    id:'xiepin',
				    cid: '6'
				}, {
				    name: '儿童',
                    id:'ertong',
				    cid: '8'
				}, {
				    name: '母婴',
                    id:'muying',
				    cid: '9'
				}, {
				    name: '内衣',
                    id:'neiyi',
				    cid: '3'
				}, {
				    name: '配饰',
                    id:'peishi',
				    cid: '5'
				}, {
				    name: '箱包',
                    id:'xiangbao',
				    cid: '7'
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
				scrollInto: "",
                isClick:true,// 是否点击tab切换
                ChoicenessList: [],// 精选列表
                min_id:1, // 分页数
			}
		},
		// 监听页面加载时
		onLoad() {
            setTimeout(()=>{
                this.tabBars.forEach((tabBar) => {
                    this.newsList.push({
                        data: [],
                        refreshText: "",
                        loadingText: '加载更多...'
                    });
                });
                this.getList(0)
            },350)
		},
        // 挂载完成
        mounted() {

        },
		// 方法
		methods: {
            //跳转到搜索页
			goSearchPage() {
				uni.switchTab({
					url:'/pages/search/search'
				})
			},
            //获取列表数据
            getList(index) {
                let self = this
                let activeTab = self.newsList[index];
                self.$tools.apiGet('api/column/apikey/Hein/type/1/back/10/sort/9/'+'cid/'+this.cid+'/min_id/'+this.min_id).then(function(res){
                	if(res.code == 1){
                        self.isClick = true; //解开可以滑动
                        self.min_id = res.min_id || ''
                		activeTab.data = activeTab.data.concat(res.data) || []
                	} else {
                        self.isClick = true; //解开可以滑动
                        uni.showToast({
                        	title: res.msg,
                        	duration: 1500,
                        	icon:'none'
                        });
                    }
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
            
			// 点击tap
			ontabtap(e) {
                this.isClick = false
			    let index = e.target.dataset.current || e.currentTarget.dataset.current;
			    this.min_id = 1;
                this.switchTab(index);
			},
            
			// 滑动内容
			ontabchange(e) {
                 console.log(e)
			    let index = e.target.current || e.detail.current;
                this.min_id = 1;
			    this.switchTab(index);
			},
            
			// 请求数据
			switchTab(index) {
                console.log(1)
                this.cid = this.tabBars[index].cid;
			    if (this.newsList[index].data.length === 0) {
			        this.getList(index);
			    }
			
			    if (this.tabIndex === index) {
			        return;
			    }
                
                //缓存 tabId
                if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
                    let isExist = this.cacheTab.indexOf(this.tabIndex);
                    if (isExist < 0) {
                        this.cacheTab.push(this.tabIndex);
                        //console.log("cache index:: " + this.tabIndex);
                    }
                }
                
			    this.tabIndex = index;
                
			    this.scrollInto = this.tabBars[index].id;
			
			    // 释放 tabId
			    if (this.cacheTab.length > MAX_CACHE_PAGE) {
			        let cacheIndex = this.cacheTab[0];
			        this.clearTabData(cacheIndex);
			        this.cacheTab.splice(0, 1);
			        // console.log("remove cache index:: " + cacheIndex);
			    }
			},
			
			// 清除文字
			clearTabData(e) {
			    this.newsList[e].data.length = 0;
			    this.newsList[e].loadingText = "加载更多...";
			},
			
			// 加载更多
			loadMore(e) {
			    setTimeout(() => {
			        this.getList(this.tabIndex);
			    }, 350)
			},
			
			
		}
	}
</script>

<style scoped>
	
	page {
		width: 100%;
		height: 100%;
	}
	.uni-swiper{min-height: 100%;}
	.indexpage {
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
	.tabs {
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
	    background-color: #fff;
		position: relative;
	}
	.swiper-box{
		display: flex;
		width: 100%;
		height: 100%;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}
	.scroll-v{
		height: 100%;
		width: 100%;
	}
	
	.scroll-h {
	    width: 750rpx;
	    height: 80rpx;
		background: #FFFFFF;
	    flex-direction: row;
        white-space: nowrap;
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
		font-size: 33rpx;
	}
	
	
	
	
	
</style>
