## 1. 选项/组合

### 1.1 mixins

可以在混入中添加组件的额外事件（组件内事件，但不适合放在methods），此外可以使用混入来写jsx语法，jsx内钩子函数会优先于组件内钩子函数触发。
## 2. 实例选项/数据

### 2.1 props

`default` 设置初始值，如果传入属性的类型为Array或者Object,则必须使用函数来返回初始值

~~~
props: {
  type: Array,
  default: function() {
    return [0, 1, 2]
  }
}
~~~

### 2.2 computed

> 计算属性，多用于处理插值表达式，返回处理结果。

~~~
<div>
  <!-- 使用时将它视为一个属性值而不是在调用一个方法 -->
  {{ fullName }}
</div>
​
computed: {
  fullName: function() { return '' }
}
~~~

### 2.3 watch

监听一个对象的所有属性更改：

~~~
obj: {
  handler(newVal) {
    console.error('newVal', newVal)
  },
  deep: true
}
~~~

监听对象下具体的属性：

~~~
'obj.name': {
  handler(newVal, oldVal) {
    console.error('newVal', newVal)
    console.error('oldVal', oldVal)
  },
  deep: true,
  immediate: true // 是否立即执行handler
}
~~~

监听事件：

> 通过设置 `immediate` 属性为 `true` 在初始渲染时触发 `handler` 监听事件

~~~
handleChange: {
  handler(handleChange) {
    console.error('handleChange', handleChange)
    handleChange() // 此时是可以执行的
  },
  immediate: true
}
~~~

## 3. 实例属性

### 3.1 vm.$attrs

> 只读属性，`$attrs` 会获取直接父组件传递过来的未在props中声明的属性，通过 `v-bind="$attrs"` 传入内部组件，内部组件中 `$attrs` 亦会获取未在props中声明的属性

应用场景： 需要将属性值传入内部组件

> tips： 内部组件若想获取与其直接父组件有相同的属性时，直接父组件可以通过 `$attrs.` 使用属性

~~~
<div>
  <Child :name="name" :age="age"/>
</div>
​
components: {
  Child
}
~~~

~~~
<div>
  <p>$attrs: {{ $attrs }}</p>
  <p>name by props: {{ name }}</p>
  <p>age: {{ $attrs.age }}</p>
  <Grandson v-bind="$attrs" />
</div>
​
export default {
  name: 'Child',
  props: {
    name: { type: String }
  },
  components: {
    Grandson
  }
}
~~~

> 内部组件 `$attrs` 获取到的是其父组件中通过 `$attrs` 可获取的属性

~~~
<div>
  <p>$attrs: {{ $attrs }}</p>
  <p>age: {{ $attrs.age }}</p>
</div>
~~~

### 3.2 vm.$listeners

> this.$listeners可以获取由父组件传递的所有未含 `.native` 修饰器的事件，通过 `v-on="$listeners"` 传入内部组件，内部组件亦可以获取这些事件

应用场景： 内部组件想要传递属性值给外部组件

~~~
<div>
  <Child :handleNameEve="handleNameEve" @handleAgeEve="handleAgeEve" />
</div>
​
components: {
  Child
},
methods: {
  handleNameEve(name) {
    console.log(`i'm ${name}`)
  },
  handleAgeEve(age) {
    console.log(`i'm ${age}`)
  }
}
~~~

~~~
<div>
    <Grandson v-on="$listeners" />
</div>
​
export default {
  name: 'Child',
  props: {
    handleNameEve: { type: Function }
  },
  mounted() {
    this.handleNameEve('pikaqiu')
    this.$listeners.handleAgeEve(22)
    this.$emit('handleAgeEve', 18)
  },
  components: {
    Grandson
  }
}
~~~

~~~
<div>
  i'm Grandson
</div>
​
mounted() {
  this.$listeners.handleAgeEve(20)
  this.$emit('handleAgeEve', 19)
}
~~~

## 4. 实例方法/数据

### 4.1 $set

> 向响应式对象（该对象不能是vm.$data）添加新的响应式属性，并从触发视图更新

## 5. 实例方法/生命周期

### 5.1 $nextTick

> 该函数会在异步刷新dom后执行

应用场景： 等待数据加载loading动画

~~~
data() {
  return {
    loading: false
  }
},
methods: {
  async handleLoadingStatus() {
    this.loading = true
    await this.$nextTick()
    this.loading = false
  }
}
~~~

## 6. 内置组件

### 6.1 transition

> 使用 `transition` 包裹元素标签，给 `transition` 添加 `name` 属性后自动生成 CSS 过渡类名（也支持自定义过渡类名），不额外产生dom。被包裹元素标签相同时，需要给定 `key` ,否则动画失效

### 6.2 transition-group

> tag属性指定被包裹元素标签的父元素标签，默认为span。用于同时渲染整个列表

### 6.3 keep-alive

> 多用于包裹路由，tab切换之类的动态组件, 使用 `include` 和 `exclude` 属性可以指定那些组件被缓存或不被缓存(vue 2.1以上可用), 指定内容与 **组件名** 相关。此外可用 `max` 指定可缓存的组件数量上限（vue 2.5以上可用）

包裹动态组件

~~~
<div>
  <keep-alive include='ibook'>
    <component :is="currentTabComponent"></component>
  </keep-alive>
</div>
~~~

包裹路由
> 结合配置 `route` 的 `meta` 属性一起使用实现缓存

~~~
<keep-alive>
  <router-view v-if="this.$route.meta.alive" />
</keep-alive>
<router-view v-if="!this.$route.meta.alive" />
~~~
~~~
export default [{
  path: '/',
  name: 'home',
  meta: {
    alive: false,
    title: 首页'
  },
  component: Home
}, {
  path: '/ibook',
  name: 'ibook',
  meta: {
    alive: true,
    title: '书籍'
  },
  component: Ibook
}]
~~~
>[success] 优点：可缓存组件实例（包括 **state** ）提升系统流畅度；可选择性缓存想要缓存的组件（2.1以后支持）；可配置缓存上限（2.5以后支持）

>[warning] 缺点： 缓存组件实例代表着更多的 **系统内存** 被使用，对于刷新频率高的组件可以考虑使用，但应该控制组件缓存数量上限（应与组件内容有关）