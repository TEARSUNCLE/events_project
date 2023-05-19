import { userInfoApi } from '@/api/user'
import router from '@/router'
import { userInfoType } from '@/types/common'
import { clearToken, getToken } from '@/utils/storage'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken() || '',
      loginTime: '',
      userInfo: {} as userInfoType
    }
  },

  persist: {
    enabled: true, // 开启存储
    strategies: [
      { storage: localStorage, paths: ['userInfo', 'loginTime'] },
    ]
  },

  actions: {
    setUserInfo(row: userInfoType) {
      if (row)
        this.userInfo = row
    },

    // 退出
    logout(msg = '已退出', type = 'success') {
      message[`${type}`](msg)
      router.push('/login')
      localStorage.removeItem('userInfo')
      clearToken()
    },

    // 获取用户信息
    async getUserInfo() {
      const { data } = await userInfoApi()
      if (data.code === 0) {
        this.setUserInfo(data.data)
      }
    },

    setLoginTime(time: string) {
      this.loginTime = time
    }
  }
})