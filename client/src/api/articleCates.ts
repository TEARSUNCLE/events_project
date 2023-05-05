import request from "@/utils/request";

/** 分类别名列表 */
export const articleCatesApi = (params: any) => {
  return request.post('/my/article/cates', params)
}

/** 新增分类别名 */
export const createCatesApi = (params: any) => {
  return request.post('/my/article/addcates', params)
}

/** 修改分类别名 */
export const updateCatesApi = (params: any) => {
  return request.post('/my/article/updatecates', params)
}

/** 删除分类别名 */
export const delCatesApi = (params: any) => {
  return request.post('/my/article/delcates', params)
}