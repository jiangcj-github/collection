// 快速定时器

let cache = {};
let cache2 = {};

function setTimer(tN, delay, fn){
	clearTimeout(cache[tN]);
	cache[tN] = setTimeout(fn, delay);
}

function clearTimer(tN){
	clearTimeout(cache[tN]);
}

function setIntv(iN, delay, fn){
	clearInterval(cache2[iN]);
	cache2[iN] = setInterval(fn, delay);
}

function clearIntv(iN){
	clearInterval(cache2[iN]);
}

export default {
	setTimer,
	clearTimer,
	setIntv,
	clearIntv,
}
