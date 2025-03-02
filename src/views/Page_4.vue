<template>
    <!-- 页面四 -->
    <MainLayout>
      <el-row :gutter="20">
        <!-- 第一行 -->
        <el-col :span="12">
          <FlowerPriceChart title="花卉价格走向图 1" :seriesData="[120, 200, 150, 80, 70, 110, 130]" />
        </el-col>
        <el-col :span="12">
          <FlowerPriceChart title="花卉价格走向图 2" :seriesData="[90, 150, 200, 100, 80, 120, 140]" />
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <!-- 第二行 -->
        <el-col :span="12">
          <FlowerPriceChart title="花卉价格走向图 3" :seriesData="[110, 180, 130, 90, 60, 100, 120]" />
        </el-col>
        <el-col :span="12">
          <FlowerPriceChart title="花卉价格走向图 4" :seriesData="[130, 170, 140, 110, 90, 130, 150]" />
        </el-col>
      </el-row>
    </MainLayout>
  </template>
  
  <script setup>
  import MainLayout from '../layout/MainLayout.vue';
  import FlowerPriceChart from '../components/FlowerPriceChart.vue';
  </script>
  
  <style scoped>
  /* 可以根据需要调整样式 */
  </style>