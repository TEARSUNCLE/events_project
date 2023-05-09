import request from "@/utils/request";

/** 文章列表 */
export const articleListApi = (params: any) => {
  return request.post('/my/article/list', params)
}

/** 新增文章 */
export const createArticleApi = (params: any) => {
  return request.post('/my/article/add', params)
}

/** 修改文章 */
export const updateArticleApi = (params: any) => {
  return request.post('/my/article/update', params)
}

/** 删除文章 */
export const delArticleApi = (params: any) => {
  return request.post('/my/article/del', params)
}

/** 文章详情 */
export const articleDetailApi = (params: any) => {
  return request.post('/my/article/detail', params)
}