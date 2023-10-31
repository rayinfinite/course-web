<template>
  <el-menu
    router
    :default-active="route.path"
    :ellipsis="false"
    class="menu">
    <el-sub-menu index="5">
      <template #title>
        <el-icon>
          <img
            src="@/assets/image/layout-logo/icon_list.png"
            alt="" />
        </el-icon>
        <span>course model</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/consumer/courseModule/home">home</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/consumer/courseModule/taken">taken</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/consumer/courseModule/course">course</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/consumer/courseModule/order">order</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<style lang="scss" scoped>
  .menu {
    width: 200px;
    min-width: 200px;
    height: 100%;
    transition: all 1s;
    -webkit-transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 0.5s;
  }
</style>
