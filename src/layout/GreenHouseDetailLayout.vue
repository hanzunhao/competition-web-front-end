<template>
    <el-row :gutter="20" style="height: 100%;" class="page">
        <el-col :span="4"  class="border-right" style="height: 95%;">
            <el-row style="height: 4%;">
                <slot name="back-button"></slot>
            </el-row>
            <el-row style="height: 96%;">
                <slot name="data-card"></slot>
            </el-row>
        </el-col>
        <el-col :span="8" class="border-right">
            <el-row style="height: 50%;" class="border-bottom">
                <slot name="greenhouse-map"></slot>
            </el-row>
            <el-row style="height: 50%;">
                <slot name="device-video"></slot>
            </el-row>
        </el-col>
        <el-col :span="12" style="height: 95%;">
            <slot name="data-tables"></slot>
        </el-col>
    </el-row>

    <FlowerPotDrawer></FlowerPotDrawer>
</template>

<script setup>
import FlowerPotDrawer from '../components/FlowerPotDrawer.vue';
</script>


<style scoped>
.border-right {
    border-right: 1px solid #ddd; /* 添加右边框 */
}

.border-bottom {
    border-bottom: 1px solid #ddd; /* 添加下边框 */
}
</style>