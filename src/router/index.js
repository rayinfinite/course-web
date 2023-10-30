import { createRouter, createWebHashHistory } from 'vue-router'
import { ROLER } from '@/configs/user'
import { useUserStore } from '@/stores/user'
const user = useUserStore(pinia)
import pinia from '@/stores/store'
const routes = [
  {
    path: '/',
    redirect: () => {
      const role = user?.userInfo?.sysRole?.roleCode
      if (role === undefined) {
        return 'login'
      }
      return (
        {
          [ROLER.admin]: '/admin',
          [ROLER.teacher]: '/teacher',
          [ROLER.consumer]: '/consumer'
        }[role] || '/admin'
      )
    }
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  // 注册
  {
    path: '/register',
    component: () => import('../views/register/index.vue')
  },
  // 找回密码
  {
    path: '/getBack',
    component: () => import('../views/getBack/index.vue')
  },
  // 用户信息
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('../views/userInfo/index.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/layout/index.vue'),
    redirect: '/admin/system',
    meta: {
      requireAuth: true
    },
    children: [
      // 资金模块
      {
        path: 'courseModule',
        component: () => import('@/views/admin/courseModule/index.vue'),
        redirect: '/admin/courseModule/courseManage',
        children: [
          // 资金管理
          {
            path: 'courseManage',
            component: () => import('@/views/admin/courseModule/course/index.vue'),
            meta: {
              routerName: '资金模块-资金管理'
            }
          }
        ]
      },
      // 审批模块
      // 系统管理
      {
        path: 'system',
        component: () => import('@/views/admin/system/index.vue'),
        redirect: '/admin/system/roleList',
        children: [
          {
            path: 'roleList',
            component: () => import('@/views/admin/system/roleList/index.vue'),
            meta: {
              routerName: '系统管理-角色管理'
            }
          },
          // 用户信息管理
          {
            path: 'userInfoManage',
            component: () => import('@/views/admin/system/userInfoManage/index.vue'),
            meta: {
              routerName: '系统管理-用户管理'
            }
          }
        ]
      }
    ]
  },
  //老师
  {
    path: '/teacher',
    component: () => import('@/views/teacher/layout/index.vue'),
    redirect: '/teacher/courseModule',
    meta: {
      requireAuth: true
    },
    children: [
      // 课程模块
      {
        path: 'courseModule',
        component: () => import('@/views/teacher/courseModule/index.vue'),
        redirect: '/teacher/courseModule/courseManage',
        children: [
          // 课程管理
          {
            path: 'courseManage',
            component: () => import('@/views/teacher/courseModule/courseMange/index.vue'),
            meta: {
              routerName: 'courseModule-courseManage'
            }
          },
          {
            path: 'orderManage',
            component: () => import('@/views/teacher/courseModule/orderManage/index.vue'),
            meta: {
              routerName: 'courseModule-courseManage'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/orderDetail',
    component: () => import('@/views/orderDetail/index.vue'),
    meta: {
      routerName: 'courseModule-orderDetail'
    }
  },
  {
    path: '/consumer',
    component: () => import('@/views/consumer/layout/index.vue'),
    redirect: '/consumer/courseModule',
    meta: {
      requireAuth: true
    },
    children: [
      // 课程模块
      {
        path: 'courseModule',
        component: () => import('@/views/consumer/courseModule/index.vue'),
        redirect: '/consumer/courseModule/course',
        children: [
          // 课程
          {
            path: 'course',
            component: () => import('@/views/consumer/courseModule/course/index.vue'),
            meta: {
              routerName: 'courseModule-course'
            }
          },
          {
            path: 'order',
            component: () => import('@/views/consumer/courseModule/order/index.vue'),
            meta: {
              routerName: 'courseModule-order'
            }
          }
        ]
      },
      {
        path: 'home',
        component: () => import('@/views/mainpage/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: import.meta.env.BASE_URL
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHashHistory(),
  routes: routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    console.log(token)
    console.log('abc')
    if (!token) {
      return '/login'
    }
  }
})

export default router
