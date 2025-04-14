<template>
    <MainLayout>
        <el-row gutter="20" class="page">
            <el-col :span="10" class="border">
                <el-row style="height: 9%;">
                    <SegmentedController></SegmentedController>
                </el-row>
                <el-row style="height: 81%; display: flex; justify-content: center; align-items: center;">
                    <DailyTaskTimeLine></DailyTaskTimeLine>
                </el-row>
                <el-row style="height: 10%; display: flex; justify-content: flex-end; align-items: center;">
                    <el-button type="primary" @click="openTaskDrawer">自定义每日任务</el-button>
                    <TaskDrawer></TaskDrawer>
                </el-row>
            </el-col>
            <el-col :span="14" class="border">
                <WarningTable></WarningTable>
            </el-col>
        </el-row>

        <TaskDrawer></TaskDrawer>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layout/MainLayout.vue';
import WarningTable from '../components/LogTable.vue';
import DailyTaskTimeLine from '../components/DailyTaskTimeLine.vue';
import SegmentedController from '../components/SegmentedController.vue';
import TaskDrawer from '../components/TaskDrawer.vue';
import { VisibleStore } from '../stores/VisibleStore';

const store = VisibleStore()

const openTaskDrawer = () => {
    store.taskDrawerVisible = true
}
</script>

<style scoped>
.el-row {
    height: 100%;
    width: 100%;
}

.page {
    padding: 10px;
    /* 添加内边距，避免边框紧贴边缘 */
}

.border {
    border: 1px solid #ddd;
    /* 为每个区域添加完整边框 */
    border-radius: 4px;
    /* 添加圆角 */
    padding: 10px;
    /* 内边距，避免内容紧贴边框 */
}
</style>