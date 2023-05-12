import request from "@/utils/request";

/** 登录 */
export const loginApi = (params: any) => {
  return request.post('/api/login', params)
}

/** 注册 */
export const registerApi = (params: any) => {
  return request.post('/api/register', params)
}

/** 用户信息 */
export const userInfoApi = () => {
  return request.get('/my/userinfo')
}

/** 更改用户信息 */
export const updateInfoApi = (params: any) => {
  return request.post('/my/updateinfo', params)
}

/** 更换头像 */
export const updateAvatarApi = (params: any) => {
  return request.post('/my/update/avatar', params)
}

/** 修改密码 */
export const updatePwdApi = (params: any) => {
  return request.post('/my/updatepwd', params)
}