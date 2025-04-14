<template>
    <el-drawer v-model="visibleStore.flowerPotDrawerVisible" direction="rtl" size="51%" :before-close="handleClose">
        <template #header>
            <div class="custom-header">花盆具体数据</div>
        </template>
        <div class="button-group-container">
            <div class="button-content"
                v-if="(visibleStore.selectOrPrimaryMoveButtonVisible ^ visibleStore.selectOrPrimaryWaterButtonVisible ^ visibleStore.selectOrPrimaryUpdateButtonVisible)">
                <el-button v-if="visibleStore.selectOrPrimaryDetectButtonVisible" type="danger"
                    @click="selectDetectClickHandler">识别</el-button>
                <el-button v-else type="primary" @click="primaryDetectClickHandler">确认</el-button>
                <el-button v-if="visibleStore.cancelDetectButtonVisible" type="plain"
                    @click="cancelDetectClickHandler">取消</el-button>
            </div>

            <div class="button-content"
                v-if="(visibleStore.selectOrPrimaryMoveButtonVisible ^ visibleStore.selectOrPrimaryWaterButtonVisible ^ visibleStore.selectOrPrimaryDetectButtonVisible)">
                <el-button v-if="visibleStore.selectOrPrimaryUpdateButtonVisible" type="success"
                    @click="selectUpdateClickHandler">更新</el-button>
                <el-button v-else type="primary" @click="primaryUpdateClickHandler">确认</el-button>
                <el-button v-if="visibleStore.cancelUpdateButtonVisible" type="plain"
                    @click="cancelUpdateClickHandler">取消</el-button>
            </div>

            <div class="button-content"
                v-if="(visibleStore.selectOrPrimaryMoveButtonVisible ^ visibleStore.selectOrPrimaryUpdateButtonVisible ^ visibleStore.selectOrPrimaryDetectButtonVisible)">
                <el-button v-if="visibleStore.selectOrPrimaryWaterButtonVisible" type="primary"
                    @click="selectWaterClickHandler">浇水</el-button>
                <el-button v-else type="primary" @click="primaryWaterClickHandler">确认</el-button>
                <el-button v-if="visibleStore.cancelWaterButtonVisible" type="plain"
                    @click="cancelWaterClickHandler">取消</el-button>
            </div>

            <div class="button-content"
                v-if="(visibleStore.selectOrPrimaryWaterButtonVisible ^ visibleStore.selectOrPrimaryUpdateButtonVisible ^ visibleStore.selectOrPrimaryDetectButtonVisible)">
                <el-button v-if="visibleStore.selectOrPrimaryMoveButtonVisible" type="warning"
                    @click="selectMoveClickHandler">搬出</el-button>
                <el-button v-else type="primary" @click="primaryMoveClickHandler">确认</el-button>
                <el-button v-if="visibleStore.cancelMoveButtonVisible" type="plain"
                    @click="cancelMoveClickHandler">取消</el-button>
            </div>
        </div>

        <div v-if="flowerPotStore.list" class="drawer-content" v-infinite-scroll="loadMore">
            <el-row :gutter="10" v-for="(row, rowIndex) in potRows" :key="rowIndex" class="pot-row">
                <el-col :span="6" v-for="potId in row" :key="potId" class="pot-col">
                    <div class="pot" :id="potId">
                        <FlowerPot :id="flowerPotStore.list[potId]?.id">
                            <template #id>{{ potId + 1 }}</template>
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
import api from '../api';
import { GreenHouseStore } from '../stores/GreenHouseStore';

const visibleStore = VisibleStore();
const flowerPotStore = FlowerPotStore();
const logStore = LogStore();
const greenHouseStore = GreenHouseStore();

const potNum = ref(0);
const potRows = ref([]);
const loading = ref(false);
const noMore = ref(false);
const pageSize = 8;

const selectMoveClickHandler = () => {
    visibleStore.showFlowerPotHeader = true;
    visibleStore.cancelMoveButtonVisible = true;
    visibleStore.selectOrPrimaryMoveButtonVisible = false;
}

