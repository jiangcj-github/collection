程序员宝典之JS（残篇）
1. 代码缩进，tab=4。替换\s{2}为\t

2. promise对象

    new Promise((resolve,reject)=>{

    });
    1.promise对象是一个事件,默认pending状态
    2.resolve改变状态fulfilled,reject改变状态rejected
    3.无视返回值;
    .then
    1.前面的promise状态未fulfilled会调用
    2.返回值为非promise,返回fulfilled状态的promise; 返回promise会覆盖默认返回值
    3.抛出错误throw会返回rejected状态的promise;
    Promise.reject(1).catch(err=>console.log("err",err)).then(res=>console.log("res",res))
    >err 1
    >res undefine

    .catch
    1.前面的promise状态为rejected会调用
    2.返回值为非promise,返回fulfilled状态的promise; 返回promise会覆盖默认返回值
    3.抛出错误throw会返回rejected状态的promise;

    async
    1.函数返回一个promise,
    2.返回值为非promise,返回fulfilled状态的promise;返回promise会覆盖默认值
    3.抛出错误throw会返回rejected状态的promise;
    4.只有声明async才能使用await，await表面上会阻塞当前代码。
    5.await实际上会返回pending状态的promise,await之后的代码会变成异步(类似.then),fulfilled后才会执行,通过try-catch可以捕获rejected状态


3. 对象深复制
    const a= { a: 1, b: 2 };
    const aa= Object.assign({}, a, { c: 3 });

    const a = {a: 1, b: 2};
    const aa = {...a, c:3};
    解构也可以使用...
    const {c, ...a} = aa;  //a={a:1, b:2}

    数组复制
    let a = [1,2,3];
    let b = [...a];
    [a ,b] = [b, a]   //变量交换

4.参数不确定的函数
    function func(..args){}
    尽量不要使用arguments;

5.数据处理
    let arr = [];
    arr.filter(Boolean).length;   	//真值个数
    arr.reduce((a, b)=>a+b, 0);	//累加
    arr.every(e=>e>0);
    arr.some(e=>e>0);
    arr.filter(e=>e.prop==1)[0]  //快速查找

    数组查找
    [].indexOf()
    [].includes()
    [].filter(e=>e.prop==n).length>0   //等价 
    [].some(e=>e.prop==n)
    [].every(e=>e.prop!=n)

    数组求最大最小值
    Math.max(...[1,2,3,5])
    Math.min(...[1,2,3,5])

    数组降维&&去除空项(delete操作，非null undefined)
    a = [1,2,3,4]
    delete a[1]
    a= a.flat()

    关于reduce，数组的累加器，如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。

6.函数防抖和节流
    防抖(debounce)，限制下次调用需等待若干时间，用于input,keyup事件.
    节流(throttle)，函数在某段时间内只执行一次，用于mousemove,touchmove,scroll,resize或者动画.
    使用setTimeout+闭包实现，静态变量
    lodash的throttle默认会在开始和结束时调用两次，设置trailing: false

7.js实现range函数
    Array(10).fill(0).map((e,i)=>e+i)
    [...Array(10).keys()]
    Array.from({length: 5}, (v, i) => i);

8.保留小数
    Math.round(num * 100) / 100		//最多2位
    num.toFixed(2)			//固定2位
    身份证，手机号等格式化		//正则断言

9.接口调用
    接口调用状态req = -1,0,1
    页面关闭后，接口回调仍会执行，需要一个页面状态pF
    页面关闭后，定时器仍会执行

10.字符串操作
    补0: padStart padEnd
    截取: slice(-4)  //末尾4个字符

11.正则断言
    ^开始位置
    $结束位置
    \B 非单词边界,位置匹配
    \b 单词边界,位置匹配
    断言：位置匹配

12.查看原生方法
    Array.prototype
    String.prototype

快速类型转化
    +"333"			//字符串,日期-数字
    Number("333")		
    +new Date()
    !!23			//数字-bool
    ~~2.333			//取整
    501 / 100 | 0					

循环数组，缓存长度，提高性能
    var arr=[1,2,3,4,5,6]
    for(var i=0,len=arr.length;i<len;i++){
        ...
    }

获取数组最后一个元素
    var array = [1, 2, 3, 4, 5, 6];
    console.log( array.slice(-1) ); // [6]
    console.log( array.slice(-1)[0] ); // 6
    console.log( array.slice(-2) ); // [5,6]
    console.log( array.slice(-3) ); // [4,5,6]

测试代码执行时间
    console.time()
    console.timeEnd()

合并大数组
    var array1 = [1,2,3];
    var array2 = [4,5,6];
    array1.concat(array2);    //创建新数组
    [...array1,...array2]
    array1.push.apply(arr1, arr2)	//不创建
    array1.push(...arr2);

使用set去重，set元素唯一
    const j = [...new Set([1, 2, 3, 3])]
    >> [1, 2, 3]

console实用函数
console.log
console.dir   //打印对象
console.time()	//查看性能
console.timeEnd()

defineProperty和proxy
    proxy是ES6，defineProperty是ES5，都可以创造响应式对象属性.

响应式对象
    通过Object.defineProperty定义属性的setter,getter可以添加响应式属性.

ant第三方UI库
    https://ant.design/components/mentions-cn/

箭头函数的this具有词法作用域，无法用call,bind修改，始终指向外层的obj。

页面首次进入: page



