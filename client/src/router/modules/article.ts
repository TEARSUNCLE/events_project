import { RouteRecordRaw } from "vue-router";

const article: Array<RouteRecordRaw> = [
  {
    path: '/articleCates',
    name: 'articleCates',
    component: () => import('@/views/articleCates/index'),
    meta: {
      title: '文章类别'
    }
  }
]

export default article