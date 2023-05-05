import { RouteRecordRaw } from "vue-router";

const dashboard: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页'
    }
  }
]

export default dashboard