<template>
  <div ref="chart" style="width: 100%; height: 300px;"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  title: {
    type: String,
    default: '花卉价格走向图',
  },
  xAxisData: {
    type: Array,
    default: () => ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
  },
  seriesData: {
    type: Array,
    default: () => [130, 200, 150, 80, 70, 110, 130],
  },
});

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const option = {
    title: {
      text: props.title,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: props.xAxisData,
      name: '月份',
    },
    yAxis: {
      type: 'value',
      name: '价格 (元)',
    },
    series: [
      {
        name: '花卉价格',
        type: 'line',
        data: props.seriesData,
        smooth: true,
      },
    ],
  };

  myChart.setOption(option);

  // 监听数据变化
  watch(
    () => props.seriesData,
    (newSeriesData) => {
      option.series[0].data = newSeriesData; // 更新 series 数据
      myChart.setOption(option); // 重新设置选项
    }
  );
});
</script>