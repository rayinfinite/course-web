<template>
  <div class="main_page">
    <div class="header">
      <DArrowLeft
        style="width: 30px; height: 30px; cursor: pointer"
        @click="back">
      </DArrowLeft>
      <Title title="ORDER"></Title>
    </div>
    <div>
      <h2>ORDER-DETAIL</h2>
      <main class="main">
        <el-descriptions
          class="margin-top"
          :column="3"
          size="large">
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">ORDER STATUS</div>
              <div> {{ courseDetails.courseName }} </div>
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">PRICE TYPE</div>
              <div> {{ courseDetails.priceType === 0 ? 'free' : 'charges collectable' }} </div>
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">PRICE</div>
              <div> {{ courseDetails.price }} </div>
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">ORDER CODE</div>
              <div> {{ orderDetails.id }} </div>
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">ORDER STATUS</div>
              <div> {{ orderDetails.orderStatus === 0 ? 'studying' : 'finish' }} </div>
            </template>
          </el-descriptions-item>
        </el-descriptions>
        <h2>FILE INFOS</h2>
        <div
          v-for="attachment in fileInfos"
          :key="attachment.id">
          <el-link
            type="primary"
            :href="attachment.downloadUrl">
            {{ attachment.originName }}
          </el-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { orderDetail } from '@/apis/user.js'
  import { useRoute, useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  const route = useRoute()
  const router = useRouter()
  const orderDetails = ref({})
  const courseDetails = ref({})
  const fileInfos = ref([])

  onMounted(() => {
    getOrderDetail()
  })
  const getOrderDetail = () => {
    orderDetail(route.query.orderId).then((res) => {
      if (res.data.code === 0) {
        // eslint-disable-next-line no-const-assign
        orderDetails.value = res.data.data
        courseDetails.value = res.data.data.course
        fileInfos.value = res.data.data.course.fileInfos
      }
    })
  }
  const back = () => {
    router.back()
  }
</script>
<style lang="scss" scoped>
  .main_page {
    width: 100%;
    height: 100%;
    padding: 20px;
    .header {
      width: 150px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .detail {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    .main {
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
    }
  }
  h2 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
