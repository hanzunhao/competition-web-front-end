<template>
    <!-- 页面一 -->
    <MainLayout>
        <el-row :gutter="20" v-for="(row, rowIndex) in greenhouseRows" :key="rowIndex">
            <el-col :span="6" v-for="greenhouseId in row" :key="greenhouseId">
                <div class="greenhouse" :id="greenhouseId">
                    <GreenhouseCard @dblclick="detailHandle(greenhouseId)"
                        :class="{ 'pest-warning': hasPestWarning(greenhouseId) }">
                        <template #id>{{ greenhouseId + 1 }}</template>
                        <template #flower>{{ greenhouseStroe.list[greenhouseId]?.flowerName }}</template>
                        <template #temperature>{{ greenhouseStroe.list[greenhouseId]?.airTemperature }}℃</template>
                        <template #wetness>{{ greenhouseStroe.list[greenhouseId]?.airHumidity }}%</template>
                        <template #pest>{{ hasPestWarning(greenhouseId) ? '有' : '无' }}</template>
                    </GreenhouseCard>
                </div>
            </el-col>
        </el-row>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layout/MainLayout.vue';
import GreenhouseCard from '../components/GreenhouseCard.vue';
import router from '../router';
import { GreenHouseStore } from '../stores/GreenHouseStore';
import { onMounted } from 'vue';
import { VisibleStore } from '../stores/VisibleStore';
import { JwtStore } from '../stores/jwtStore';


// 定义一个二维数组，表示每行的温室ID
const greenhouseRows = [
    [0, 1, 2, 3],
    [4, 5, 6, 7]
];

const greenhouseStroe = GreenHouseStore();

const visibleStore = VisibleStore()

const jwtStore = JwtStore();


// 确保数据在组件挂载时加载
onMounted(() => {
    if (!jwtStore.jwt) {
        router.push({ name: 'Login' })
    } else {
        visibleStore.greenhouseId = null;
        greenhouseStroe.fetchGreenHouseForms();
    }
});

// 从卡片跳转到大棚详情页面
const detailHandle = (id) => {
    visibleStore.greenhouseId = id
    router.push({ name: 'GreenHouseDetail' });
};

const hasPestWarning = function (id) {
    const hasPest = greenhouseStroe.list[id]?.pestName !== '无'
    return hasPest;
};
</script>

<style scoped>
.el-row {
    height: 43%;
    margin-bottom: 30px;
    margin-top: 30px;
}

.greenhouse,
.el-card {
    height: 100%;
}

.pest-warning {
    border: 2px solid red;
    /* 红色边框 */
    background-color: #ffdddd;
    /* 轻微的红色背景 */
    box-shadow: 0 4px 8px rgba(255, 0, 0, 0.3);
    /* 红色阴影 */
}
</style>
