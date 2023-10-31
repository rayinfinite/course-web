<template>
  <div class="tab">
    <div
      v-for="item in tableData"
      :key="item.id"
      class="goods">
      <div
        class="goods-item suspension"
        @click="emit('openDialog', item)">
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
              link>
              <el-icon><ShoppingCart /></el-icon>
              <span class="current-price">{{ item.price }}</span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-pagination
    v-model:currentPage="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    :total="pagination.total"
    :page-sizes="[10, 20, 40, 60]"
    large
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="emit('onSearch', pagination)"
    @current-change="emit('onSearch', pagination)" />
</template>

<script setup>
  import { usePagination } from '@/utils/hooks'
  import { onMounted } from 'vue'

  defineProps({
    tableData: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['onSearch', 'openDialog'])

  const { pagination } = usePagination()
  // pagination.pageSize = 50

  onMounted(async () => {
    emit('onSearch', pagination)
  })

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
