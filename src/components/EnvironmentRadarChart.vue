<template>
    <div ref="radarChart" style="height: 95%; width: 95%;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from "echarts";
import { ChartOptionStore } from '../stores/ChartOptionStore';

const chartOptionStore = ChartOptionStore();

const radarChart = ref(null);

onMounted(() => {
    const myChart = echarts.init(radarChart.value);

    myChart.setOption(chartOptionStore.environmentRadarOption);
});
</script>