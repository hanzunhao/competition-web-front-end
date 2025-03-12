<template>
    <div ref="chart" style="height: 95%; width: 95%;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from "echarts";

const chart = ref(null);

onMounted(() => {
    const myChart = echarts.init(chart.value);

    // 24小时时间点
    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    // 模拟的24小时光照数据（单位：lux）
    const lightIntensities = [
        0, 0, 0, 0, 0, 50, 200, 500, 1000, 1500, 2000, 2500,
        3000, 3500, 4000, 4500, 4000, 3500, 3000, 2000, 1000, 500, 100, 0
    ];

    const option = {
        backgroundColor: '#fff',
        title: {
            text: '温室内24小时光照强度变化',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        xAxis: {
            type: 'category',
            data: hours, // 24小时时间点
            name: '时间', // X轴名称
            nameLocation: 'center',
            nameGap: 25
        },
        yAxis: {
            type: 'value',
            name: '光照强度 (lux)', // Y轴名称
            nameLocation: 'center',
            nameGap: 30,
            min: 0, // 设置Y轴最小值为0
            max: 5000 // 设置Y轴最大值为5000
        },
        tooltip: {
            trigger: 'axis', // 鼠标悬停时显示数据
            formatter: '时间: {b0}<br />光照强度: {c0} lux'
        },
        series: [
            {
                data: lightIntensities, // 24小时光照数据
                type: 'line',
                smooth: true, // 平滑曲线
                areaStyle: {
                    color: 'rgba(255, 193, 7, 0.2)' // 添加背景色（橙色）
                },
                lineStyle: {
                    color: 'rgba(255, 193, 7, 1)' // 折线颜色（橙色）
                }
            }
        ],
        axisPointer: {
            show: true,
            snap: true
        }
    };

    myChart.setOption(option);
});
</script>