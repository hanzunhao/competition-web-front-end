<template>
    <el-drawer v-model="visibleStore.flowerPotDrawerVisible" direction="rtl" size="51%" :before-close="handleClose">
        <template #header>
            <div class="custom-header">花盆具体数据</div>
        </template>
        <div v-if="flowerPotStore.list[visibleStore.greenhouseId]" class="drawer-content" v-infinite-scroll="loadMore">
            <el-row :gutter="10" v-for="(row, rowIndex) in potRows" :key="rowIndex" class="pot-row">
                <el-col :span="6" v-for="potId in row" :key="potId" class="pot-col">
                    <div class="pot" :id="potId">
                        <FlowerPot>
                            <template #id>{{ flowerPotStore.list[visibleStore.greenhouseId][potId]?.id }}</template>
                            <template #soilTemperature>{{
                                flowerPotStore.list[visibleStore.greenhouseId][potId]?.soilTemperature }}℃
                            </template>
                            <template #soilHumidity>{{
                                flowerPotStore.list[visibleStore.greenhouseId][potId]?.soilHumidity }}%
                            </template>
                        </FlowerPot>
                    </div>
                </el-col>
            </el-row>
            <div v-if="loading" class="loading-spinner">
                <el-icon class="is-loading">
                    <Loading />
                </el-icon>
                加载中...
            </div>
            <div v-if="noMore" class="no-more">没有更多数据了</div>
        </div>
        <div v-else class="loading-message">数据加载中...</div>
    </el-drawer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { VisibleStore } from '../stores/VisibleStore';
import { FlowerPotStore } from '../stores/FlowerPotStore';
import { Loading } from '@element-plus/icons-vue';

const visibleStore = VisibleStore();
const flowerPotStore = FlowerPotStore();

const potNum = ref(0);
const potRows = ref([]);
const loading = ref(false);
const noMore = ref(false);
const pageSize = 8;

watch(
    () => visibleStore.flowerPotDrawerVisible,
    (newVal) => {
        if (newVal) fetchFlowerPotData();
    }
);

onMounted(() => {
    if (visibleStore.flowerPotDrawerVisible) fetchFlowerPotData();
});

const handleClose = () => {
    visibleStore.flowerPotDrawerVisible = false;
};

const fetchFlowerPotData = async () => {
    await flowerPotStore.fetchFlowerPotForms();
    potNum.value = flowerPotStore.list[visibleStore.greenhouseId].length;
    const rows = [];
    for (let i = 0; i < potNum.value; i += 4) {
        const row = [];
        for (let j = 0; j < 4 && i + j < potNum.value; j++) {
            row.push(i + j);
        }
        rows.push(row);
    }
    potRows.value = rows;
};

const loadMore = async () => {
    if (loading.value || noMore.value) return;
    loading.value = true;
    setTimeout(() => {
        const newRows = [];
        const startIndex = potRows.value.length * 4;
        for (let i = startIndex; i < startIndex + pageSize && i < potNum.value; i += 4) {
            const row = [];
            for (let j = 0; j < 4 && i + j < potNum.value; j++) {
                row.push(i + j);
            }
            newRows.push(row);
        }
        if (newRows.length > 0) {
            potRows.value.push(...newRows);
        } else {
            noMore.value = true;
        }
        loading.value = false;
    }, 1000);
};
</script>

<style scoped>
.drawer-content {
    height: 88%;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 8px;
    overflow-y: auto;
}

.pot-row {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
}

.pot-col {
    display: flex;
    align-items: center;
    justify-content: center;
}

.pot {
    width: 100%;
    height: 100%;
    padding: 10px;
    text-align: center;
}

.loading-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90%;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 16px;
    color: #666;
}

.loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 14px;
    color: #666;
}

.no-more {
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: #666;
}

.custom-header {
    height: 8px;
    padding: 1px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
}
</style>