"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  data: {
    router: [{
      path: '/',
      redirect: '/dashboard'
    }, {
      path: '/',
      component: 'home',
      children: [{
        path: '/dashboard',
        component: 'page/Dashboard',
        icon: 'el-icon-lx-home',
        index: 'dashboard',
        title: '系统首页',
        meta: {
          title: '首页'
        }
      }, {
        path: '/table',
        component: 'base-table/BaseTable',
        icon: 'el-icon-lx-cascades',
        meta: {
          title: '一行搜索框',
          icon: 'el-icon-lx-cascades'
        },
        index: 'table',
        title: '基础表格',
        subs: [{
          index: 'table',
          title: '一行搜索框'
        }, {
          index: 'BaseTableInputTwo',
          title: '两行搜索框'
        }, {
          index: 'BaseTableShow',
          title: '展开行'
        }]
      }, {
        // 展开行
        path: '/BaseTableShow',
        component: 'base-table/BaseTableShow',
        meta: {
          title: '展开行',
          icon: 'el-icon-lx-cascades'
        }
      }, {
        // 两个搜索框
        path: '/BaseTableInputTwo',
        component: 'base-table/BaseTableInputTwo',
        meta: {
          title: '两行搜索框',
          icon: 'el-icon-lx-cascades'
        }
      }, {
        path: '/form',
        component: 'page/BaseForm',
        meta: {
          title: '基本表单'
        },
        icon: 'el-icon-lx-calendar',
        index: '3',
        title: '功能',
        subs: [{
          index: 'form',
          title: 'form表单'
        }, {
          index: 'upload',
          title: '文件上传'
        }, {
          index: 'message',
          title: '提示框的使用'
        }]
      }, {
        // 富文本编辑器组件
        path: '/editor',
        component: 'page/VueEditor',
        meta: {
          title: '富文本编辑器'
        }
      }, {
        // markdown组件
        path: '/markdown',
        component: 'page/Markdown',
        meta: {
          title: 'markdown编辑器'
        }
      }, {
        // 图片上传组件
        path: '/upload',
        component: 'page/Upload',
        meta: {
          title: '文件上传'
        }
      }, {
        // 提示框的使用
        path: '/message',
        component: 'page/Message',
        meta: {
          title: '文件上传'
        }
      }, {
        // 拖拽列表组件
        path: '/DragList',
        component: 'page/DragList',
        meta: {
          title: '拖拽列表'
        }
      }, {
        // 拖拽Dialog组件
        path: '/dialog',
        component: 'page/DragDialog',
        meta: {
          title: '拖拽弹框'
        },
        icon: 'el-icon-rank',
        index: '6',
        title: '拖拽组件',
        subs: [{
          index: 'DragList',
          title: '拖拽列表'
        }, {
          index: 'dialog',
          title: '弹框'
        }]
      }, {
        path: '/404',
        component: 'page/404',
        meta: {
          title: '404'
        }
      }]
    }, {
      path: '*',
      redirect: '/404'
    }]
  }
};
exports["default"] = _default;