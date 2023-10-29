import { createRouter, createWebHashHistory } from 'vue-router'
import { ROLER } from '@/configs/user'
import { useUserStore } from '@/stores/user'
const user = useUserStore(pinia)
import pinia from '@/stores/store'
const routes = [
  {
    path: '/',
    redirect: () => {
      return (
        {
          [ROLER.admin]: '/admin',
          [ROLER.teacher]: '/teacher',
          [ROLER.consumer]: '/consumer'
        }[user.userInfo.sysRole.roleCode] || '/admin'
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
      {
        path: 'approvalModule',
        component: () => import('@/views/admin/approvalModule/index.vue'),
        redirect: '/admin/approvalModule/projectProcess',
        children: [
          // 项目审批
          {
            path: 'projectProcess',
            component: () => import('@/views/admin/approvalModule/projectProcess/index.vue'),
            meta: {
              routerName: '审批模块-项目审批'
            }
          },
          // 资金审批
          {
            path: 'moneyProcess',
            component: () => import('@/views/admin/approvalModule/moneyProcess/index.vue'),
            meta: {
              routerName: '审批模块-资金审批'
            }
          }
        ]
      },
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
          // 资金管理
          {
            path: 'courseManage',
            component: () => import('@/views/teacher/courseModule/courseMange/index.vue'),
            meta: {
              routerName: 'courseModule-courseManage'
            }
          }
        ]
      }
    ]
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
        redirect: '/consumer/courseModule/courseManage',
        children: [
          // 资金管理
          {
            path: 'courseManage',
            component: () => import('@/views/consumer/courseModule/courseMange/index.vue'),
            meta: {
              routerName: 'courseModule-courseManage'
            }
          }
        ]
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
// router.beforeEach((to, from) => {
//   if (to.matched.some((record) => record.meta.requireAuth)) {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       return '/login'
//     }
//   }
// })

export default router
