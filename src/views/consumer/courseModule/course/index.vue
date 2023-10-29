import { adminCourseLis } from '@/apis';
<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <div ref="headerRef">
      <el-title title="COURSE"></el-title>
      <div class="tw-w-full tw-mt-[10px]">
        <el-form :model="formData">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="COURSE-NAME">
                <el-input
                  v-model="formData.keyword"
                  style="width: 100%">
                </el-input>
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
        prop="id"
        :index="id"
        label="CODE">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="COURSE-NAME">
      </el-table-column>
      <el-table-column
        prop="priceType"
        label="PRICE-TYPE">
        <template #default="{ row }">
          {{ row.priceType === 1 ? '付费' : '免费' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="PRICE">
      </el-table-column>
      <el-table-column label="CHOOSE COURSE">
        <template #default="{ row }">
          <el-button
            v-if="row.orderId === null"
            type="primary"
            @click="edit(row)">
            DEATIL
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
    <el-dialog
      v-model="isShow"
      title="Tips"
      width="30%"
      :before-close="handleClose">
      ARE SURE CHOOSE THIS COURSE!!!
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="modifyComfirm()">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import elTitle from '@/components/title/index.vue'
  import { userCourseList, chooseCourse } from '@/apis/user.js'
  import { onMounted, reactive, ref } from 'vue'
  import { useElementSize } from '@vueuse/core'
  import { usePagination } from '@/utils/hooks.js'
  import { ElMessage } from 'element-plus'
  const { pagination } = usePagination()
  const tableData = ref([])
  const orderForm = reactive({
    courseId: ''
  })
  const formData = reactive({
    keyword: '',
    roleId: ''
  })
  const mainRef = ref(null)
  const headerRef = ref(null)
  const { height: mainHeight } = useElementSize(mainRef)
  const { height: headerHeight } = useElementSize(headerRef)
  onMounted(() => {
    onSearch()
  })

  // dialog开关
  const isShow = ref(false)
  // 页面大小发生变化
  const onSizeChange = () => {
    onSearch()
  }
  // 当前页发生变化
  const onCurrentChange = () => {
    onSearch()
  }

  const onSearch = () => {
    userCourseList({
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
    orderForm.courseId = row.id
    isShow.value = true
  }

  const modifyComfirm = () => {
    if (orderForm.courseId !== '') {
      chooseCourse({ courseId: orderForm.courseId }).then((res) => {
        if (res.code === 0) {
          ElMessage.success('选课成功！')
        }
        isShow.value = false
        onSearch()
      })
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }
</style>
