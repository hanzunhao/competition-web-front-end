<template>
  <el-timeline>
    <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.time">
      {{ activity.tag }}
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>
import { TimeLineStore } from '../stores/TimeLineStore';
import { VisibleStore } from '../stores/VisibleStore';
import { computed } from 'vue';

const timeLineStore = TimeLineStore()

const visibleStore = VisibleStore()

// 获取当前选中的 day
const day = computed(() => visibleStore.day);

// 根据 day 获取对应的 activities，并按 time 从早到晚排序
const activities = computed(() => {
  const tasks = timeLineStore.taskAndTime[day.value] || [];

  // 按 time 排序
  return tasks.slice().sort((a, b) => a.time.localeCompare(b.time));
});
</script>