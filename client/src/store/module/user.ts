import router from '@/router'
import { userInfoType } from '@/types/common'
import { clearToken, getToken } from '@/utils/storage'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken() || '',
      userInfo: {} as userInfoType
    }
  },

  persist: {
    enabled: true, // 开启存储
    strategies: [
      { storage: localStorage, paths: ['userInfo'] }
    ]
  },

  actions: {
    setUserInfo(row: userInfoType) {
      if (row)
        this.userInfo = row
    },

    // 退出
    logout() {
      message.success('已退出')
      router.push('/login')
      localStorage.removeItem('userInfo')
      clearToken()
    }
  }
})