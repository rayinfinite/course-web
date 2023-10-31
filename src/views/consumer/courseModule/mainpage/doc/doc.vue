<template>
  <vue-office-docx
    :src="docx"
    style="height: 100vh"
    @rendered="rendered" />
</template>

<script setup>
  //引入VueOfficeDocx组件
  import VueOfficeDocx from '@vue-office/docx'
  //引入相关样式
  import '@vue-office/docx/lib/index.css'

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
