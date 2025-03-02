<template>
    <div style="width: 100%;">
        <el-segmented v-model="visibleStore.day" :options="options" block />
    </div>
</template>
<script setup>
import { TimeLineStore } from '../stores/TimeLineStore';
import { VisibleStore } from '../stores/VisibleStore';

const timeLineStore = TimeLineStore()

const visibleStore = VisibleStore()

const options = Object.keys(timeLineStore.taskAndTime)
</script>