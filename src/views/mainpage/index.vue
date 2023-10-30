<template>
  <div class="tab">
    <div
      v-for="item in tableData"
      :key="item.id"
      class="goods">
      <!-- {{ item }} -->
      <div class="goods-item suspension">
        <el-image
          v-if="item.logo"
          loading="lazy"
          fit="contain"
          class="goods-img"
          :src="item.logo" />
        <div
          v-else
          class="goods-img"
          :style="{ backgroundColor: stringToColor(item.id) }" />
        <div class="goods-footer">
          <!-- <div
          v-if="item.tags && item.tags.length > 0"
          class="goods-tag">
          <el-tag
            v-for="(tag, idx) in item.tags"
            :key="idx"
            :type="tag.type">
            {{ tag.name }}
          </el-tag>
        </div> -->
          <div class="goods-title">
            {{ item.courseName }}
          </div>
          <div class="goods-data">
            <span class="download-count">
              <el-icon><Download></Download></el-icon>
              {{ item.downloads ? item.downloads : '-' }}
            </span>
            <el-button
              class="goods-price"
              link
              @click="console.log(item.id)">
              <el-icon><ShoppingCart /></el-icon>
              <span class="current-price">{{ item.price }}</span>
            </el-button>
          </div>
        </div>
      </div>
      <!-- <div
      class="goods-item suspension"
      @click="showInfo(item.id)">
      <el-image
        loading="lazy"
        fit="contain"
        class="goods-img"
        :src="item.logo ? item.logo : fullUrl('/static/images/local-module-logo.png')">
      </el-image>
      <div class="goods-footer">
        <div
          v-if="item.tags && item.tags.length > 0"
          class="goods-tag">
          <el-tag
            v-for="(tag, idx) in item.tags"
            :key="idx"
            :type="tag.type">
            {{ tag.name }}
          </el-tag>
        </div>
        <div class="goods-title">
          {{ item.title }}
        </div>
        <div class="goods-data">
          <span class="download-count">
            <Icon
              name="fa fa-download"
              color="#c0c4cc"
              size="13"></Icon>
            {{ item.downloads ? item.downloads : '-' }}
          </span>
          <span class="goods-price">
            <span class="original-price">{{
              currency(item.original_price, item.currency_select)
            }}</span>
            <span class="current-price">{{
              currency(item.present_price, item.currency_select)
            }}</span>
          </span>
          <div class="goods-price">
            <el-tag
              effect="dark"
              :type="item.stateTag.type">
              {{ item.stateTag.text }}
            </el-tag>
          </div>
        </div>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script setup>
  import * as apis from '@/apis/index'
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import { ElMessage } from 'element-plus'
  import { get, post, put, remove } from '@/apis/config'

  const formData = reactive({
    roleName: ''
  })
  const tableData = ref([])
  const { pagination } = usePagination()

  onMounted(async () => {
    onSearch()
    const data = await List()
    console.log(data)
  })

  const List = (data) => get(`/course-admin-api/api/v1/consumer/order/list`, data)

  const onSearch = () => {
    apis
      .adminCourseLis({
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
  const stringToColor = (str) => {
    // 将字符串转换为哈希码
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    // 生成颜色
    const color = '#' + (hash & 0x00ffffff).toString(16).slice(-6)

    return color
  }
</script>

<style scoped lang="scss">
  .tab {
    display: flex;
    flex-wrap: wrap;
  }
  .goods {
    display: flex;
    flex-wrap: wrap;
  }
  .goods-item {
    width: 245px;
    margin: 10px;
    padding-bottom: 40px;
    position: relative;
    border-radius: var(--el-border-radius-base);
    background-color: var(--el-fill-color-extra-light);
    cursor: pointer;
    box-shadow: var(--el-box-shadow-light);
  }
  .goods-img {
    border-radius: var(--el-border-radius-base);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: 245px;
    height: 163.33px;
  }
  .modules-empty {
    width: 100%;
  }
  .goods-footer {
    display: block;
    overflow: hidden;
    padding: 10px 10px 0 10px;
    .goods-tag {
      min-height: 60px;
    }
    .goods-title {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 6px;
    }
    .goods-data {
      display: flex;
      width: calc(100% - 20px);
      position: absolute;
      bottom: 0;
      align-items: baseline;
      padding: 10px 0;
      .download-count {
        color: var(--el-text-color-placeholder);
      }
      .goods-price {
        margin-left: auto;
      }
      .original-price {
        font-size: 13px;
        color: var(--el-text-color-placeholder);
        text-decoration: line-through;
      }
      .current-price {
        font-size: 16px;
        color: var(--el-color-danger);
        padding-left: 6px;
      }
    }
  }
  .el-tabs--border-card {
    border: none;
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
  }
  .el-tabs--border-card :deep(.el-tabs__header) {
    background-color: var(--ba-bg-color);
    border-bottom: none;
    border-radius: var(--el-border-radius-base);
  }
  .el-tabs--border-card :deep(.el-tabs__item.is-active) {
    border: 1px solid transparent;
  }
  .el-tabs--border-card :deep(.el-tabs__nav-wrap) {
    border-radius: var(--el-border-radius-base);
  }
  :deep(.store-tabs) .el-tabs__content {
    padding: 10px 10px;
    min-height: 350px;
  }
</style>
