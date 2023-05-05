import article from "./modules/article"
import { RouteRecordRaw } from "vue-router"
import dashboard from "./modules/dashboard"

const routes: RouteRecordRaw[] = [...dashboard, ...article]

export default routes