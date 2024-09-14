import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let cmaerouter = new Router({
  mode: 'history', // 切换到 history 模式
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      // meta: { title: '首页' }
    },
    {
      path: '/About-us',
      name: 'about-us',
      component: () => import('./views/About-us.vue'),
      // meta: { title: '关于我们'}
    },
    {
      path: '/Case',
      name: 'case',
      component: () => import('./views/Case.vue')
    },
    {
      path: '/News',
      name: 'news',
      component: () => import('./views/News.vue')
    },
    {
      path: '/newsdetails/:id',
      name: 'newsdetails',
      component: () => import('./views/NewsDetails.vue'),
    },
    {
      path: '/casedetails/:id',
      name: 'casedetails',
      component: () => import('./views/CaseDetails.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requireAuth: true
      },
      component: () => import('./views/Admin.vue'),
      children: [{
          path: '/admin/user',
          name: 'user',
          component: () => import('./views/Admin/User.vue')
        },
        {
          path: '/admin/news',
          name: 'new',
          component: () => import('./views/Admin/News.vue')
        },
        {
          path: '/admin/cases',
          name: 'cases',
          component: () => import('./views/Admin/Cases.vue')
        },
        {
          path: '/admin/honor',
          name: 'honor',
          component: () => import('./views/Admin/Honor.vue')
        },
        {
          path: '/admin/job',
          name: 'job',
          component: () => import('./views/Admin/Job.vue')
        }
      ]
    }
  ]
})

// 判断是否需要登录权限 以及是否登录
cmaerouter.beforeEach((to, from, next) => {
  // 判断是否需要登录权限
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否登录
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      // 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

cmaerouter.afterEach((to) => {
  if (to.path.startsWith('/admin')) {
    document.title = '中國龍建功集團有限公司 - 后台管理系统';
  } else {
    document.title = '中國龍建功集團有限公司';
  }

  // 如果路由有 meta.title，则使用该标题，覆盖默认标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default cmaerouter