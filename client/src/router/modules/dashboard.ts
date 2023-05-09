import { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/dashboard',
    redirect: '/'
  }
]

export default routes