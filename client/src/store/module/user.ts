import { getToken } from '@/utils/storage'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken() || '',
      userInfo: {}
    }
  },

  persist: {
    enabled: true, // 开启存储
    strategies: [
      { storage: localStorage, paths: ['userInfo'] }
    ]
  },

  actions: {
    setUserInfo(row) {
      if (row)
        this.userInfo = row
    }
  }
})