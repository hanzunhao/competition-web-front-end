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

    // 模拟的24小时气温数据（单位：摄氏度）
    const temperatures = [
        22, 21, 20, 19, 18, 17, 16, 15, 16, 18, 20, 22,
        24, 26, 28, 30, 32, 33, 32, 30, 28, 26, 24, 23
    ];

    const option = {
        backgroundColor: '#fff',
        title: {
            text: '温室内24小时温度变化',
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
            name: '气温 (°C)', // Y轴名称
            nameLocation: 'center',
            nameGap: 30
        },
        tooltip: {
            trigger: 'axis', // 鼠标悬停时显示数据
            formatter: '时间: {b0}<br />气温: {c0}°C'
        },
        series: [
            {
                data: temperatures, // 24小时气温数据
                type: 'line',
                smooth: true, // 平滑曲线
                areaStyle: {
                    color: 'rgba(255, 0, 0, 0.2)' // 背景色（红色，透明度较低）
                },
                lineStyle: {
                    color: 'rgba(255, 0, 0, 1)' // 折线颜色（红色）
                },
                itemStyle: {
                    color: 'rgba(255, 0, 0, 1)' // 数据点颜色（红色）
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