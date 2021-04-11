参考文章： [剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)
*   Observer： 劫持并监听 `data` 中的属性，在属性发生变化时通知订阅者
*   Watcher： 往属性订阅器 `dep` 中添加自己，在属性变动通知时，调用自身的 `udate()` 方法，并触发 `compile` 中绑定的回调
*   Compile： 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图


## 数据响应式原理
>[success] vue会把data中的属性通过 `Object.defineProperty` 添加setter和getter，在数据赋值时，会自动触发setter
~~~
// vue watch 的一部分源码：
function defineProperty(data, key, val) {
    let _value = data[key];
    let childObj = observer(_value);

    let dep = new Dep(); //生成一个调度中心，管理此字段的所有订阅者
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set: function(value) {
            val = value;
            childObj = observer(value);
            dep.notify();
        }
    })
}
~~~
![](https://cn.vuejs.org/images/data.png)