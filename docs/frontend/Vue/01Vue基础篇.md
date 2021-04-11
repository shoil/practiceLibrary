## 1. 模板

页面元素的构成部分

### 1.1 插值

> 在静态文本之间插入动态数据值

~~~
<span>msg: {{ msg }}</span>
~~~

> 上面的demo中双大括号会将数据解析为普通文本，若想真正的输出HTML代码，需要使用 `v-html` （实际使用很少，更多时候会在插值外面添加元素标签包裹插值）

~~~
<p>Using normal: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
~~~

上面demo的result：

~~~
Using normal: <span>this is a test</span>
Using v-html directive: this is a test
~~~

#### 1.1.1 JavaScript表达式

> 若处理太过复杂的内容时，推荐使用 `computed` 计算属性

~~~
<div>
  <p>{{ num + 1 }}</p>
  <p>{{ ok ? 'yes' : 'no' }}</p>
</div>
​
data() {
  return {
    num: 1,
    ok: true
  }
}
~~~

### 1.2 指令

事件监听、属性绑定等数据相关更改与呈现，都与它相关

#### 1.2.1 v-bind

> 常见属性绑定，可缩写为 `:`

#### 1.2.2 v-on

> 常见事件处理绑定，可缩写为 `@`

#### 1.2.3 v-model

> 用于双向数据绑定

应用场景： 例如表单输入，输入框等

~~~
<div>
    <input type="text" v-model="txtVal">
</div>
​
data() {
  return {
    txtVal: ''
  }
}
~~~

#### 1.2.4 v-once

> 用于只需渲染一次值的元素；性能优化

应用场景： 例如标题的渲染

~~~
<div>
    <span v-once>{{ title }}</span>
</div>
~~~

### 1.3 修饰符

修饰符与指令搭配使用，在某些情况下会取得很棒的响应。

#### 1.3.1 v-mode修饰符(常用)

~~~
<!-- 在输入框输入值更改时才会触发 -->
<input v-model.lazy="txtVal" type="text">
~~~

~~~
<!-- 未使用.number修饰符的txtVal为string类型 -->
<!-- 而添加.number修饰符的txtVal将得到number类型 -->
<input v-model.number="txtVal" type="number">
~~~

~~~
<!-- 去除输入字符的首尾空格 -->
<input v-model.trim="txtVal" type="text">
~~~

#### 1.3.2 事件修饰符

~~~
<!-- .stop阻止事件冒泡（由内而外） -->
<div @click="handleClickDiv" class="event">
    <li @click.stop="handleClickLi"></li>
</div>
~~~

~~~
<!-- .prevent阻止默认事件，等同于JavaScript的`event.preventDefault()` -->
~~~

~~~
<!-- 有事件冒泡时会更改事件的执行顺序： .capture的事件优先触发且会（由外至内）先执行 -->
~~~

~~~
<!-- .self会触发除子元素范围之外的事件，可以理解外由外至内阻止事件冒泡 -->
~~~

#### 1.3.3 按键修饰符

~~~
按键按下到弹起：@keydown - @keypress - @keyup
~~~

相对常用的有： @keyup.enter/@keyup.esc

## 2. Script脚本

页面的灵魂，所有数据相关的操作都在这里完成。推荐在熟悉 `vue` 基本用法之后，前去阅读 `vue进阶篇-api`

## 3. 样式

页面的外表，可对页面进行修饰

> 不建议书写内联样式

`v-bind:class` 可以动态切换class，亦能与普通的class属性共存

~~~
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
~~~

绑定的数据对象不必内联定义在模板内

~~~
<div v-bind:class="classObject"></div>
~~~

~~~
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
~~~

还可以绑定一个返回对象的计算属性

~~~
<div v-bind:class="classObject"></div>
~~~

~~~
data() {
  return {
    isActive: true,
    error: false
  }
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error
    }
  }
}
~~~

## 4. 渲染

### 4.1 条件渲染

#### 4.1.1 v-if v-else-if v-else

> 切换过程中会销毁和重建元素

~~~
<div>
  <span v-if="isIf === 1">if</span>
  <li v-else-if="isIf === 2">else if</li>
  <p v-else>else</p>
</div>
~~~

#### 4.1.2 v-show

> 基于 `css` 的切换，没有显示元素的 `display` 属性为 `none` ；初始条件为假也会被编译

应用场景： 需要频繁切换视图显示

~~~
<span v-show="isShow">show</span>
<li v-show="!isShow">not show</li>
~~~

#### 4.1.3 两者的区别

v-if有更高的切换消耗，v-show有更高的初始渲染消耗

### 4.2 列表渲染

#### 4.2.1 v-for

渲染数组： `v-for="item in arr"`， 渲染对象： `v-for="(value, key) of obj"`

> 需要指定 `key` 属性

### 4.3 特殊特性key

`key` 的特殊性主要用在vue的虚拟dom算法，在新旧nodes对比辨识VNodes。

