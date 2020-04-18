<template>
	<view class="indexpage">
		<!-- 头部 -->
		<index-header :input='true' rightIcon='rightIcon' v-on:goToSearchPage="goSearchPage"></index-header>
		
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<!-- 内容 -->
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
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
					<!-- <view v-for="(newsitem,index2) in tab.data" :key="newsitem.id">
						<choiceness :options="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></choiceness>
					</view> -->
                    <view v-if="tabIndex == 0">
                        <choiceness :current="tabIndex" :dataList="ChoicenessList" @close="close()" @click="goDetail()"></choiceness>
                    </view>
					<view class="loading-more">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
	</view>
</template>

<script>
	import indexHeader from '@/components/index-header.vue'
	import choiceness from './component/choiceness.vue'
	const MAX_CACHE_PAGE = 3;
	export default {
		// 组件
		components:{
			indexHeader,
			choiceness
		},
		data() {
			return {
				
				title: 'Hello',
				newsList: [],
				cacheTab: [],
				tabIndex: 0,
                // 0全部，，，，，，，，，，，，，，，，，
				tabBars: [{
				    name: '精选',
				    id: '0'
				}, {
				    name: '美食',
				    id: '11'
				}, {
				    name: '女装',
				    id: '1'
				}, {
				    name: '美妆',
				    id: '4'
				}, {
				    name: '男装',
				    id: '2'
				}, {
				    name: '居家日用',
				    id: '10'
				}, {
				    name: '鞋品',
				    id: '6'
				}, {
				    name: '儿童',
				    id: '8'
				}, {
				    name: '母婴',
				    id: '9'
				}, {
				    name: '内衣',
				    id: '3'
				}, {
				    name: '配饰',
				    id: '5'
				}, {
				    name: '箱包',
				    id: '7'
				}, {
				    name: '数码',
				    id: '12'
				}, {
				    name: '家电',
				    id: '13'
				}, {
				    name: '车品',
				    id: '15'
				}, {
				    name: '文体',
				    id: '16'
				}, {
				    name: '宠物',
				    id: '17'
				}, {
				    name: '其他',
				    id: '14'
				}],
				scrollInto: "",
                ChoicenessList: [],// 精选列表
                min_id:1, // 分页数
			}
		},
		// 监听页面加载时
		onLoad() {
			this.tabBars.forEach((tabBar) => {
			    this.newsList.push({
			        data: [],
			        refreshText: "",
			        loadingText: '加载更多...'
			    });
			});
            
		},
        // 挂载完成
        mounted() {
            if(this.tabIndex == 0) {
                this.getChoicenessList() // 获取精选列表
            }
            
        },
		// 方法
		methods: {
            //跳转到搜索页
			goSearchPage() {
				uni.switchTab({
					url:'/pages/search/search'
				})
			},
            // 获取精选列表数据
            getChoicenessList() {
                let self = this
                this.$tools.apiGet('api/column/apikey/Hein/type/1/back/10/min_id/'+self.min_id).then(function(res){
                	if(res.code == 1){
                		self.ChoicenessList = res.data || []
                        self.min_id = res.min_id || ''
                	} else {
                        uni.showToast({
                        	title: res.msg,
                        	duration: 1500,
                        	icon:'none'
                        });
                    }
                })
            },
            // 加载更多精选列表数据
            getChoicenessList2() {
                let self = this
                this.$tools.apiGet('api/column/apikey/Hein/type/1/back/10/min_id/'+self.min_id).then(function(res){
                	if(res.code == 1){
                		self.ChoicenessList = self.ChoicenessList.concat(res.data) || []
                        self.min_id = res.min_id || ''
                	} else {
                        uni.showToast({
                        	title: res.msg,
                        	duration: 1500,
                        	icon:'none'
                        });
                    }
                })
            },
			// 点击tap
			ontabtap(e) {
			    let index = e.target.dataset.current || e.currentTarget.dataset.current;
				console.log(index)
			    this.switchTab(index);
			},
			// 滑动内容
			ontabchange(e) {
			    let index = e.target.current || e.detail.current;
				console.log(index)
			    this.switchTab(index);
			},
			// 请求数据
			switchTab(index) {
			    if (this.newsList[index].data.length === 0) {
			        // this.getList(index);
			    }
			
			    if (this.tabIndex === index) {
			        return;
			    }
			
			    this.tabIndex = index;
			    this.scrollInto = this.tabBars[index].id;
			
			    // 释放 tabId
			    if (this.cacheTab.length > MAX_CACHE_PAGE) {
			        let cacheIndex = this.cacheTab[0];
			        this.clearTabData(cacheIndex);
			        this.cacheTab.splice(0, 1);
			        //console.log("remove cache index:: " + cacheIndex);
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
                    if(this.tabIndex ==0) {
                       this.getChoicenessList2() 
                    }
			        // this.getList(this.tabIndex);
			    }, 500)
			},
			
			
		}
	}
</script>

<style>
	
	page {
		width: 100%;
		height: 100%;
	}
	.uni-swiper{min-height: 100vm;}
	.indexpage {
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
	.indexpage{height: 100%;}
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
