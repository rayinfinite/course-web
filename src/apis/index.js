import { get, post, put, remove } from './config'
/** 登录接口 */
//#region
export const uploadUrl = `${import.meta.env.VITE_API_BASE_URL}/course-login-api/api/v1/file/upload`
/**
 * 获取用户信息
 */
export const getUserInfo = () => get(`/course-login-api/api/v1/account/userInfo`)
/**
 * 修改个人信息
 */
export const setUserInfo = (data) => post(`/course-login-api/api/v1/account/modify/userInfo`, data)

/**
 * @param {*} data
 * 登录
 */
export const login = (data) => post('/course-login-api/api/v1/account/login', data)
/**
 * @param {*} data
 * 注册
 */
export const register = (data) => post('/course-login-api/api/v1/account/register', data)
/**
 * @param {*} data
 * 找回密码
 */
export const getBack = (data) => post('/course-login-api/api/v1/account/modify/password', data)
//#endregion
/***************************************/

/** 角色管理 */
//#region

/**
 * @param {*} data
 * 获取设备信息列表接口
 */
export const getRoleList = (data) => get('/course-admin-api/api/v1/sysRole/list', data)

/**
 * @param {*} data
 * 获取所有权限
 */
export const getAllRole = () => get('/course-admin-api/api/v1/sysRole/getAll')

/**
 * @param {*} data
 * 删除角色权限
 */
export const removeRole = (roleId) => remove(`/course-admin-api/api/v1/sysRole/${roleId}/delete`)

/**
 * @param {*} data
 * 新增角色权限
 */
export const addRole = (data) => post('/course-admin-api/api/v1/sysRole/create', data)

/**
 * @param {*} data
 * 修改角色权限
 */
export const editRole = (data) => put(`/course-admin-api/api/v1/sysRole/${data.id}/modify`, data)

// 修改用户职位
/**
 *
 * @param {*} data
 * 修改用户职位
 */
export const updateRole = (data) => put('/course-admin-api/api/v1/sysUser/modify/role', data)
/** 用户模块 */
//#region
/**
 * @param {*} data
 * 获取任务列表接口
 */
export const getUserList = (data) => get('/course-admin-api/api/v1/sysUser/list', data)

/**
 * @param {*} data
 *   下载菜单
 */
export const getPeopleFindAll = (data) => get(`/api/v1/sysUser/findAll`, data)
/***************************************/
/**课程模块 */

/**
 * 发布课程
 * @param {*} data
 * @returns
 */
export const adminCreateCourse = (data) =>
  put(`/course-admin-api/api/v1/admin/course/publish`, data)

/**
 *
 * @param {*} data
 * @returns
 */
export const adminUpdateCourse = (data) =>
  post(`/course-admin-api/api/v1/admin/course/update`, data)

/**
 *
 * 课程分页查询
 * @param {*} data
 * @returns
 */
export const adminCourseLis = (data) => get(`/course-admin-api/api/v1/admin/course/page`, data)
export const adminCourseCreate = (data) =>
  put(`/course-admin-api/api/v1/admin/course/publish`, data)

/**
 *
 * @param {*} data
 * @returns
 */
export const adminCourseDetail = (courseId, data) =>
  get(`/course-admin-api/api/v1/admin/course/detail/${courseId}`, data)
