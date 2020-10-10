import router from './router'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import home from '@/components/common/Home.vue' //Layout 是架构组件，不在后台返回，在文件里单独引入
import menu from '@/router/menu.js'
var getRouter
//初始化路由
function initRouter() {
  router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('getRouter')) {
      //不加这个判断，路由会陷入死循环
      getRouter = menu.data.router //后台拿到路由
      // getRouter = getData() //后台拿到路由
      console.log(getRouter)
      sessionStorage.setItem('getRouter', getRouter)
      saveObjArr('router', getRouter) //存储路由到sessionStorage
      routerGo(to, next) //执行路由跳转方法
    } else {
      next()
    }
  })
}
//获取后台的数据，并且转换成路由需要的数据
function getData() {
  let menu = [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/',
      component: 'home',
      children: [
        {
          path: '/dashboard',
          component: 'page/Dashboard',
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: '平台首页',
          meta: {
            title: '平台首页',
          },
        },
        {
          path: '/blogs/add',
          component: 'blogs/sub-components/blogsTemplate',
          icon: 'el-icon-lx-cascades',
          meta: { title: '添加博客', icon: 'el-icon-lx-cascades' },
          index: 'blogs/add',
          title: '添加博客'
        },
        {
          path: '/404',
          component: 'page/404',
          meta: { title: '页面不存在' },
        },
      ],
    },
    {
      path: '*',
      redirect: '/404',
    },
  ]
  let menuData = JSON.parse(sessionStorage.getItem('menu'))
  if (menuData) {
    let parent = []
    let children = []
    menuData.forEach((menu) => {
      if (menu.parentModuleId === null) {
        parent.push(menu)
      } else {
        children.push(menu)
      }
    })
    // console.log(parent)
    parent.forEach((item, index) => {
      let i = 0
      let pathData = {}
      // console.log(item)
      if (item.url == null || item.url == '') {
        pathData = {
          //有子菜单
          path: '/Dashboard',
          component: 'page/Dashboard',
          icon:
            item.icon == null || item.icon == ''
              ? 'el-icon-lx-home'
              : item.icon,
          index: index.toString(),
          title: item.moduleName,
        }
      } else {
        pathData = {
          //只有一级菜单
          path: '/' + item.url.substring(item.url.lastIndexOf('/') + 1),
          component: item.url,
          icon:
            item.icon == null || item.icon == ''
              ? 'el-icon-lx-home'
              : item.icon,
          index: item.url.substring(item.url.lastIndexOf('/') + 1),
          title: item.moduleName,
        }
      }

      if (children.length > 0) {
        children.forEach((res) => {
          i++
          if (item.moduleId === res.parentModuleId) {
            // console.log(index)
            menu[1].children.push({
              path: '/' + res.url.substring(res.url.lastIndexOf('/') + 1),
              component: res.url,
              index: index.toString(),
              meta: {
                title: res.moduleName,
                icon:
                  item.icon == null || item.icon == ''
                    ? 'el-icon-lx-home'
                    : item.icon,
              },
            })
            if (!pathData.subs) pathData.subs = []
            pathData.subs.push({
              index: res.url.substring(res.url.lastIndexOf('/') + 1),
              title: res.moduleName,
            })
          }

          if (i === children.length) {
            menu[1].children.push(pathData)
          }
          // console.log(pathData)
        })
      } else {
        menu[1].children.push(pathData)
      }
    })
    console.log(menu)
  }

  return menu
}
//路由跳转添加
function routerGo(to, next) {
  let routerJson = JSON.parse(window.sessionStorage.router)
  getRouter = filterAsyncRouter(routerJson) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter[1].children //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  // console.log(getRouter[1].children)
  next({ ...to, replace: true })
}
//sessionStorage 保存组对象的方法
function saveObjArr(name, data) {
  //sessionStorage 存储数组对象的方法
  sessionStorage.setItem(name, JSON.stringify(data))
}
//sessionStorage 获取数组对象的方法
function getObjArr(name) {
  //sessionStorage 获取数组对象的方法
  return window.sessionStorage.getItem(name)
}
//过滤路由
function filterAsyncRouter(asyncRouterMap) {
  //获取当前所有vue文件
  let requireComponent = require.context('@/components', true, /\.vue/)
  //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter((route) => {
    let isExist = false
    if (route.component) {
      if (route.component === 'home') {
        //Layout组件特殊处理
        route.component = home
      } else {
        let path = route.path.slice(1)
        // 遍历出每个组件的路径
        requireComponent.keys().forEach((filePath) => {
          //获取文件的方法
          let dataFile = filePath.split('/')
          // console.log(dataFile.length)
          dataFile = dataFile[dataFile.length - 1].split('.')[0]
          // let names = dataFile.split('.')[0]
          let fileName = validateFileName(filePath)
          if (path.toLowerCase() === dataFile.toLowerCase()) {
            isExist = true
          }
        })
        if (isExist) {
          route.component = _import(route.component)
        } else {
          //路由对应不上文件
          return false
        }
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

function validateFileName(str) {
  return (
    /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
  )
}

function capitalizeFirstLetter(str) {
  return str.charAt(0) + str.slice(1)
}
export default {
  //导出初始化路由的方法跟过滤路由的方法
  initRouter,
  filterAsyncRouter,
}
