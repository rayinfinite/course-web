<template>
  <el-menu
    router
    :default-active="route.path"
    :ellipsis="false"
    class="menu">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <img
            src="@/assets/image/layout-logo/icon_equipment.png"
            alt="" />
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/system/roleList">角色管理 </el-menu-item>
        <el-menu-item index="/admin/system/userInfoManage">用户管理 </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon>
          <img
            src="@/assets/image/layout-logo/icon_list.png"
            alt="" />
        </el-icon>
        <span>课程模块</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/moneyModule/moneyManage">课程管理</el-menu-item>
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
