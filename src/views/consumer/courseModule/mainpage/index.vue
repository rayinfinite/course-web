<template>
  <PageCards
    :tableData="tableData"
    @onSearch="onSearch"
    @openDialog="confirm" />

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%">
    ARE SURE CHOOSE THIS COURSE!!!
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="choose()">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { userCourseList, chooseCourse } from '@/apis/user.js'
  import PageCards from './PageCards.vue'

  const formData = reactive({
    keyword: '',
    roleId: ''
  })
  const tableData = ref([])
  const dialogVisible = ref(false)
  const course = reactive({})

  const onSearch = (pagination) => {
    pagination.pageNumber = pagination.currentPage
    userCourseList({
      ...pagination,
      keyword: formData.keyword.trim(),
      roleId: formData.roleId
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

  const confirm = (item) => {
    if (item.orderId !== null) {
      ElMessage.error('You have already selected this course!')
      return
    }
    Object.assign(course, item)
    dialogVisible.value = true
  }

  const choose = () => {
    if (course.id) {
      chooseCourse({ courseId: course.id }).then((res) => {
        if (res.code === 0) {
          ElMessage.success('选课成功！')
        }
        dialogVisible.value = false
        onSearch()
      })
    }
  }
</script>
