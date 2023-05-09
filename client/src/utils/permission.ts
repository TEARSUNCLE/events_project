// 导航守卫
import router from "@/router";
import { hasToken } from '@/utils/storage';
import { message } from "ant-design-vue";
import { getPageTitle } from "./pageTitle"

router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title as string)
  const whiteList = ['/login', '/404']

  if (hasToken()) {
    whiteList.includes(to.path) ? next('/dashboard') : next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      message.error('登录超时,请重新登录')
      next('/login')
    }
  }
})