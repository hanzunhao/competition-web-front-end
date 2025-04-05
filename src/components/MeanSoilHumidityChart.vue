<template>
    <div ref="chart" style="height: 95%; width: 95%;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from "echarts";
import { ChartOptionStore } from '../stores/ChartOptionStore';

const chartOptionStore = ChartOptionStore();

const chart = ref(null);

onMounted(() => {
    const myChart = echarts.init(chart.value);

    myChart.setOption(chartOptionStore.meanSoilHumidityOption);
});
</script>