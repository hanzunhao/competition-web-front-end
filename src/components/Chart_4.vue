<template>
    <div ref="radarChart" style="height: 95%; width: 95%;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from "echarts";

const radarChart = ref(null);

onMounted(() => {
    const myChart = echarts.init(radarChart.value);

    // 雷达图的指标（维度）
    const indicators = [
        { name: '温度', max: 40 }, // 温度范围：0°C - 40°C
        { name: '湿度', max: 100 }, // 湿度范围：0% - 100%
        { name: '光照', max: 5000 }, // 光照范围：0 lux - 5000 lux
        { name: 'CO₂浓度', max: 2000 }, // CO₂浓度范围：0 ppm - 2000 ppm
        { name: '土壤湿度', max: 100 } // 土壤湿度范围：0% - 100%
    ];

    // 模拟的温室环境数据
    const data = [
        {
            value: [25, 60, 3000, 800, 70], // 对应指标的值
            name: '当前环境'
        },
        {
            value: [20, 50, 2500, 600, 60], // 对比数据（例如：前一天）
            name: '前一天环境'
        }
    ];

    const option = {
        backgroundColor: '#fff',
        title: {
            text: '温室环境参数雷达图',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: indicators, // 雷达图的指标
            shape: 'polygon', // 雷达图的形状（多边形）
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(200, 200, 200, 0.2)', 'rgba(200, 200, 200, 0.4)'] // 背景色
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#999' // 轴线颜色
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#999' // 分割线颜色
                }
            }
        },
        series: [
            {
                name: '环境参数',
                type: 'radar',
                data: data, // 数据
                areaStyle: {
                    color: 'rgba(255, 153, 0, 0.4)' // 填充颜色
                },
                lineStyle: {
                    color: 'rgba(255, 153, 0, 1)' // 线条颜色
                },
                itemStyle: {
                    color: 'rgba(255, 153, 0, 1)' // 数据点颜色
                }
            }
        ]
    };

    myChart.setOption(option);
});
</script>