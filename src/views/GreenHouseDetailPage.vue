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
            温室地图
        </template>
        <template v-slot:device-video>
            <img ref="videoElement" src="" alt="Video Stream" style="height: 100%;width: 100%; margin: 1%;" />
        </template>
        <template v-slot:data-tables>
            图表区域
        </template>
    </GreenHouseDetailLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import router from '../router';
import GreenHouseDetailLayout from '../layout/GreenHouseDetailLayout.vue';
import { GreenHouseStore } from '../stores/GreenHouseStore';
import { VisibleStore } from '../stores/VisibleStore';

const greenHouseStore = GreenHouseStore()

const visibleStore = VisibleStore()

const tempId = visibleStore.greenhouseId

// 返回按钮逻辑
const back = () => {
    router.push({ name: 'Home' });
};

// 视频元素引用
const videoElement = ref(null);

// WebSocket 连接逻辑
let socket = null;

onMounted(() => {
    console.log("greenhouseid=" + visibleStore.greenhouseId)

    // 获取温室数据
    greenHouseStore.fetchGreenHouseForms()


    console.log('Video element:', videoElement.value);
    // 初始化 WebSocket 连接
    socket = new WebSocket('ws://localhost:8080/video-stream');
    socket.binaryType = 'arraybuffer';

    socket.onmessage = (event) => {
        if (videoElement.value) {
            const blob = new Blob([event.data], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            videoElement.value.src = url;
        }
    };

    socket.onopen = () => {
        console.log('WebSocket connection established.');
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed.');
    };
});

onUnmounted(() => {
    // 组件卸载时关闭 WebSocket 连接
    if (socket) {
        socket.close();
    }
    visibleStore.greenhouseId = tempId
});
</script>

<style scoped>
/* 卡片容器 */
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列布局 */
  gap: 12px; /* 卡片之间的间距 */
  padding: 4px; /* 容器内边距 */
  height: 100%;
}

/* 卡片样式 */
.data-card {
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 更柔和的阴影 */
  transition: transform 0.2s, box-shadow 0.2s; /* 添加悬停动画 */
  background-color: #fff; /* 背景色 */
  padding: 10px; /* 内边距 */
}

/* 卡片悬停效果 */
.data-card:hover {
  transform: translateY(-4px); /* 悬停时轻微上移 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 悬停时阴影加深 */
}

/* 卡片内容布局 */
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中对齐 */
  justify-content: center; /* 垂直居中 */
}

/* 键名样式 */
.key {
  font-size: 16px;
  font-weight: 800; /* 中等粗细 */
  color: #606266; /* Element UI 辅助色 */
  margin-bottom: 8px; /* 与值的间距 */
}

/* 值样式 */
.value {
  font-size: 20px;
  font-weight: 600; /* 加粗 */
  color: #409EFF; /* Element UI 主题色 */
}

/* 单位样式 */
.unit {
  font-size: 12px;
  color: #909399; /* Element UI 辅助色 */
  margin-top: 4px; /* 与值的间距 */
}
</style>