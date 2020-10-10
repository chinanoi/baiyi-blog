"use strict";

var _router = _interopRequireDefault(require("./router"));

var _Home = _interopRequireDefault(require("@/components/common/Home.vue"));

var _menu = _interopRequireDefault(require("@/router/menu.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _import = require('./router/_import_' + process.env.NODE_ENV); //获取组件的方法


var getRouter; //用来获取后台拿到的路由

console.log(getRouter);

_router["default"].beforeEach(function (to, from, next) {
  if (!getRouter) {
    //不加这个判断，路由会陷入死循环
    // if (!getObjArr('router')) {
    // axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
    getRouter = _menu["default"].data.router; //后台拿到路由

    saveObjArr('router', getRouter); //存储路由到localStorage
    // console.log(getRouter)

    routerGo(to, next); //执行路由跳转方法
  } else {
    next();
  }
});

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter); //过滤路由
  // console.log(getRouter)

  _router["default"].addRoutes(getRouter); //动态添加路由


  global.antRouter = getRouter[1].children; //将路由数据传递给全局变量，做侧边栏菜单渲染工作

  next(_objectSpread({}, to, {
    replace: true
  }));
}

function saveObjArr(name, data) {
  //sessionStorage 存储数组对象的方法
  sessionStorage.setItem(name, JSON.stringify(data));
}

function getObjArr(name) {
  //sessionStorage 获取数组对象的方法
  return JSON.parse(window.sessionStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) {
  //遍历后台传来的路由字符串，转换为组件对象
  var accessedRouters = asyncRouterMap.filter(function (route) {
    if (route.component) {
      if (route.component === 'home') {
        //Layout组件特殊处理
        route.component = _Home["default"];
      } else {
        // console.log(route.component)
        route.component = _import(route.component); // console.log(route.component)
      }
    }

    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }

    return true;
  });
  return accessedRouters;
}