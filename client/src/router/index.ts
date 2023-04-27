import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'
import HomtLayout from '@/layout/HomtLayout'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index'),
        meta: {
          title: '登录',
        }
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomtLayout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article/index'),
        meta: {
          title: '文章管理'
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router