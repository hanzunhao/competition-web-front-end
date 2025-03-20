<template>
    <el-row :gutter="20" style="height: 100%;" class="page">
        <!-- 左侧区域 -->
        <el-col :span="4" class="border" style="height: 100%;">
            <el-row style="height: 4%;">
                <slot name="back-button"></slot>
            </el-row>
            <el-row style="height: 96%;">
                <slot name="data-card"></slot>
            </el-row>
        </el-col>

        <!-- 中间区域 -->
        <el-col :span="8" class="border" style="height: 100%;">
            <el-row style="height: 50%;" class="border">
                <slot name="greenhouse-map"></slot>
            </el-row>
            <el-row style="height: 50%;" class="border">
                <slot name="device-video"></slot>
            </el-row>
        </el-col>

        <!-- 右侧区域 -->
        <el-col :span="12" class="border" style="height: 100%;">
            <slot name="data-tables"></slot>
        </el-col>
    </el-row>

    <FlowerPotDrawer></FlowerPotDrawer>
</template>

<script setup>
import FlowerPotDrawer from '../components/FlowerPotDrawer.vue';
</script>

<style scoped>
.page {
    padding: 10px; /* 添加内边距，避免边框紧贴边缘 */
}

.border {
    border: 1px solid #ddd; /* 为每个区域添加完整边框 */
    border-radius: 4px; /* 添加圆角 */
    padding: 10px; /* 内边距，避免内容紧贴边框 */
}
</style>