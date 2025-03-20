<template>
    <div id="mapContainer">
        <el-card id="map" @dblclick="handleDoubleClick" shadow="hover">
            <el-row :gutter="0" v-for="(row, rowIndex) in 5" :key="rowIndex" class="grid-row" justify="center">
                <el-col :span="3" v-for="(col, colIndex) in 7" :key="colIndex" class="grid-col">
                    <div v-if="isVisible(rowIndex * 7 + colIndex + 1)" class="grid-item">
                        <img :src="FlowerPot" class="flower-pot" />
                        <div class="number-overlay">
                            {{ getNewNumber(rowIndex * 7 + colIndex + 1) }}
                        </div>
                    </div>
                    <div v-else class="grid-item hidden"></div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { VisibleStore } from '../stores/VisibleStore';
import FlowerPot from '../assets/FlowerPot.svg';

const visibleStore = VisibleStore();
const visibleNumbers = [3, 4, 5, 10, 11, 12, 15, 16, 20, 21, 22, 23, 27, 28, 29, 30, 34, 35];
const newNumberMap = ref({});

visibleNumbers.forEach((number, index) => {
    newNumberMap.value[number] = index + 1;
});

const isVisible = (number) => visibleNumbers.includes(number);
const getNewNumber = (number) => newNumberMap.value[number];
const handleDoubleClick = () => visibleStore.flowerPotDrawerVisible = true;
</script>

<style scoped>
#mapContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#map {
    width: 95%;
    height: 95%;
    border-radius: 20px;
    box-shadow: 1px 1px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#map:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

#map ::v-deep .el-card__body {
    width: 100%;
    height: 100%;
}

.grid-row {
    height: 20%;
    border-bottom: 1px solid #e0e0e0;
    /* 添加行底部边框 */
}

.grid-row:last-child {
    border-bottom: none;
    /* 最后一行不需要底部边框 */
}

.grid-col {
    height: 100%;
    border-right: 1px solid #e0e0e0;
    /* 添加列右侧边框 */
}

.grid-col:last-child {
    border-right: none;
    /* 最后一列不需要右侧边框 */
}

.grid-item {
    height: 99%;
    margin: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    position: relative;
}

.flower-pot {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.number-overlay {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
}

.hidden {
    visibility: hidden;
}
</style>