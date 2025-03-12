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

    // 模拟的24小时湿度数据（单位：百分比）
    const humidities = [
        60, 62, 64, 65, 66, 68, 70, 72, 74, 75, 76, 77,
        78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67
    ];

    const option = {
        backgroundColor: '#fff',
        title: {
            text: '温室内24小时湿度变化',
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
            name: '湿度 (%)', // Y轴名称
            nameLocation: 'center',
            nameGap: 30,
            min: 50, // 设置Y轴最小值为50%
            max: 80  // 设置Y轴最大值为80%
        },
        tooltip: {
            trigger: 'axis', // 鼠标悬停时显示数据
            formatter: '时间: {b0}<br />湿度: {c0}%'
        },
        series: [
            {
                data: humidities, // 24小时湿度数据
                type: 'line',
                smooth: true, // 平滑曲线
                areaStyle: {
                    color: 'rgba(54, 162, 235, 0.2)' // 添加背景色
                },
                lineStyle: {
                    color: 'rgba(54, 162, 235, 1)' // 折线颜色
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