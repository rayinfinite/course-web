import { getUserInfo } from '@/apis'
import { defineStore } from 'pinia'
const userInfoJsonStr = localStorage.getItem('userInfo')
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: userInfoJsonStr && userInfoJsonStr !== 'undefined' ? JSON.parse(userInfoJsonStr) : {}
  }),
  getters: {
    getUserRole: (state) => {
      if (state) {
        const { sysRole } = state
        if (sysRole) {
          // 暂时先给管理员
          return sysRole.roleCode
        }
      } else {
        return null
      }
    }
  },
  actions: {
    setUserInfo(data) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      this.userInfo = data
    },
    setUserRole(role) {
      this.role = role
      localStorage.setItem('role', role)
    },
    async getUserInfo() {
      try {
        const res = await getUserInfo()
        if (res.data.code === 0) {
          this.userInfo = res.data.data
        }
      } catch (error) {
        console.log(error)
        return true
      }
      return false
    }
  }
})
