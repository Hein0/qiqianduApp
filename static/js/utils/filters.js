/**
 * 手机号中间以星号代替
 * @param {*} phone
 */
export function encodePhone (phone) {
  return String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化成金钱格式
 * @param {*} money
 */
export function money (money) {
  return cutStr(money).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

/**
 * 格式化百分比
 */
export function percent (val) {
  return cutStr(val) + '%' || ''
}

/**
 * 百分比左部分
 */
export function percentLeft (val) {
  return cutStr(val).split('.')[0] || ''
}

/**
 * 百分比右部分
 */
export function percentRight (val) {
  return cutStr(val).split('.')[1] || ''
}
/**
 * 保留两位小数
 */
export function toFixed (val) {
  return cutStr(val)
}

/**
 * 保留1位小数
 */
export function toFixedOne (val) {
  let str = cutStr(val)
  let lastStr = str.charAt(str.length - 1)
  if (Number(lastStr) > 0) {
    return str
  } else {
    return str.substr(0, str.length - 1)
  }
}

/**
 * 格式化利率一位小数点不带%
 */
export function TorateOne (val) {
  return Number(val).toFixed(1)
}

/**
 * 获取银行卡尾号
 */
export function lastNo (val) {
  const str = String(val)
  return str.substr(str.length - 4, 4)
}

/**
 * 截取两位小数
 */
export function cutStr (val) {
  const newVal = val || 0
  let arr = Number(newVal).toFixed(3).split('.')
  return arr[0] + '.' + arr[1].substring(0, 2)
}

//渠道类型名称
export function shopType (type) {
	let typestr = ''
	switch(type) {
	    case 'B':
	        typestr = '天猫'
	        break;
	    case 'C':
	        typestr = '淘宝'
	        break;
	    default:
	        typestr = ''
	} 
	return typestr
}

// 转换文字
 /**数字转整数 如 10000 转为1万
 * @param {需要转化的数} num 
 * @param {需要保留的小数位数} 1 
 */
export function tranNumber (nuber) {
	let numStr = nuber.toString()
	// 十万以内直接返回 
	if (numStr.length < 5) {
		return numStr;
	}else if (numStr.length >= 5) {//大于6位数是十万 (以10W分割 10W以下全部显示)
		let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + 1)
		return parseInt(numStr / 10000) + '.' + decimal;
	}
	
}


