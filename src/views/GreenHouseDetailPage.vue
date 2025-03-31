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
                <el-row style="flex: 1;">
                    <el-col :span="12">
                        <Chart_1 />
                    </el-col>
                    <el-col :span="12">
                        <Chart_2 />
                    </el-col>
                </el-row>
                <el-row style="flex: 1;">
                    <el-col :span="12">
                        <Chart_3 />
                    </el-col>
                    <el-col :span="12">
                        <Chart_4 />
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
import Chart_1 from '../components/Chart_1.vue';
import Chart_2 from '../components/Chart_2.vue';
import Chart_3 from '../components/Chart_3.vue';
import Chart_4 from '../components/Chart_4.vue';

const greenHouseStore = GreenHouseStore();
const visibleStore = VisibleStore();
const flowerPotStore = FlowerPotStore();
const videoElement = ref(null);
let socket = null;
let intervalId = null;

const back = () => {
    router.push({ name: 'Home' });
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
    }, 10000);

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
.card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 4px;
    height: 100%;
}

.data-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: #fff;
    padding: 10px;
}

.data-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.key {
    font-size: 16px;
    font-weight: 800;
    color: #606266;
    margin-bottom: 8px;
}

.value {
    font-size: 20px;
    font-weight: 600;
    color: #409EFF;
}

.unit {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
}
</style>