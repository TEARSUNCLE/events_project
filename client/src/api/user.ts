import request from "@/utils/request";

/** 登录 */
export const loginApi = (params: any) => {
  return request.post('/api/login', params)
}

/** 注册 */
export const registerApi = (params: any) => {
  return request.post('/api/register', params)
}