<template>
  <PageCards
    :tableData="tableData"
    @onSearch="onSearch"
    @openDialog="getOrderDetail" />

  <el-dialog
    v-model="dialogVisible"
    :title="orderDetails.value.course.courseName"
    width="30%">
    <el-descriptions
      class="margin-top"
      :column="3"
      size="large">
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">ORDER STATUS</div>
          <div> {{ orderDetails.value.course.courseName }} </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">PRICE TYPE</div>
          <div>
            {{ orderDetails.value.course.priceType === 0 ? 'free' : 'charges collectable' }}
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">PRICE</div>
          <div> {{ orderDetails.value.course.price }} </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">ORDER CODE</div>
          <div> {{ orderDetails.value.id }} </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">ORDER STATUS</div>
          <div> {{ orderDetails.value.orderStatus === 0 ? 'studying' : 'finish' }} </div>
        </template>
      </el-descriptions-item>
    </el-descriptions>
    <h2>FILE INFOS</h2>
    <div
      v-for="attachment in orderDetails.value.course.fileInfos"
      :key="attachment.id">
      <el-link
        type="primary"
        :href="attachment.downloadUrl">
        {{ attachment.originName }}
      </el-link>
    </div>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import { myCourseOrderList, orderDetail } from '@/apis/user.js'
  import PageCards from './PageCards.vue'

  const tableData = ref([])
  const dialogVisible = ref(false)
  const orderDetails = reactive({})
  const courseDetails = ref({})

  const onSearch = (pagination) => {
    pagination.pageNumber = pagination.currentPage
    myCourseOrderList({
      ...pagination
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

  const getOrderDetail = (item) => {
    const id = item.id
    orderDetail(id).then((res) => {
      if (res.data.code === 0) {
        // eslint-disable-next-line no-const-assign
        orderDetails.value = res.data.data
        courseDetails.value = res.data.data.course
        dialogVisible.value = true
      }
    })
  }
</script>
