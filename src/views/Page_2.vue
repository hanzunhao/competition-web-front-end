<template>
    <!-- 页面二 -->
    <MainLayout>
        <el-row gutter="20">
            <el-col :span="10">
                <el-row style="height: 9%;">
                    <SegmentedController></SegmentedController>
                </el-row>
                <el-row style="height: 78%; display: flex; justify-content: center; align-items: center;">
                    <DailyTaskTimeLine></DailyTaskTimeLine>
                </el-row>
                <el-row style="height: 5%; display: flex; justify-content: flex-end; align-items: center;">
                    <el-button type="primary" @click="openTaskDrawer">自定义每日任务</el-button>
                    <TaskDrawer></TaskDrawer>
                </el-row>
            </el-col>
            <el-divider direction="vertical"></el-divider>
            <el-col :span="13">
                <WarningTable></WarningTable>
            </el-col>
        </el-row>

        <!-- TaskDrawer 组件 -->
        <TaskDrawer></TaskDrawer>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layout/MainLayout.vue';
import WarningTable from '../components/WarningTable.vue';
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
.el-divider {
    height: 100%;
    border-width: 1px;
    border-color: #9a9a9a;
}

.el-row {
    height: 100%;
    width: 100%;
}
</style>