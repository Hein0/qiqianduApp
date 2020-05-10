<template>
    <view class="gather">
        <!-- 轮播图-->
        <carousel v-if="current == 0"></carousel>
        <!-- 菜单列表-->
        <menu-list v-if="current == 0"></menu-list>
        <!-- 广告 -->
        <advertising v-if="current == 0"></advertising>
        <!-- 活动列表-->
        <activity v-if="current == 0"></activity>
        <!-- banner标题-->
        <banner-item v-if="current == 0" :titleName='"精选优品"'></banner-item>
        <!-- 精选列表-->
        <choiceness v-if="current == 0" :current="current" :dataList="dataList"></choiceness>
        <!-- 列表数据-->
        <data-list v-if="current != 0" :dataList="dataList"></data-list>
        
    </view>
</template>

<script>
    import bannerItem from '@/components/common/banner.vue'
    import carousel from './component/carousel.vue'
    import menuList from './component/menuList.vue'
    import advertising from './component/advertising.vue'
    import activity from './component/activity.vue'
    import choiceness from './component/choiceness.vue'
    import dataList from './component/dataList.vue'
    	export default {
    		components:{
    		    bannerItem,
                carousel,
                menuList,
                advertising,
                activity,
                choiceness,
                dataList
    		},
            props: [
                'current',
                'dataList'
            ],
    	    data() {
    	        return {
    	            
    					
    	        }
    	    },
            // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object
            onLoad() {
            	
            },
            //计算属性
            computed: {
            
            },
            //挂载完成
            mounted() {
                
            },
            //方法
    	    methods: {
                
    			
    			// 去详情页
    			gotoDetail(id){
    				uni.navigateTo({
    					url: '/pages/index/detail?itemid='+id
    				});
    			}	
    			
    	    }
    	}
</script>

<style>
</style>
