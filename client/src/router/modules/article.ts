import { RouteRecordRaw } from "vue-router";

const article: Array<RouteRecordRaw> = [
  {
    path: '/articleCates',
    name: 'articleCates',
    component: () => import('@/views/articleCates/index'),
    meta: {
      title: '文章类别'
    }
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article/index'),
    meta: {
      title: '文章管理'
    }
  }
]

export default article