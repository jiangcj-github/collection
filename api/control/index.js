// 请求并发控制

let cache = {};
let reqMap = {};

// 同一个请求发送最小间隔时间(ms)
let gap = 1000;		

// 最大请求数
let max = 10;		

function init(name){

	let now = Date.now();
	if(now - reqMap[name] <= gap){
		return 0;
	}
	if(Object.keys(cache).length >= max){
		return 0;
	}

	let id = `${now}_${name}`;

	cache[id] = 1;
	reqMap[name] = now;

	return id;
}

function end(id){
	delete cache[id];
}

function isValid(id){
	if(!cache[id]){
		throw 0;
	}
}

function clear(){
	cache = {};
}

export default {
	init,
	isValid,
	end,
	clear,
}
