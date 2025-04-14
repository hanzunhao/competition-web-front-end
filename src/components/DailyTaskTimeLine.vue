<template>
  <el-timeline>
    <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.startTime">
      {{ activity.name }}
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { TimeLineStore } from '../stores/TimeLineStore';
import { VisibleStore } from '../stores/VisibleStore';
import { computed } from 'vue';

const timeLineStore = TimeLineStore();
const visibleStore = VisibleStore();

const day = computed(() => visibleStore.day);

const activities = computed(() => {
  const tasks = timeLineStore.list[day.value] || [];
  return tasks.slice().sort((a, b) => a.startTime.localeCompare(b.startTime));
});
</script>