> 有相同父元素的子元素的 `key` 必须不一样，重复的 `key` 会造成渲染错误

## 5. 组件

每个 `vue` 组件都拥有 `template` , `script` 以及 `style` , 且组件是可复用的，也就是说，你可以在父组件中多次使用子组件，这些被使用的子组件都单独存在，不为同一个

### 5.1 基础组件

组件通信

> 下面的demo包含了父子通信与子父通信两种，日常工作也经常用到

~~~
<!-- ... -->
  <div>
    <p>这里是父组件</p>
    <Child :music="music" :handleName="handleNe" @sendMsg="handleListenChild" />
  </div>
​
<script>
import Child from '@/components/Child'
​
export default {
  // ...
  components: {
    Child
  },
  data() {
    return {
      music: {
        name: '告白气球',
        author: '周杰伦'
      }
    }
  },
  methods: {
    handleNe(name) {
      console.log('name', name)
    },
    handleListenChild(msg) {
      console.log('child said： ', msg)
    }
  }
  }
}
</script>
~~~

~~~
<!-- ... -->
  <div>
    <p>这里是子组件Child</p>
    <p>父组件传递的值：{{ JSON.stringify(music) }}</p>
    <button @click="handleSendName">发送名字给父组件</button>
    <button @click="handleSendMsg">发消息给父组件</button>
  </div>
​
<script>
export default {
  // ...
  props: {
    music: {
      type: Object,
      default: null
    },
    handleName: Function
  },
  data() {
    return {
      newName: 'xiaopi',
      msg: '嗯哼？'
    }
  },
  methods: {
    handleSendName() {
      const { newName } = this
      this.handleName(newName)
    },
    handleSendMsg() {
      const { msg } = this
      this.$emit('sendMsg', msg)
    }
  }
}
</script>
~~~

### 5.2 动态组件

> 将多个子组件挂载在同一位置，通过变量来切换这些子组件，实现 `tab切换` 的效果，这样的功能也可以通过vue-router实现，但路由更适合较大的组件，且url会有相应更改

具体实现： 通过Vue的 `<component>` 元素加一个特殊的 `is` 实现效果

~~~
<div>
  <p>这是一个动态组件</p>
  <button @click="handleTabToHome">home</button>
  <button @click="handleTabToPosts">posts</button>
  <button @click="handleTabToActive">active</button>
  <!-- 组件会在 currentTabComponent 更改时改变 -->
  <component :is="currentTabComponent"></component>
</div>
~~~

> `currentTabComponent` 可以包含一个已注册组件的组件名（推荐使用）或一个组件的选项对象

### 5.3 插槽slot

> 插槽可以理解为是一个占位符 || 一个替换标签

应用场景： 通用订制式组件

#### 5.3.1 匿名插槽

~~~
<div>
  <p>这里是父组件</p>
  <Slot-Child>
    <template><p>我是匿名插槽</p></template>
    <template><p>我来写两次</p></template>
  </Slot-Child>
</div>
~~~

~~~
<div>
  <p>我是子组件Slot-Child</p>
  <slot></slot>
  <!-- <slot name="default"></slot> -->
</div>
~~~

#### 5.3.2 具名插槽

~~~
<Slot-Child>
  <template v-slot:content>
    <ul>
      <li>我</li>
      <li>是</li>
      <li>谁</li>
    </ul>
  </template>
  <!-- 未提供插槽内容将会渲染后备数据 -->
  <template v-slot:unUsed></template>
  <!-- 提供的插槽内容将会替换后备数据 -->
  <!-- <template v-slot:unUsed>新能源</template> -->
</Slot-Child>
~~~

~~~
<div>
  <p>我是子组件Slot-Child</p>
  <slot name="content"></slot>
  <slot name="unUsed">这是后备能源</slot>
</div>
~~~

#### 5.3.3 作用域插槽

*   能够绑定数据
    
*   样式父组件定，内容可以自己定
    

~~~
<Slot-Child>
  <template v-slot:Scope="data">
    <ul>
      <li v-for="item in data.music" :key="item.id">{{item.type}}</li>
    </ul>
  </template>
</Slot-Child>
~~~

~~~
<!-- ... -->
  <div>
    <p>我是子组件Slot-Child</p>
    <slot name="Scope" :music="music"></slot>
  </div>
​
<script>
// ...
  data() {
    return {
      music: [
        { 'type': 'rap', id: 0 },
        { 'type': '嘻哈', id: 1 },
        { 'type': '古典', id: 2 },
        { 'type': '爵士', id: 3 },
      ]
    }
  }
</script>
~~~

## 6. 路由

~~~
import vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
import Book from '@/views/book'
​
vue.use(Router)
​
const router = newRouter({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout
    }, {
      path: '/book',
      name: 'book',
      component: Book 
    }
  ]
})
​
export default router
~~~
