import { message } from 'ant-design-vue'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { getToken, hasToken } from './storage'
import useStore from '@/store'

const baseURL = "http://127.0.0.1:3006"
const request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// 请求拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (hasToken()) {
    config.headers ? (config.headers.Authorization = `${getToken()}`) : config;
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截
request.interceptors.response.use((res: AxiosResponse) => {
  // 3小时
  const { user } = useStore()
  const maxTime = 3600000 * 3
  const now = new Date().getTime()
  if (now - new Date(+user.loginTime).getTime() > maxTime) {
    // 超时了
    user.logout('已超时，请重新登录', 'error')
    user.setLoginTime(new Date().getTime().toString())
  }

  if (res.data.code === 0) user.setLoginTime(new Date().getTime().toString())

  // 捕获全局的错误
  if (res.data.code !== 0) {
    message.error(res.data.msg || '请求失败，请稍后重试')
    return Promise.reject(res)
  }
  return res
}, (err) => {
  if (err.message === "Network Error") {
    message.error('请求超时，请稍后重试')
  }
  return Promise.reject(err)
})

export default request