宏任务和微任务
    script(主线程代码) setTimeout setInterval 是宏任务
    promise mutation observe 是微任务
    任务执行顺序：宏任务 -> 当前宏任务产生的所有微任务 -> GUI线程(UI渲染) -> 下一个宏任务
    JS引擎线程(主线程)和GUI线程(UI渲染)是互斥的。