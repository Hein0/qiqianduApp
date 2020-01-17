/**
 * localStorage封装
 * @author Orange软件
 * @date 2019.3.10
 */
function local() {}


/**
 * 队列封装
 * @author Orange软件
 * @date 2019.3.10
 */
const queue = {
	setJson(key, value) {
		let jsonString = JSON.stringify(value);
		localStorage.setItem(key, jsonString);
	},
	
	getJson(key) {
		let jsonString = localStorage.getItem(key);
		return JSON.parse(jsonString);
	},
	
	removeItemKey(key) {
		localStorage.removeItem(key);
	},
	
	//获取队列里面全部的数据
	get(key) { 
	
		let data = this.getJson(key);
		if (data instanceof Array) {
			return data;
		}
		return [];
	},
	
	//队列插入数据
	insert(param) { 
		param.capacityNum = param.capacityNum || 100; //队列容量 默认队列中超过100条数据，自动删除尾部
		let data = this.getJson(param.key);
		if (data instanceof Array) {
			if (data.length > param.capacityNum) {
				let total = data.length - param.capacityNum;
				for (let i = 0; i < total; i++) {
					data.pop();
				}
			}
			data.unshift(param.value);
		} else {
			data = [];
			data.push(param.value);
		}
		this.setJson(param.key, data);
	},
	
	//清空所有队列
	clear() { 
		localStorage.clear();
	},
	
	//提供itemIds数组 批量删除队列中的某项数据
	removeItem(key, itemIds) { 
	
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let i = 0; i < itemIds.length; i++) {
				for (let p = 0; p < data.length; p++) {
					if (itemIds[i] == data[p].itemid) {
						data.splice(p, 1);
						break;
					}
				}
			}
			this.setJson(key, data);
		}
	},
	
	//检测某条数据在队列中是否存在
	isExist(key, itemId) { 
	
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let p = 0; p < data.length; p++) {
				if (itemId == data[p].itemid) {
					return true;
				}
			}
		}
		return false;
	},
	
	//删除某条队列
	remove(key) { 
		localStorage.removeItem(key);
	},
	
	//获取队列中全部数据数量
	getCount(key) { 
	
		let data = this.getJson(key);
		if (data instanceof Array) {
			return data.length;
		}
		return 0;
	}
	
}

export default queue
