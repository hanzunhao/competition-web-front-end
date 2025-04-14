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
            <div class="video-container">
                <video ref="videoElement" autoplay playsinline class="video-element"
                    :style="{ display: isCameraActive ? 'block' : 'none' }">
                </video>
                <div v-if="!isCameraActive" class="camera-placeholder">
                    <el-icon :size="40">
                        <VideoCamera />
                    </el-icon>
                    <p>摄像头未激活</p>
                </div>

                <div class="camera-controls">
                    <el-button type="primary" @click="startCamera" :disabled="isCameraActive" class="control-button">
                        <el-icon>
                            <VideoCamera />
                        </el-icon> 开启摄像头
                    </el-button>
                    <el-button type="danger" @click="stopCamera" :disabled="!isCameraActive" class="control-button">
                        <el-icon>
                            <SwitchButton />
                        </el-icon> 关闭摄像头
                    </el-button>
                </div>
            </div>
        </template>
        <template v-slot:data-tables>
            <div style="height: 100%; display: flex; flex-direction: column;">
                <el-row :gutter="20" class="chart-row">
                    <el-col :span="12">
                        <div class="chart-container">
                            <airTemperatureChart />
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
const isCameraActive = ref(false);
let mediaStream = null;
let intervalId = null;

const back = () => {
    router.push({ name: 'Page_1' });
};

const startCamera = async () => {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 1280,
                height: 720
            }
        });
        videoElement.value.srcObject = mediaStream;
        isCameraActive.value = true;
    } catch (error) {
        ElMessage.error(`摄像头访问失败: ${error.message}`);
    }
};

const stopCamera = () => {
    mediaStream?.getTracks().forEach(track => track.stop());
    videoElement.value.srcObject = null;
    isCameraActive.value = false;
};

onMounted(async () => {
    await greenHouseStore.getAllGreenHouse();
    intervalId = setInterval(async () => {
        await greenHouseStore.getAllGreenHouse();
        await flowerPotStore.getFlowerPotByGreenHouseId(visibleStore.greenhouseId + 1);
    }, 10000);
});

onUnmounted(() => {
    stopCamera();

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

.video-container {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 12px;
}

.video-element {
    width: 100%;
    max-height: calc(100% - 60px);
    /* 保留控制按钮空间 */
    object-fit: contain;
    /* 保持视频比例 */
    border-radius: 6px;
    background: #000;
}

.camera-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-secondary);
    height: 200px;
    width: 100%;
    background: var(--el-fill-color-light);
    border-radius: 6px;
}

.camera-controls {
    display: flex;
    justify-content: center;
    gap: 24px;
    /* 增大按钮间距 */
    width: 100%;
    padding: 8px 0;
}

.control-button {
    flex: 0 0 160px;
    /* 固定按钮宽度 */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
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