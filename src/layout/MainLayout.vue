<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside" width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header></Header>
        </el-header>
        <hr>
        <el-main class="main">
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';
</script>

<style scoped>
.common-layout,
.el-container {
  height: 100%;
}
.aside {
    border-right: 1px solid #dcdfe6; 
}
</style>