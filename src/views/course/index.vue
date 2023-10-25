<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <el-title title="角色管理"></el-title>
    <div
      ref="headerRef"
      class="tw-w-full tw-flex tw-justify-between tw-items-center">
      <div class="tw-w-full tw-mt-[10px]">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="角色名称">
                <el-input
                  v-model="formData.roleName"
                  style="width: 100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="onSearch">
                查询
              </el-button>
              <el-button
                type="primary"
                @click="onAdd">
                新增
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <el-table
      style="width: 100%; margin-top: 8px"
      :height="mainHeight - headerHeight - 40"
      :data="tableData"
      row-class-name="my-el-table-stripe-row-name"
      header-cell-class-name="my-el-table-header-cell-name"
      stripe>
      <el-table-column
        show-overflow-tooltip
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="权限职位">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template #default="{ row }">
          <el-button
            v-if="isEdit(row.roleName)"
            text
            type="primary"
            class="tw-px-[5px]"
            @click="onEdit(row)">
            编辑
          </el-button>
          <el-button
            v-if="isEdit(row.roleName)"
            text
            type="danger"
            class="tw-px-[5px]"
            @click="onDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 40, 60]"
        large
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange">
      </el-pagination>
    </div>
  </div>
  <role-dialog
    v-model="isShow"
    :dialog-data="dialogData"
    @on-reload="onReload">
  </role-dialog>
</template>

<script setup>
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useElementSize } from '@vueuse/core'
  import { usePagination } from '@/utils/hooks'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import * as apis from '@/apis/index'
  import { ROLER } from '@/configs/user'
  import roleDialog from './components/role-dialog.vue'
  import elTitle from '@/components/title/index.vue'

  const formData = reactive({
    roleName: ''
  })

  const { pagination } = usePagination()
  const tableData = ref([])

  const mainRef = ref(null)
  const headerRef = ref(null)
  const { height: mainHeight } = useElementSize(mainRef)
  const { height: headerHeight } = useElementSize(headerRef)

  // dialog信息
  const dialogData = ref({})
  // （新增/编辑）弹窗
  const isShow = ref(false)
  const isEdit = computed(() => {
    return (role) => {
      if (
        role === '超级管理员' ||
        role === '项目管理员' ||
        role === '项目经理' ||
        role === '普通员工'
      ) {
        return false
      } else {
        return true
      }
    }
  })
  onMounted(() => {
    onSearch()
  })

  const onSearch = () => {
    apis
      .getRoleList({
        ...pagination,
        roleName: formData.roleName.trim()
      })
      .then((res) => {
        if (res.data.code == 0) {
          const { records, total } = res.data.data
          tableData.value = records
          pagination.total = total
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
  }

  // 页面大小发生变化
  const onSizeChange = () => {
    onSearch()
  }
  // 当前页发生变化
  const onCurrentChange = () => {
    onSearch()
  }
  // 新增弹窗
  const onAdd = () => {
    dialogData.value = null
    isShow.value = true
  }
  // 编辑弹窗
  const onEdit = (row) => {
    dialogData.value = { ...row }
    isShow.value = true
  }
  // 删除
  const onDelete = (row) => {
    ElMessageBox({
      title: '角色权限',
      type: 'warning',
      message: '是否删除该角色权限，请谨慎选择！',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          apis
            .removeRole(row.id)
            .then((res) => {
              if (res.data.code === 0) {
                ElMessage.success('删除成功')
                done()
                onSearch()
              } else {
                ElMessage.error(res.data.msg)
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              instance.confirmButtonLoading = false
            })
        } else {
          done()
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  // dialog自定义事件
  const onReload = () => {
    onSearch()
  }
</script>

<style lang="scss" scoped></style>
