<template>
  <vue-office-pdf
    :src="docx"
    style="height: 100vh"
    @rendered="rendered" />
</template>

<script setup>
  //引入VueOfficePdf组件
  import VueOfficePdf from '@vue-office/pdf'

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
