<template>
    <el-card shadow="hover" :header="header" class="compact-card">
        <template #header v-if="visibleStore.showFlowerPotHeader">
            <div class="custom-header">
                <el-checkbox size="large" class="custom-checkbox" @change="handleCheckboxChange"></el-checkbox>
            </div>
        </template>
        <el-descriptions :column="1" :size="mini" border class="compact-descriptions">
            <el-descriptions-item>
                <template #label>
                    <p class="compact-label">ID</p>
                </template>
                <div class="compact-content">
                    <slot name="id"></slot>
                </div>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <p class="compact-label">土壤温度</p>
                </template>
                <div class="compact-content">
                    <slot name="soilTemperature"></slot>
                </div>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <p class="compact-label">土壤湿度</p>
                </template>
                <div class="compact-content">
                    <slot name="soilHumidity"></slot>
                </div>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <p class="compact-label">病虫害</p>
                </template>
                <div class="compact-content">
                    <slot name="pestName"></slot>
                </div>
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
        flowerPotStore.addToTransportedIdList(props.id);
    } else {
        flowerPotStore.removeFromTransportedIdList(props.id);
    }
};
</script>

<style scoped>
.compact-card {
    border-radius: 12px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    padding: 0px;
}

.custom-header {
    display: flex;
    align-items: center;
    height: 5px;
    padding: 0;
    margin-bottom: 2px;
}

.compact-label {
    margin: 0;
    font-size: 12px;
    color: #666;
}

.compact-content {
    font-size: 12px;
    word-break: break-all;
}

.custom-checkbox {
    margin: 0;
    transform: scale(0.8);
}
</style>