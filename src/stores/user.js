import { getUserInfo } from '@/apis'
import { defineStore } from 'pinia'
const userInfoJsonStr = localStorage.getItem('userInfo')
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: userInfoJsonStr && userInfoJsonStr !== 'undefined' ? JSON.parse(userInfoJsonStr) : {}
  }),
  getters: {
    getUserRole: (state) => {
      if (state.userInfo) {
        const { sysRole } = state.userInfo
        if (sysRole) {
          // 暂时先给管理员
          return sysRole.roleName
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
      console.log(role)
      this.userRole = role
      localStorage.setItem('role', role)
    },
    async getUserInfo() {
      let res
      try {
        res = await getUserInfo()
        if (res.data.code === 0) {
          this.userInfo = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
