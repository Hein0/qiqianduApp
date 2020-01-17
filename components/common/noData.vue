<template>
   <div class="no-data">
      <slot>
         <img class="n-img" src="../../static/images/no_data.png" alt="">
         <p class="n-txt">暂无数据~</p>
      </slot>
   </div>
</template>

<script>
   export default {
      name: 'noData',
      //props: ['txt','imgSrc']
   }
</script>

<style>

   .no-data{text-align: center;font-size: 32rpx;color: #666;margin-top:50%;}
   .no-data .n-img{width: auto;height:200rpx;margin: 0 auto;}
   .no-data .n-txt{padding: 0 15rpx;margin-top: 20rpx;font-size:32rpx;}
</style>
