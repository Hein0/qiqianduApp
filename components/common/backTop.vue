<template>
    <view class="backTopWrap" v-show="isShow">
        <view  class="backTopIcon" @tap="backtopFun()"></view>
    </view>
</template>

<script>
    export default {
        props: {
            isShow:{
                type:Boolean,
                default:false
            }
        },
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
            // 回到顶部
            backtopFun(){
                this.$emit("TobackTop")
            }
    		
        }
    }
</script>

<style scoped>
    .backTopWrap{position: fixed;z-index: 998;width:70rpx;border-radius: 10rpx;height: 70rpx;background-color: #FFFFFF;right: 30rpx;bottom:200rpx;box-shadow:#05a6fe 0rpx 0rpx 10rpx ;}
    .backTopIcon{position: fixed;z-index: 998;border-radius: 10rpx;box-shadow:#05a6fe 0rpx 0rpx 10rpx ;right: 30rpx;bottom:200rpx;width: 70rpx;height: 70rpx;background: #FFFFFF url(../../static/images/icon/backTop.png) no-repeat center center;background-size: 40rpx 40rpx;}
</style>