const selectWaterClickHandler = () => {
    visibleStore.showFlowerPotHeader = true;
    visibleStore.cancelWaterButtonVisible = true;
    visibleStore.selectOrPrimaryWaterButtonVisible = false;
}

const selectUpdateClickHandler = () => {
    visibleStore.showFlowerPotHeader = true;
    visibleStore.cancelUpdateButtonVisible = true;
    visibleStore.selectOrPrimaryUpdateButtonVisible = false;
}

const selectDetectClickHandler = () => {
    visibleStore.showFlowerPotHeader = true;
    visibleStore.cancelDetectButtonVisible = true;
    visibleStore.selectOrPrimaryDetectButtonVisible = false;
}

const primaryMoveClickHandler = async () => {
    // 控制组件可见性
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelMoveButtonVisible = false;
    visibleStore.selectOrPrimaryMoveButtonVisible = true;

    if (!flowerPotStore.movePotIdList || flowerPotStore.movePotIdList.length === 0) {
        ElMessage.warning("没有选中任何花盆！");
        return;
    }

    // 获取任务id
    const taskId = await api.TaskAPI.selectTaskIdByName("move");

    // 生成任务开始日志
    await logStore.insertLog('搬出花盆', false, taskId);

    // 获取搬运花卉的信息
    const name = greenHouseStore.list[visibleStore.greenhouseId]?.flowerName;
    const number = flowerPotStore.movePotIdList.length;
    const storeId = greenHouseStore.list[visibleStore.greenhouseId]?.storeId;


    // 删除地图上要搬运的花盆组件
    // await flowerPotStore.deleteSelectedFlowerPots(visibleStore.greenhouseId + 1);

    // 向数据库插入花卉实例使仓库新增被搬运的花卉
    await api.FlowerAPI.insertFlower(name, number, storeId);

    // 执行任务
    await api.RaspberryPiAPI.move(flowerPotStore.movePotIdList);

    // 清空要搬运的花盆的id列表
    flowerPotStore.clearMovePotIdList();

    // 重新获取数据以刷新地图
    await fetchFlowerPotData();

    // 生成任务完成日志
    // await logStore.insertLog('搬出花盆', true, taskId);
}

const primaryWaterClickHandler = async () => {
    // 控制组件可见性
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelWaterButtonVisible = false;
    visibleStore.selectOrPrimaryWaterButtonVisible = true;

    if (!flowerPotStore.waterPotIdList || flowerPotStore.waterPotIdList.length === 0) {
        ElMessage.warning("没有选中任何花盆！");
        return;
    }


    // 获取任务id
    const taskId = await api.TaskAPI.selectTaskIdByName("water");

    // 生成任务开始日志
    await logStore.insertLog('给花盆浇水', false, taskId);

    // 执行任务
    await api.RaspberryPiAPI.water(flowerPotStore.waterPotIdList);

    // 清空要浇水的的花盆的id列表
    flowerPotStore.clearWaterPotIdList();

    // 生成任务完成日志
    // await logStore.insertLog('给花盆浇水', true, taskId);
}

const primaryUpdateClickHandler = async () => {
    // 控制组件可见性
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelUpdateButtonVisible = false;
    visibleStore.selectOrPrimaryUpdateButtonVisible = true;

    if (!flowerPotStore.updatePotIdList || flowerPotStore.updatePotIdList.length === 0) {
        ElMessage.warning("没有选中任何花盆！");
        return;
    }

    // 获取任务id
    const taskId = await api.TaskAPI.selectTaskIdByName("update");

    // 生成任务开始日志
    await logStore.insertLog('更新花盆土壤温湿度', false, taskId);

    // 执行任务
    await api.RaspberryPiAPI.update(flowerPotStore.updatePotIdList);

    // 清空要更新的的花盆的id列表
    flowerPotStore.clearUpdatePotIdList();

    // 生成任务完成日志
    // await logStore.insertLog('给花盆浇水', true, taskId);
}

