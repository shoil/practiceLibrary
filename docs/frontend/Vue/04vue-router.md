# ***vue-router***

> 本文档主要是对 `vue-router` 的使用，附上 `demo` 主要源码以供参考

## 1. 路由注册：

~~~
import vue from 'vue'
import Router from 'vue-router'
import routes from './router'
​
vue.use(Router)
​
const router = newRouter({
  // 默认为 hash
  mode: 'history',
  // 基路径
  base: '/',
  routes
})
​
router.beforeEach((to, from, next) => {
  // 正要离开的路由对象
  console.error('from', from)
  // 即将进入的目标路由对象
  console.error('to', to)
  // 使用该函数来reslove这个钩子，可以传递参数来重定向路由
  next()
})
export default router
~~~

### 1.1 动态属性设置

`:` 符号接参数名，在跳转路由时会动态更改参数值

~~~
export default new Router({
  routes: [{
    path: '/',
    //...
  }, {
    path: '/login/:id',
    name: 'login'
    // ...
  }]
})
~~~

~~~
const id = 1
this.$router.push(`/login/${id}`) // -> /login/1
~~~

## 2. 页面跳转

### 2.1 元素标签路由跳转

~~~
<router-link to="/home">HOME</router-link>
~~~

### 2.2 通过方法跳转（常用）

~~~
// just a string path
this.$router.push('/home')
​
// or a object
router.push({ path: 'home' })
​
// with params
const userId = '123'
router.push({ name: 'user', params: { userId } }) // -> /user/123
router.push({ `/user/${userId}` }) // -> /user/123
router.push({ name: 'user', query: { userId }}) // -> user?userId=123
~~~
## 3. 路由守卫
