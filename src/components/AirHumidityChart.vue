<template>
    <div ref="chart" style="height: 95%; width: 95%;" @dblclick="dialogVisible = true"></div>
    <el-dialog v-model="dialogVisible" width="50%" top="10vh" draggable :modal="false">
        <div ref="dialogChart" style="height: 60vh;"></div>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import * as echarts from "echarts";
import { ChartOptionStore } from '../stores/ChartOptionStore';
import { VisibleStore } from '../stores/VisibleStore';

const visibleStore = VisibleStore();
const chartOptionStore = ChartOptionStore();

const chart = ref(null);
const dialogChart = ref(null);
const dialogVisible = ref(false);

let myChart = null;
let dialogEchart = null;

onMounted(async () => {
    myChart = echarts.init(chart.value);
    await chartOptionStore.loadChartData(visibleStore.greenhouseId + 1);
    myChart.setOption(chartOptionStore.airHumidityOption);
});

watch(dialogVisible, (val) => {
    if (val) {
        nextTick(() => {
            dialogEchart = echarts.init(dialogChart.value);
            dialogEchart.setOption(chartOptionStore.airHumidityOption);
        });
    } else {
        if (dialogEchart) {
            dialogEchart.dispose();
            dialogEchart = null;
        }
    }
});
</script>