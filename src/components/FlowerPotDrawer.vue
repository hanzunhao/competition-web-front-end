<template>
    <el-drawer v-model="visibleStore.flowerPotDrawerVisible" direction="rtl" size="51%" :before-close="handleClose">
        <template #header>
            <div class="custom-header">花盆具体数据</div>
        </template>

        <div class="button-content">
            <el-button v-if="visibleStore.selectOrPrimaryButtonVisible" type="primary"
                @click="selectClickHandler">选择花盆</el-button>
            <el-button v-else type="primary" @click="primaryClickHandler">确认搬运</el-button>
            <el-button v-if="visibleStore.cancelButtonVisible" type="plain" @click="cancelClickHandler">取消搬运</el-button>
        </div>

        <div v-if="flowerPotStore.list" class="drawer-content" v-infinite-scroll="loadMore">
            <el-row :gutter="10" v-for="(row, rowIndex) in potRows" :key="rowIndex" class="pot-row">
                <el-col :span="6" v-for="potId in row" :key="potId" class="pot-col">
                    <div class="pot" :id="potId">
                        <FlowerPot :id="flowerPotStore.list[potId]?.id">
                            <template #id>{{ flowerPotStore.list[potId]?.id }}</template>
                            <template #soilTemperature>{{ flowerPotStore.list[potId]?.soilTemperature }}℃</template>
                            <template #soilHumidity>{{ flowerPotStore.list[potId]?.soilHumidity }}%</template>
                            <template #pestName>{{ flowerPotStore.list[potId]?.pestName }}</template>
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
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { VisibleStore } from '../stores/VisibleStore';
import { FlowerPotStore } from '../stores/FlowerPotStore';
import { Loading } from '@element-plus/icons-vue';
import { LogStore } from '../stores/LogStore';

const visibleStore = VisibleStore();
const flowerPotStore = FlowerPotStore();
const logStore = LogStore();

const potNum = ref(0);
const potRows = ref([]);
const loading = ref(false);
const noMore = ref(false);
const pageSize = 8;

const selectClickHandler = () => {
    visibleStore.showFlowerPotHeader = true;
    visibleStore.cancelButtonVisible = true;
    visibleStore.selectOrPrimaryButtonVisible = false;
}

const primaryClickHandler = async () => {
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelButtonVisible = false;
    visibleStore.selectOrPrimaryButtonVisible = true;

    // await logStore.insertLog('搬运花盆', false);

    await flowerPotStore.deleteSelectedFlowerPots(visibleStore.greenhouseId+1);
    flowerPotStore.clearTransportedIdList();
    await fetchFlowerPotData();

    // await logStore.insertLog('搬运花盆', true);
}

const cancelClickHandler = () => {
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelButtonVisible = false;
    visibleStore.selectOrPrimaryButtonVisible = true;

    flowerPotStore.clearTransportedIdList();
}

watch(
    () => visibleStore.flowerPotDrawerVisible,
    (newVal) => {
        if (newVal) {
            fetchFlowerPotData();
        } else {
            potRows.value = [];
            noMore.value = false;
            visibleStore.showFlowerPotHeader = false;
            visibleStore.cancelButtonVisible = false;
            visibleStore.selectOrPrimaryButtonVisible = true;
            flowerPotStore.clearTransportedIdList();
        }
    }
);

onMounted(() => {
    if (visibleStore.flowerPotDrawerVisible) fetchFlowerPotData();
});

const handleClose = () => {
    visibleStore.flowerPotDrawerVisible = false;
    potRows.value = [];
    noMore.value = false;
};

const fetchFlowerPotData = async () => {
    await flowerPotStore.getFlowerPotByGreenHouseId(visibleStore.greenhouseId + 1);
    const flowerPots = flowerPotStore.list;
    potNum.value = flowerPots.length;

    const filteredPotIds = [];
    for (let i = 0; i < potNum.value; i++) {
        if (flowerPots[i]?.haveFlower) {
            filteredPotIds.push(i);
        }
    }

    const rows = [];
    for (let i = 0; i < filteredPotIds.length; i += 4) {
        const row = [];
        for (let j = 0; j < 4 && i + j < filteredPotIds.length; j++) {
            row.push(filteredPotIds[i + j]);
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
        const flowerPots = flowerPotStore.list;
        const filteredPotIds = Object.keys(flowerPots).filter(id => flowerPots[id]?.haveFlower);

        for (let i = startIndex; i < startIndex + pageSize && i < filteredPotIds.length; i += 4) {
            const row = [];
            for (let j = 0; j < 4 && i + j < filteredPotIds.length; j++) {
                row.push(filteredPotIds[i + j]);
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

onUnmounted(() => {
    visibleStore.flowerPotDrawerVisible = false;
})
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

.button-content {
    margin: 1%;
    height: 11%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    justify-content: left;
}
</style>