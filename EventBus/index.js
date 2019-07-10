// EventBus 跨页面数据通信

let cache = {};

let EventBus = {

	// 结束事件监听【pN -页面名称， eN -事件名称】
	off(pN, eN){
		delete cache[pN][eN];
		if(Object.keys(cache[pN]).length <=0){
			delete cache[pN];
		}
	},

	// 开始监听事件【pN -页面名称，eN -事件名称，pO -页面对象，fn -处理函数】
	on(pN, eN, pO, fn){
		if(!cache[pN]){
			cache[pN] = {};
		}
		cache[pN][eN] = [fn, pO];
	},

	// 触发事件【pN -页面名称，eN -事件名称，args -事件参数】
	trigger(pN, eN, args){
		let [fn, pO] = cache[pN][eN];
		fn.call(pO, args);
	},

}

export default EventBus;
