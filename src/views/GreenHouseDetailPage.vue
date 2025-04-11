<template>
    <GreenHouseDetailLayout>
        <template v-slot:back-button>
            <el-button type="primary" @click="back">
                <el-icon>
                    <Back />
                </el-icon>
            </el-button>
        </template>
        <template v-slot:data-card>
            <div class="card-container">
                <el-card class="data-card"
                    v-for="(greenhouseData, index) in greenHouseStore.list[visibleStore.greenhouseId]" :key="index"
                    shadow="hover">
                    <div class="card-content">
                        <div class="key">{{ greenHouseStore.getChineseKey(index) }}</div>
                        <span class="value">{{ greenhouseData }}</span>
                        <span class="unit">{{ greenHouseStore.getUnit(index) }}</span>
                    </div>
                </el-card>
            </div>
        </template>
        <template v-slot:greenhouse-map>
            <GreenHouseMap />
        </template>
        <template v-slot:device-video>
            <img ref="videoElement" src="" alt="Video Stream" style="height: 100%; width: 100%; margin: 1%;" />
        </template>
        <template v-slot:data-tables>
            <div style="height: 100%; display: flex; flex-direction: column;">
                <el-row :gutter="20" class="chart-row">
                    <el-col :span="12">
                        <div class="chart-container">
                            <airTemperatureChart/>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chart-container">
                            <airHumidityChart />
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20" class="chart-row">
                    <el-col :span="12">
                        <div class="chart-container">
                            <meanSoilTemperatureChart />
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chart-container">
                            <meanSoilHumidityChart />
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20" class="chart-row">
                    <el-col :span="12">
                        <div class="chart-container">
                            <illuminationChart />
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chart-container">
                            <environmentRadarChart />
                        </div>
                    </el-col>
                </el-row>
            </div>
        </template>
    </GreenHouseDetailLayout>
</template>

<script setup>
import api from '../api';
import { ref, onMounted, onUnmounted } from 'vue';
import router from '../router';
import GreenHouseDetailLayout from '../layout/GreenHouseDetailLayout.vue';
import GreenHouseMap from '../components/GreenHouseMap.vue';
import { GreenHouseStore } from '../stores/GreenHouseStore';
import { VisibleStore } from '../stores/VisibleStore';
import { FlowerPotStore } from '../stores/FlowerPotStore';
import IlluminationChart from '../components/IlluminationChart.vue';
import AirTemperatureChart from '../components/AirTemperatureChart.vue';
import AirHumidityChart from '../components/AirHumidityChart.vue';
import MeanSoilTemperatureChart from '../components/MeanSoilTemperatureChart.vue';
import MeanSoilHumidityChart from '../components/MeanSoilHumidityChart.vue';
import EnvironmentRadarChart from '../components/EnvironmentRadarChart.vue';

const greenHouseStore = GreenHouseStore();
const visibleStore = VisibleStore();
const flowerPotStore = FlowerPotStore();
const videoElement = ref(null);
let socket = null;
let intervalId = null;

const back = () => {
    router.push({ name: 'Page_1' });
};

const handleVideoMessage = (event) => {
    if (videoElement.value) {
        const blob = new Blob([event.data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        videoElement.value.src = url;
    }
};

onMounted(async () => {
    await greenHouseStore.getAllGreenHouse();

    intervalId = setInterval(async () => {
        await greenHouseStore.getAllGreenHouse();
        await flowerPotStore.getFlowerPotByGreenHouseId(visibleStore.greenhouseId + 1);
    }, 100000);

    socket = api.VideoStreamAPI.createVideoStreamSocket(handleVideoMessage);
});

onUnmounted(() => {
    if (socket) {
        socket.close();
    }

    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<style scoped>
/* 基础容器样式 */
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 4px;
  height: 100%;
}

/* 数据卡片样式优化 */
.data-card {
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --card-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;
  padding: 0;
  overflow: hidden;
}

.data-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  min-height: 70px;
}

.key {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--el-text-color-secondary);
  margin-bottom: 4px;
}

.value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--el-color-primary);
}

.unit {
  font-size: 0.6rem;
  color: var(--el-text-color-placeholder);
  margin-top: 2px;
}

/* 视频流样式 */
.video-stream {
  height: 100%;
  width: 98%;
  margin: 1%;
  object-fit: contain;
  background-color: #000;
}

/* 图表系统整体布局优化 */
.chart-row {
  margin: 0;
  height: 33.33%;
  flex: 1;
}

/* 图表容器增强 */
.chart-container {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 6px;
}
</style>