<template>
  <MainLayout>
    <div class="layout-container" style="height: 40%;">
      <el-scrollbar class="scroll-container">
        <div class="grid">
          <div v-for="(chart, index) in chartsData" :key="index" class="card">
            <FlowerPriceChart :title="`花卉价格走向图 ${index + 1}`" :seriesData="chart.data" :loading="loading" />
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="layout-container" style="height: 60%;">
      <el-scrollbar class="scroll-container">
        <div v-if="storeStore.list?.length" class="grid">
          <StoreCard v-for="store in storeStore.list" :key="store.id" :store-id="store.id" />
        </div>
        <div v-else class="flex">
          <el-empty description="暂无仓库数据" />
        </div>
      </el-scrollbar>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../layout/MainLayout.vue';
import FlowerPriceChart from '../components/FlowerPriceChart.vue';
import { StoreStore } from '../stores/StoreStore';

const storeStore = StoreStore();
const chartsData = ref([]);


onMounted(async () => {
  // 模拟数据加载
  chartsData.value = [
    { data: [120, 200, 150, 80, 70, 110, 130] },
    { data: [90, 150, 200, 100, 80, 120, 140] },
    { data: [110, 180, 130, 90, 60, 100, 120] },
    { data: [130, 170, 140, 110, 90, 130, 150] },
    { data: [110, 180, 130, 90, 60, 100, 120] },
    { data: [130, 170, 140, 110, 90, 130, 150] },
    { data: [110, 180, 130, 90, 60, 100, 120] },
    { data: [130, 170, 140, 110, 90, 130, 150] }
  ];

  await storeStore.getAllStore();
});
</script>

<style scoped>
/* 基础布局容器 - 现在包含视觉样式 */
.layout-container {
  height: 47%;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s ease;
  background-color: rgb(243, 237, 237);
}

.layout-container:hover {
  box-shadow: var(--el-box-shadow);
  transform: translateY(-2px);
}

/* 图表滚动区域 */
.scroll-container {
  height: calc(100% - 20px);
}

/* 图表网格系统 */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* 单个图表项 - 现在只保留必要样式 */
.card {
  padding: 15px;
  background-color: var(--el-bg-color);
}

/* 空状态flex样式 */
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
}
</style>