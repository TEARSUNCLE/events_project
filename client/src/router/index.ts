import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

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
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router