<template>
  <div
    ref="mainRef"
    class="tw-w-full tw-h-full tw-p-[20px]">
    <div ref="headerRef">
      <el-title title="MY ORDEER"></el-title>
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
        width="250"
        label="CODE">
      </el-table-column>

      <el-table-column
        prop="courseName"
        label="COURSE-NAME">
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="orderStatus">
        <template #default="{ row }">
          {{ row.orderStatus === 0 ? 'studying' : 'finish' }}
        </template>
      </el-table-column>
      <el-table-column label="OPTIONS">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="projectInfo(row)">
            DETAIL</el-button
          >
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
</template>

<script setup>
  import elTitle from '@/components/title/index.vue'
  import { myCourseOrderList } from '@/apis/user'
  const { pagination } = usePagination()
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import { onMounted, reactive, ref } from 'vue'
  import { useElementSize } from '@vueuse/core'
  import { usePagination } from '@/utils/hooks.js'
  const tableData = ref([])
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

  // 页面大小发生变化
  const onSizeChange = () => {
    onSearch()
  }
  // 当前页发生变化
  const onCurrentChange = () => {
    onSearch()
  }

  const projectInfo = (row) => {
    router.push({
      path: '/orderDetail',
      query: {
        orderId: row.id
      }
    })
  }

  const onSearch = () => {
    myCourseOrderList({
      ...pagination
    })
      .then((res) => {
        if (res.data.code === 0) {
          const { records } = res.data.data
          console.log(records)
          tableData.value = records
        }
      })
      .catch((err) => console.log(err))
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    margin-top: 16px;
  }
</style>
