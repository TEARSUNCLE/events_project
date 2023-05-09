import { createWebHistory, createRouter } from 'vue-router'
import HomeLayout from '@/layout/HomeLayout'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      component: HomeLayout,
      children: routes
    }
  ]
})

export default router