export default {
  data: {
    router: [
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
            title: '系统首页',
            flag:true,
            meta: {
              title: '首页',
            },
          },
          {
            path: '/tags',
            component: 'tags/tags',
            icon: 'el-icon-lx-cascades',
            meta: { title: '标签管理', icon: 'el-icon-lx-cascades' },
            index: 'tags',
            title: '标签管理',
            subs: [
              {
                index: 'tags',
                title: '标签管理',
              }
            ]
          },
          {
            path: '/types',
            component: 'types/types',
            icon: 'el-icon-lx-cascades',
            meta: { title: '分类管理', icon: 'el-icon-lx-cascades' },
            index: 'types',
            title: '分类管理',
            subs: [
              {
                index: 'types',
                title: '分类管理',
              }
            ]
          },
          {
            path: '/users',
            component: 'users/users',
            icon: 'el-icon-lx-cascades',
            meta: { title: '用户管理', icon: 'el-icon-lx-cascades' },
            index: 'users',
            title: '用户管理',
            subs: [
              {
                index: 'users',
                title: '用户管理',
              }
            ]
          },
          {
            path: '/comments',
            component: 'comments/comments',
            icon: 'el-icon-lx-cascades',
            meta: { title: '评论管理', icon: 'el-icon-lx-cascades' },
            index: 'comments',
            title: '评论管理',
            subs: [
              {
                index: 'comments',
                title: '评论管理',
              }
            ]
          },
          {
            path: '/blogs',
            component: 'blogs/blogs',
            icon: 'el-icon-lx-cascades',
            meta: { title: '博客管理', icon: 'el-icon-lx-cascades' },
            index: 'blogs',
            title: '博客管理',
            subs: [
              {
                index: 'blogs',
                title: '博客管理',
              }
            ]
          },
          {
            path: '/blogsAdd',
            name:'blogsAdd',
            component:'blogs/sub-components/blogsAdd',
            meta: { title: '添加博客' }
          },
          {
            path: '/blogsEdit',
            name:'blogsEdit',
            component:'blogs/sub-components/blogsEdit',
            meta: { title: '修改博客' }
          },
          {
            path: '/markdown',
            name:'Markdown',
            idnex:'markdown',
            component:'page/Markdown',
            meta: { title: 'markdown' }
          },
          {
            path: '/404',
            component: 'page/404',
            meta: { title: '404' },
          },
        ],
      },
      {
        path: '*',
        redirect: '/404',
      },
    ],
  },
}
