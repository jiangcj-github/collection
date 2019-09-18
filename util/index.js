
//-------------------------------------------------------------------------------------------------
// 数字处理

Number.prototype.toFlex = function (n = 2) {
	let p = 10 ** n;
	return Math.round(this * p) / p;
}

Number.prototype.toPer = function (n = 2) {
	let p = 10 ** (n + 2);
	return Math.round(this * p) / p * 100;
}

Number.prototype.limit = function (min, max) {
	let n = this.valueOf();
	n <= min && (n = min);
	n >= max && (n = max);
	return n;
}

//--------------------------------------------------------------------------------------------------
// 日期处理

Date.prototype.toFmt = function (fmt) {
	let o = {
		"y": this.getFullYear(),
		"M": this.getMonth() + 1,
		"d": this.getDate(),
		"h": this.getHours(),
		"m": this.getMinutes(),
		"s": this.getSeconds(),
		"S": this.getMilliseconds()
	};
	for (var k in o) {
		if (!new RegExp(`(${k}+)`).test(fmt)) {
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

Date.prototype.diff = function () {
	let d = Date.now() - this.getTime();

	let MINITE = 60 * 1000;
	let HOUR = MINITE * 60;
	let DAY = 24 * HOUR;
	let WEEK = 7 * DAY;
	let MONTH = 30 * DAY;
	let YEAR = 12 * MONTH;

	let yearD = ~~(d / YEAR);
	let monthD = ~~(d / MONTH);
	let weekD = ~~(d / WEEK);
	let dayD = ~~(d / DAY);
	let hourD = ~~(d / HOUR);
	let minD = ~~(d / MINITE);
	let secD = ~~(d / 1000);

	if (yearD > 0) {
		return `${yearD}年前`;
	}
	if (monthD > 0) {
		return `${monthD}月前`;
	}
	if (weekD > 0) {
		return `${weekD}周前`;
	}
	if (dayD > 0) {
		return `${dayD}天前`;
	}
	if (hourD > 0) {
		return `${hourD}小时前`;
	}
	if (minD > 0) {
		return `${minD}分钟前`;
	}
	if (secD > 0) {
		return `${secD}秒前`;
	}
	return '刚刚';
}

//------------------------------------------------------------------------------------------------
//字符串处理

//11位随机字符串
String.random = function () {
	return Math.random().toString(36).substring(2);
}

String.prototype.fmtPhone = function (c = " ") {
	// 158 1026 9653
	return this.replace(/(?<=^\d{3}(\d{4})?)\B/g, c);
}

String.prototype.fmtIDC = function (c = " ") {
	// 420982 19930809 6938
	return this.replace(/(?<=^\d{6}(\d{8})?)\B/g, c);
}

String.prototype.fmtNum = function (n, c = " ") {
	// 1 0000 0000
	let s = new RegExp("\\B(?=(\\d{" + n + "})+$)", "g");
	return this.replace(s, c);
}

String.prototype.fmtBin = function (c = " ") {
	// 6225 1234 1234 1231 2342
	return this.replace(/(?<=^(\d{4})+)\B/g, c);
}

String.prototype.fmtBinX = function (c = " ") {
	// 6225 **** **** **** 2342
	return this.replace(/(?<=^(\d{4})+)\B/g, c).replace(/(?<=\s)\d{4}(?=\s)/g, "****");
}

String.prototype.trunc = function (n, fix = "...") {
	let s = this.valueOf();
	if (s.length > n) {
		return this.slice(0, n) + fix;
	}
	return s;
}

//-----------------------------------------------------------------------------------------------
//对象处理

Object.prototype.get = function (path, defV) {
	let p = path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
	return p.reduce((o, k) => (o || {})[k], this) || defV;
}

Object.prototype.clone = function () {
	return JSON.parse(JSON.stringify(this));
}

//---------------------------------------------------------------------------------------------
//数组

Array.range = function (n, sV = 0) {
	return [...Array(n).keys()].map(e => e + sV);
}

//数组混淆（随机顺序）
Array.prototype.mix = function () {
	return this.slice().sort(() => Math.random() - 0.5);
}

//数组去重
Array.prototype.unique = function () {
	return [...new Set(this)];
}

//---------------------------------------------------------------------------------------------
//DOM节点
// window 包含 [history, document, location, frame]
// 继承关系 Node -> [Document -> HTMLDocument, ELement -> HTMLElement -> [HTMLDivElement, ...]]

//获取节点距离文档左上角的left,top
//如果要获取相对于浏览器可视区的位置请使用 getBoundingClientRect
Element.prototype.getPosition = function () {
	let $e = this;
	let left = 0, top = 0;
	while ($e) {
		left += $e.offsetLeft;
		top += $e.offsetTop;
		$e = $e.offsetParent;
	}
	return { left, top };
}

Element.prototype.addClass = function (clsName) {
	this.classList.add(clsName);
}

Element.prototype.removeClass = function (clsName) {
	this.classList.remove(clsName);
}

Element.prototype.toggleClass = function (clsName) {
	this.classList.toggle(clsName);
}

Element.prototype.hasClass = function (clsName) {
	return this.classList.contains(clsName);
}

//--------------------------------------------------------------------------------------------
//window.location

//?a=1&b=2 => {a: 1, b: 2}
window.location.parse = function () {
	let obj = {};
	this.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => obj[k] = v);
	return obj;
}

Object.freeze(Object.prototype);
Object.freeze(Date.prototype);
Object.freeze(Array.prototype);
Object.freeze(String.prototype);
Object.freeze(Number.prototype);
Object.freeze(Math.prototype);