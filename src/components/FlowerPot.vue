<template>
    <el-card shadow="hover" :header="header">
        <template #header v-if="visibleStore.showFlowerPotHeader">
            <div class="custom-header">
                <el-checkbox size="large" class="custom-checkbox" @change="handleCheckboxChange"></el-checkbox>
            </div>
        </template>
        <el-descriptions :column="1" :size="small" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">ID</div>
                </template>
                <slot name="id"></slot>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">土壤温度</div>
                </template>
                <slot name="soilTemperature"></slot>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">土壤湿度</div>
                </template>
                <slot name="soilHumidity"></slot>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">病虫害</div>
                </template>
                <slot name="pestName"></slot>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup>
import { VisibleStore } from '../stores/VisibleStore';
import { FlowerPotStore } from '../stores/FlowerPotStore';

const flowerPotStore = FlowerPotStore();
const visibleStore = VisibleStore();
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const handleCheckboxChange = (isChecked) => {
    if (isChecked) {
        flowerPotStore.addToTransportedIdList(props.id); // 添加 id
    } else {
        flowerPotStore.removeFromTransportedIdList(props.id); // 移除 id
    }
};
</script>

<style scoped>
.el-card {
    border-radius: 20px;
    box-shadow: 1px 1px;
    height: 100%;
}

.custom-header {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0;
    border: none;
}

.custom-checkbox {
    margin: 0;
}
</style>