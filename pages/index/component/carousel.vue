<template>
    <view class="carousel">
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#FFFFFF">
                        <swiper-item v-for="(item,index) in imgList" :key="item.index">
                            <image style="width: 100%;height:100%;" :src="item" @tap="preview" :id="imgList[index]"></image>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: [
            
        ],
        data() {
            return {
                indicatorDots: true, //是否显示面板指示点
                autoplay: true, //是否自动切换
                interval: 2000, //自动切换时间间隔
                duration: 500, // 滑动时长
                
        		imgList:[
        			require("@/static/images/ssd.jpg")]
        			
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
        // 方法
        methods: {
            
        	// 点击大图
            preview(res){  
        		let myindex = res.currentTarget.id;  
        		uni.previewImage({  
        			urls:this.imgList,  
        			current:myindex  
        		})  
        	}
        	
        }
    }
</script>

<style scoped>
    .uni-padding-wrap{
    	display: flex;
    	display: -webkit-flex;
    	margin-top: 20rpx;
    	padding: 0 20rpx;
    	position: relative;
    	width: 710rpx;
    	flex: 1;
    	-webkit-box-flex: 1;
    	-webkit-flex: 1;
    	-webkit-box-orient: vertical;
    	-webkit-box-direction: normal;
    	-webkit-flex-direction: column;
    	flex-direction: column
    }
    .page-section{
    	border-radius: 10rpx;
    }
    .activeColor {
    	background:#FFFFFF
    }
</style>
