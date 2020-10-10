"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("@/components/common/directives");

require("babel-polyfill");

require("@/utils/global");

require("@/assets/css/main.css");

require("@/assets/css/btn.css");

require("@/assets/css/table.css");

require("@/assets/css/search.css");

require("@/assets/css/common.css");

require("@/assets/css/twoDialog.css");

require("@/assets/css/oneDialog.css");

require("element-ui/lib/theme-chalk/index.css");

require("@/assets/css/icon.css");

var _dynamicRouter = _interopRequireDefault(require("@/dynamicRouter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import VueI18n from 'vue-i18n'
// import { messages } from './components/common/i18n';
// import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '@/assets/css/icon.css';
//全局
// 默认主题
// import "@/assets/css/theme/light_blue/color.css";   // 蓝色主题
// import "@/assets/css/theme/light_blue/index.css";    // 蓝色主题
_vue["default"].config.productionTip = false; // Vue.use(VueI18n)

_vue["default"].use(_elementUi["default"], {
  size: 'small'
}); //初始颜色


_vue["default"].prototype.defaultTheme = 'light_blue';
_vue["default"].prototype.dynamicRouter = _dynamicRouter["default"]; // const i18n = new VueI18n({
//   locale: 'zh',
//   messages
// })
//判断用户是否登录，如果登录直接取sessionStorage里面的路由值

var userRole = sessionStorage.getItem('ms_username'); // console.log(userRole)

if (userRole) {
  // console.log(userRole)
  var routerJson = JSON.parse(window.sessionStorage.router); //获取路由值

  var getRouterTemp = _dynamicRouter["default"].filterAsyncRouter(routerJson); //过滤路由


  _router["default"].addRoutes(getRouterTemp); //动态添加路由


  global.antRouter = getRouterTemp[1].children; //将路由数据传递给全局变量，做侧边栏菜单渲染工作
} //使用钩子函数对路由进行权限跳转


_router["default"].beforeEach(function (to, from, next) {
  var role = sessionStorage.getItem('ms_username');
  sessionStorage.setItem('path_open', to.path);

  if (!role && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
}); //防止手动修改localstorage


window.addEventListener('storage', function (e) {
  sessionStorage.setItem(e.key, e.oldValue); //重新赋值修改前的值
});
new _vue["default"]({
  router: _router["default"],
  // i18n,
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');