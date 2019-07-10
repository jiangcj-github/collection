
//-------------------------------------------------------------------------------------------------
// 数字处理

Number.prototype.toFlex = function(n){
	let p = 10 ** n;
	return Math.round(this * p) / p;
}


//--------------------------------------------------------------------------------------------------
// 日期处理

Date.prototype.toFmt = function(fmt){ 
	let o = { 
		"y" : this.getFullYear(),
		"M" : this.getMonth() + 1,
		"d" : this.getDate(),
		"h" : this.getHours(),
		"m" : this.getMinutes(),
		"s" : this.getSeconds(),
		"S" : this.getMilliseconds()
	};
	for(var k in o){
		if(!new RegExp(`(${k}+)`).test(fmt)){
			continue;
		}
		let s = RegExp.$1;
		let t = o[k].toString();
		t = t.slice(-s.length);				
		t = t.padStart(s.length, "0");
		fmt = fmt.replace(s, t);
	}
	// 2019-09-08 15:32:00
	return fmt;
}

//------------------------------------------------------------------------------------------------
//字符串处理

String.prototype.fmtPhone = function(c = " "){
	// 158 1026 9653
	return this.replace(/(?<=^\d{3}(\d{4})?)\B/g, c);
}

String.prototype.fmtIDC = function(c = " "){
	// 420982 19930809 6938
	return this.replace(/(?<=^\d{6}(\d{8})?)\B/g, c);
} 

String.prototype.fmtNum = function(n, c = " "){
	// 1 0000 0000
	let s = new RegExp("\\B(?=(\\d{" + n + "})+$)", "g");
	return this.replace(s, c);
}

String.prototype.fmtBin = function(c = " "){
	// 6225 1234 1234 1231 2342
	return this.replace(/(?<=^(\d{4})+)\B/g, c);
}

String.prototype.fmtBinX = function(c = " "){
	// 6225 **** **** **** 2342
	return this.replace(/(?<=^(\d{4})+)\B/g, c).replace(/(?<=\s)\d{4}(?=\s)/g, "****");
}
