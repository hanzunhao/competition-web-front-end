<template>
  <!-- 
        通用布局组件
        该组件包含侧边栏、头部和主内容区域，提供基本的布局框架。
        组件结构：
        - 侧边栏（Aside）：展示侧边导航
        - 头部（Header）：展示页面顶部导航或信息
        - 主内容区（Main）：通过插槽插入具体内容

        功能说明：
        - 使用 `<slot></slot>` 作为主内容区域的占位符，外部传入的内容将被渲染到该位置
    -->
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
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
.el-container{
  height: 100%;
}

.main{
  background-color: rgb(231, 249, 247);
}

.header{
  background: linear-gradient(0.25turn, #e7f9f7, #a4e5e2, #3db8b6, #009e9e, #007b80);
}
</style>