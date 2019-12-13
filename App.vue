<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方css库 */
	@import './static/css/uni.css';
	/* 引入自定义图标库 */
	@import './static/css/icon.css';
	/* 引入动画库 */
	@import './static/css/animate.css';
	/* 公共样式 */
	@import './static/css/common.css';
</style>
