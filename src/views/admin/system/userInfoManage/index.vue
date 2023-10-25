<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <div ref="headerRef">
      <el-title title="用户信息管理"></el-title>
      <div class="tw-w-full tw-mt-[10px]">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-input
                  v-model="formData.keyword"
                  style="width: 100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户职位">
                <el-select v-model="formData.roleId">
                  <el-option
                    v-for="item in roles"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="onSearch">
                查询
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
        label="序号"
        type="index"
        :index="indexMethod"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户账号">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="用户职位">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="identityCode"
        label="身份证号">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="edit(row)">
            编辑
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
  <Dialog
    v-model="isShow"
    :dialog-data="dialogData"
    @on-reload="onReload">
  </Dialog>
</template>

<script setup>
  import elTitle from '@/components/title/index.vue'
  import Dialog from './components/collection-dialog.vue'
  import * as apis from '@/apis/index'
  import { onMounted, reactive, ref } from 'vue'
  import { useElementSize } from '@vueuse/core'
  import { usePagination } from '@/utils/hooks'
  const { pagination, indexMethod } = usePagination()
  const tableData = ref([])
  const formData = reactive({
    keyword: '',
    roleId: ''
  })
  const roles = ref([])

  const mainRef = ref(null)
  const headerRef = ref(null)
  const { height: mainHeight } = useElementSize(mainRef)
  const { height: headerHeight } = useElementSize(headerRef)
  onMounted(() => {
    getRoles()
    onSearch()
  })

  const getRoles = () => {
    apis.getAllRole().then((res) => {
      roles.value = res.data.data
    })
  }
  // dialog开关
  const isShow = ref(false)
  const dialogData = ref({})
  // 页面大小发生变化
  const onSizeChange = () => {
    onSearch()
  }
  // 当前页发生变化
  const onCurrentChange = () => {
    onSearch()
  }

  const onSearch = () => {
    apis
      .getUserList({
        ...pagination,
        keyword: formData.keyword.trim(),
        roleId: formData.roleId
      })
      .then((res) => {
        if (res.data.code === 0) {
          const { records } = res.data.data
          tableData.value = records
        }
      })
      .catch((err) => console.log(err))
  }
  const edit = (row) => {
    dialogData.value = { ...row }
    isShow.value = true
  }
  const onReload = () => {
    onSearch()
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }
</style>
