import { createRouter, createWebHashHistory } from 'vue-router'
import { ROLER } from '@/configs/user'
import { useUserStore } from '@/stores/user'
import pinia from '@/stores/store'
const user = useUserStore(pinia)
const router = createRouter({
  history: import.meta.env.BASE_URL
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        return (
          {
            [ROLER.admin]: '/admin',
            [ROLER.user]: '/user'
          }[user.getSysUser] || '/admin'
        )
      }
    },
    // 登录
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
    // 项目详情
    {
      path: '/projectDetail',
      name: 'projectDetail',
      component: () => import('@/views/projectDetail/index.vue')
    },
    // 资金详情
    {
      path: '/moneyDetail',
      name: 'moneyDetail',
      component: () => import('@/views/moneyDetail/index.vue')
    },
    // 管理员admin
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
          path: 'moneyModule',
          component: () => import('@/views/admin/course/index.vue'),
          redirect: '/admin/moneyModule/moneyManage',
          children: [
            // 资金管理
            {
              path: 'moneyManage',
              component: () => import('@/views/admin/moneyModule/moneyManage/index.vue'),
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
    {
      path: '/user',
      component: () => import('@/views/user/layout/index.vue'),
      redirect: '/user/course',
      meta: {
        requireAuth: true
      },
      children: [
        // 课程管理
        {
          path: '/course',
          component: () => import('@/views/admin/course/index.vue'),
          redirect: '/user/course/',
          children: [
            // 资金管理
            {
              path: 'moneyManage',
              component: () => import('@/views/admin/moneyModule/moneyManage/index.vue'),
              meta: {
                routerName: '资金模块-资金管理'
              }
            }
          ]
        }
      ]
    },
    // 重定向
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
