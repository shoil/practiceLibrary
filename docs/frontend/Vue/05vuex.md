# ***vuex***

> 一个vue的状态管理器，类似于一个全局变量/方法存储器，却能做到更多的事情

一个vuex状态管理器一般会有三个部分组成，`state` , `mutation` , `action` ，甚至在不需要异步执行代码的情况下，你可以只使用 `state` 与 `mutation` 进行状态管理。但实际应用中你可能还会需要 `getter` 与 `module` 方便获取 `state` 与明化业务分工

## state

问： 什么时候需要用到 store 的 state

答： 虽然可以将所有的状态放入vuex，但这会让代码变得冗长和不直观。所以vuex中存放的状态应该为在应用中需要关联使用的状态。如果有些状态严格属于单个组件，最好还是将其作为组件的局部状态。

### mapState 辅助函数

应用场景： 当一个组件需要获取多个状态的时候

~~~
<template>
  <div>
    count: {{ count }}
    token: {{ token }}
    countAlias: {{ countA }}
    countFuc: {{ countFuc }}
  </div>
</template>
~~~

~~~
import { mapState } from 'vuex'

export default {
  // ...
  data() {
    return {
      localCount: 3
    }
  }
  // ...
  computed: {
    ...mapState({
      count: state => state.count,
      token: state => state.token,
      countA: 'count',
      countFuc(state) {
        return state.count + this.localCount
      }
    })
  }
}
~~~

## getter

类似于计算属性computed，你可以将它当做一个属性使用，也可以将它修饰后再使用；除此之外，在获取 `state` 中数据嵌套较深的数据时，它极其有用（对比直接获取state值的复杂度）

应用场景： 获取请求url的域名端口、多页面获取同一个限制数据

~~~
export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
~~~

### mapGetters 辅助函数

类似于 `mapState` , 将 `computed` 下 `...mapGetters` 中的名称映射为 `store.getters.xxx`

~~~
export default {
  // ...
  mounted() {
    console.log('store.getters.doneTodos', this.doneTodosCount)
    console.log('store.getters.doneTodosCount', this.doneTodos)
  }
  computed: {
    ...mapGetters([
      'doneTodosCount',
      'doneTodos'
      // ...
    ])
    // 也可以像这样更改名称
    // ...mapGetters({
    //   toDoCount: 'doneTodosCount'
    // })
  }
}
~~~

## mutation

是更改vuex状态的唯一方法，mutation必须是同步函数

~~~
export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state, payload) {
      state.count += payload
    },
    clcrement(state, payload) {
      state.count -= payload
    }
  }
})
~~~

~~~
// 提交mutation
this.$store.commit('increment', 3)
~~~

### mapMutations 辅助函数

使用原理与之前的辅助函数一样

在组件中提交mutation

~~~
export default {
  methods: {
    ...mapMutations([
      'increment'
    ]),
    ...mapMutations({
      dele: 'clcrement'
    }),
    handleFuc() {
      this.increment(4)
      // this.dele(3)
    }
  }
}
~~~

## action

使用方式与mutation相似，不同点：

*   action提交mutation，而不是直接更改状态
    
*   action可以包含异步操作
    

可以利用 `async/await` 组合action

~~~
// 假设 getData() 和 getOtherData() 返回的是 Promise
​
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
~~~

~~~
// 分发action
this.$store.dispatch('actionA').then(() => {
  // ...
})
~~~

### mapActions 辅助函数

在组件中分发action，用法与mapMutations基本一致

## module

模块可以将vuex进行分割，每个分割后的模块拥有自己的 `state`、`mutation`、`action`、`getter`, 甚至是嵌套子模块，在这store对象比较臃肿时非常有用，而且分割会使分类更加清晰

~~~
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import test from './modules/user'
import getters from './getters'
​
Vue.use(Vuex)
​
export default new Vuex.Store({
  modules: {
    user,
    test
  },
  getters
})
~~~
