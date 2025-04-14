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
    if (visibleStore.cancelMoveButtonVisible) {
        if (isChecked) {
            flowerPotStore.addToMovePotIdList(props.id);
        } else {
            flowerPotStore.removeFromMovePotIdList(props.id);
        }
    } else if (visibleStore.cancelWaterButtonVisible) {
        if (isChecked) {
            flowerPotStore.addToWaterPotIdList(props.id);
        } else {
            flowerPotStore.removeFromWaterPotIdList(props.id);
        }
    } else if (visibleStore.cancelUpdateButtonVisible) {
        if (isChecked) {
            flowerPotStore.addToUpdatePotIdList(props.id);
        } else {
            flowerPotStore.removeFromUpdatePotIdList(props.id);
        }
    } else if (visibleStore.cancelDetectButtonVisible) {
        if (isChecked) {
            flowerPotStore.addToDetectPotIdList(props.id);
        } else {
            flowerPotStore.removeFromDetectPotIdList(props.id);
        }
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