const primaryDetectClickHandler = async () => {
    // 控制组件可见性
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelDetectButtonVisible = false;
    visibleStore.selectOrPrimaryDetectButtonVisible = true;

    if (!flowerPotStore.detectPotIdList || flowerPotStore.detectPotIdList.length === 0) {
        ElMessage.warning("没有选中任何花盆！");
        return;
    }

    // 获取任务id
    const taskId = await api.TaskAPI.selectTaskIdByName("detect");

    // 生成任务开始日志
    await logStore.insertLog('更新花盆土壤温湿度', false, taskId);

    // 执行任务
    await api.RaspberryPiAPI.detect(flowerPotStore.detectPotIdList);

    // 清空要更新的的花盆的id列表
    flowerPotStore.clearDetectPotIdList();

    // 生成任务完成日志
    // await logStore.insertLog('给花盆浇水', true, taskId);
}

const cancelMoveClickHandler = () => {
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelMoveButtonVisible = false;
    visibleStore.selectOrPrimaryMoveButtonVisible = true;

    flowerPotStore.clearMovePotIdList();
}


const cancelWaterClickHandler = () => {
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelWaterButtonVisible = false;
    visibleStore.selectOrPrimaryWaterButtonVisible = true;

    flowerPotStore.clearWaterPotIdList();
}

const cancelUpdateClickHandler = () => {
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelUpdateButtonVisible = false;
    visibleStore.selectOrPrimaryUpdateButtonVisible = true;

    flowerPotStore.clearUpdatePotIdList();
}

const cancelDetectClickHandler = () => {
    visibleStore.showFlowerPotHeader = false;
    visibleStore.cancelDetectButtonVisible = false;
    visibleStore.selectOrPrimaryDetectButtonVisible = true;

    flowerPotStore.clearDetectPotIdList();
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
            visibleStore.selectOrPrimaryMoveButtonVisible = true;
            visibleStore.cancelMoveButtonVisible = false;
            visibleStore.selectOrPrimaryWaterButtonVisible = true;
            visibleStore.cancelWaterButtonVisible = false;
            visibleStore.selectOrPrimaryUpdateButtonVisible = true;
            visibleStore.cancelUpdateButtonVisible = false;
            visibleStore.selectOrPrimaryDetectButtonVisible = true;
            visibleStore.cancelDetectButtonVisible = false;
            flowerPotStore.clearMovePotIdList();
            flowerPotStore.clearWaterPotIdList();
            flowerPotStore.clearUpdatePotIdList();
            flowerPotStore.clearDetectPotIdList();
        }
    }
);

onMounted(() => {
    if (visibleStore.flowerPotDrawerVisible) fetchFlowerPotData();
    // console.log("selectOrPrimaryMoveButtonVisible:", visibleStore.selectOrPrimaryMoveButtonVisible);
    // console.log("cancelMoveButtonVisible:", visibleStore.cancelMoveButtonVisible);
    // console.log("selectOrPrimaryWaterButtonVisible:", visibleStore.selectOrPrimaryWaterButtonVisible);
    // console.log("cancelWaterButtonVisible:", visibleStore.cancelWaterButtonVisible);
    // console.log("selectOrPrimaryUpdateButtonVisible:", visibleStore.selectOrPrimaryUpdateButtonVisible);
    // console.log("cancelUpdateButtonVisible:", visibleStore.cancelUpdateButtonVisible);
    // console.log("selectOrPrimaryDetectButtonVisible:", visibleStore.selectOrPrimaryDetectButtonVisible);
    // console.log("cancelDetectButtonVisible:", visibleStore.cancelDetectButtonVisible);
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
.button-group-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px;
    padding: 8px;
    background: #f8f8f8;
    border-radius: 6px;
}


.drawer-content {
    height: 84%;
    background-color: #f5f5f5;
    padding: 5px;
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
    height: 100%;
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
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    justify-content: left;
}
</style>