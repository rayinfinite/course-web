<template>
  <vue-office-excel
    :src="docx"
    style="height: 100vh"
    @rendered="rendered" />
</template>

<script setup>
  //引入VueOfficeExcel组件
  import VueOfficeExcel from '@vue-office/excel'
  //引入相关样式
  import '@vue-office/excel/lib/index.css'

  const { docx } = defineProps({
    docx: {
      type: String,
      required: true
    }
  })
  const rendered = () => {
    console.log('rendered')
  }
</script>
