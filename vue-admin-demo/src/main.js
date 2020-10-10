import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'
// import VueI18n from 'vue-i18n'
// import { messages } from './components/common/i18n';
// import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '@/assets/css/icon.css';
import '@/components/common/directives'
import 'babel-polyfill'
import '@/utils/global' //全局

import '@/assets/css/main.css'
import '@/assets/css/btn.css'
import '@/assets/css/table.css'
import '@/assets/css/search.css'
import '@/assets/css/common.css'
import '@/assets/css/twoDialog.css'
import '@/assets/css/oneDialog.css'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import './axiosConfig'
// import "@/assets/css/theme/light_blue/color.css";   // 蓝色主题
// import "@/assets/css/theme/light_blue/index.css";    // 蓝色主题
import '@/assets/css/icon.css'
import dynamicRouter from '@/dynamicRouter.js'
Vue.config.productionTip = false
// Vue.use(VueI18n)
Vue.use(ElementUI, {
  size: 'small',
})
Vue.prototype.$axios = axios
Vue.prototype.$store = store
//初始颜色
Vue.prototype.defaultTheme = 'light_blue'
Vue.prototype.dynamicRouter = dynamicRouter
// const i18n = new VueI18n({
//   locale: 'zh',
//   messages
// })
//判断用户是否登录，如果登录直接取sessionStorage里面的路由值
let userRole = sessionStorage.getItem('ms_username')
// console.log(userRole)
if (userRole) {
  // console.log(userRole)
  let routerJson = JSON.parse(window.sessionStorage.router) //获取路由值
  let getRouterTemp = dynamicRouter.filterAsyncRouter(routerJson) //过滤路由
  router.addRoutes(getRouterTemp) //动态添加路由
  global.antRouter = getRouterTemp[1].children //将路由数据传递给全局变量，做侧边栏菜单渲染工作
}
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  let role = sessionStorage.getItem('ms_username')
  sessionStorage.setItem('path_open', to.path)
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
//防止手动修改localstorage
window.addEventListener('storage', (e) => {
  sessionStorage.setItem(e.key, e.oldValue) //重新赋值修改前的值
})
new Vue({
  router,
  // i18n,
  render: (h) => h(App),
}).$mount('#app')
