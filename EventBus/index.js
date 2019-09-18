export default class EventBus {

	constructor(){
		this.cache = {};
	}
	
	off(event){
		delete this.cache[event];
	}
	
	emit(event, ...args){
		let arr = this.cache[event];
		arr && arr.map(fn => fn(...args));
	}
	
	on(event, fn){
		this.cache[event] = this.cache[event] || [];
		this.cache[event].push(fn);
	}

}
