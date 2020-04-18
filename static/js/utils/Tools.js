const Tools = {
	config: {
		// apiUrl: 'http://www.qiqiandu.com/',
		apiUrl: 'http://localhost:8080/'

	},
	/**
	 * 清楚本地缓存
	 * @param  {[type]} key 键名    可填(默认清楚所有缓存)
	 * @return {[type]}     [description]
	 */
	clearLocalStorage(key) {
		if (key) {
			uni.removeStorageSync(key);
		} else {
			uni.clearStorageSync();
		}
	},
	/**
	 * 获取本地缓存
	 * @param  {[type]} key [description]
	 * @return {[type]}     [description]
	 */
	getLocalStorage(key) {
		return uni.getStorageSync(key);
	},
	/**
	 * 设置本地缓存
	 * @param {[type]} key     [description]
	 * @param {[type]} value   [description]
	 * @param {[type]} expires [description]
	 */
	setLocalStorage(key, value, expires) {
		uni.setStorageSync(key, value);
	},
	/**
	 * 隐藏加载框
	 * @return {[type]} [description]
	 */
	hideLoading() {
		uni.hideLoading();
	},
	/**
	 * 显示提示信息
	 * @param  {[type]} title    [description]
	 * @param  {Number} duration [description]
	 * @return {[type]}          [description]
	 */
	showToast(title, duration = 2000, icon = "none") {
		uni.showToast({
			title,
			duration,
			icon
		});
	},
	/**
	 * 显示加载框
	 * @param  {[type]} title [description]
	 * @return {[type]}       [description]
	 */
	showLoading(title = '加载中...') {
		uni.showLoading({
			title,
			mask: false
		});
	},
	/**
	 * 接口的post请求
	 * @param  {[type]} url     [description]
	 * @param  {[type]} params  [description]
	 * @param  {Object} options [description]
	 * @return {[type]}         [description]
	 */
	apiPost(url, params, options = {
		isLoad: false
	}) {
		options['method'] = 'POST';
		return this.$http(url, params, options);
	},
	/**
	 * 接口的get请求
	 * @param  {[type]} url     [description]
	 * @param  {[type]} params  [description]
	 * @param  {Object} options [description]
	 * @return {[type]}         [description]
	 */
	apiGet(url, params, options = {
		isLoad: false
	}) {
		options['method'] = 'GET';
		return this.$http(url, params, options);
	},
	/**
	 * 接口put请求
	 * @param  {[type]} url     [description]
	 * @param  {[type]} params  [description]
	 * @param  {Object} options [description]
	 * @return {[type]}         [description]
	 */
	apiPut(url, params, options = {}) {
		options['method'] = 'PUT';
		return this.$http(url, params, options)
	},
	/**
	 * 接口delete请求
	 * @param  {[type]} url     [description]
	 * @param  {[type]} params  [description]
	 * @param  {Object} options [description]
	 * @return {[type]}         [description]
	 */
	apiDel(url, params, options = {}) {
		options['method'] = 'DELETE';
		return this.$http(url, params, options)
	},
	/**
	 * 请求
	 * @return {[type]} [description]
	 */
	$http(url, params = {}, options = {}) {
		let headerConfig = {};
		let zx_token;
		// #ifdef MP-WEIXIN
		zx_token = this.getLocalStorage('zx_token') || '';
		// #endif
		// #ifndef MP-WEIXIN
		zx_token = this.getLocalStorage('login') || '';
		// #endif
		if (options.isLoad) this.showLoading(); {
			url = this.config.apiUrl + url;
		}
		let contentType = 'application/x-www-form-urlencoded';
		if (options.action === 'json') {
			contentType = 'application/json;charset=UTF-8';
		}
		headerConfig['content-type'] = contentType;
		zx_token && (headerConfig['token'] = zx_token);
		// console.log(headerConfig)
		return new Promise((reslove, reject) => {
			uni.request({
				url: url,
				data: params,
				method: options.method || 'GET',
				header: headerConfig,
				success: (res) => {
					if (options.isLoad) this.hideLoading();
					if (res.statusCode == 200) {
						let type = typeof res.data;
						// let result = type == 'object'? res.data : JSON.parse(res.data);
						let result = res.data;
						if (result.code == 1 || result.code == 0) {
							reslove(result);
						} else if (result.code == 999) {
							// this.clearLocalStorage();
							uni.navigateTo({
								url: '/pages/index/index.vue'
							})
							reject('需要重新登录');
						} else {
							console.log(result);
							this.showToast(result.msg);
							reject(result);
						}
					} else {
						this.showToast(`服务器异常，请稍候重试！`);
						reject(res);
					}
				},
				fail: (res) => {
					console.log(res)
					this.hideLoading();
                    uni.stopPullDownRefresh(); // 停止当前页面的下拉刷新。
					if (res.errMsg == "request:fail " || res.errMsg == 'request:fail error') {
						this.showToast('网络连接失败，请稍候重试！');
					} else {
						this.showToast('网络连接失败，请稍候重试！');
					}
					reject(res);
				},
				complete: (res) => {
					uni.stopPullDownRefresh(); // 可以停止当前页面的下拉刷新。
				}
			});
		})
	},
	getAll(all) {
		return Promise.all(all)
	},
	/**
	 * 上传图片
	 * **/
	uploadImg(file, url, options = {}) {
		let headerConfig = {},
			formData = {};
		url = this.config.apiUrl + url;
		let name = 'file';
		if (options.imgType) {
			formData = {
				type: options.imgType
			}
		}
		if (options.isLoad) {
			uni.showLoading({
				mask: true,
			});
		}
		return new Promise((reslove, reject) => {
			uni.uploadFile({
				url: url,
				filePath: file,
				header: headerConfig,
				name,
				formData,
				success: (res) => {
					res.data = JSON.parse(res.data);
					// console.log(res);
					// this.showToast('上传成功', 1000, 'success');
					if (options.isLoad) this.hideLoading();
					if (res.statusCode == 200) {
						let result = res.data;
						if (result.code == 0) {
							reslove(result);
						} else {
							reject(result);
						}
					} else {
						this.showToast(`服务器异常，请稍候重试！`);
						reject(res);
					}
				},
				fail: (res) => {
					this.hideLoading();
					this.showToast('网络连接失败，请检查网络');
                    uni.stopPullDownRefresh(); // 可以停止当前页面的下拉刷新。
					reject(res);
				},
				complete: (res) => {
					uni.stopPullDownRefresh(); // 可以停止当前页面的下拉刷新。
				}
			});
		})

	},
	/**
	 * 同 window.confirm 效果
	 * @param {*} content 
	 * @param {*} title 
	 */
	confirm(content = '', title = '提示') {
		return new Promise((rel, rej) => {
			uni.showModal({
				title,
				content,
				success: function(res) {
					res.confirm ? rel(res.confirm) : rej(res.cancel);
				}
			});
		})
	},
	/**
	 * @param {*} phone:手机号格式 
	 */
	testPhone(str) {
		const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
		return reg.test(str)
	},
	/** 
	 *身份证校验
	 */
	testIDCard(str) {
		const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
		return reg.test(str)
	},

	clearNullObj(obj) {
		for (var propName in obj) {
			if (!obj[propName]) {
				delete obj[propName];
			}
		}
		return obj
	},
	
}
export default Tools;
