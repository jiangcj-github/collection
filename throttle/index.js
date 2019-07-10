
// 防抖-等待触发
function deb(fn, delay){
	let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(()=>{
			fn.apply(this, args);
		}, delay);
    };
}

// 防抖-立即触发
function debIm(fn, delay){
	let timer;
	return function(...args){
		if(!timer){
			fn.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(()=>{
			timer = null;
		}, delay);
	}
}

// 节流
function thr(fn, delay = 200) {
	let timer;
    return function (...args) {
        if(!timer){
			timer = setTimeout(()=>{
				fn.apply(this, args);
                timer = null;
            }, delay);
		}
    }
}

// 节流-立即触发
function thrIm(fn, delay = 200){
	let timer;
	return function(...args){
		if(!timer){
			fn.apply(this, args);
			timer = setTimeout(()=>{
				timer = null;
			}, delay);
		}
	}
}

export default {
	deb,
	debIm,
	thr,
	thrIm
}