import { defineStore } from "pinia";

export const ChartOptionStore = defineStore("ChartOptionStore", {
    state: () => ({
        airTemperatureOption: {
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
                data: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`), // 24小时时间点
                name: '时间', // X轴名称
                nameLocation: 'center',
                nameGap: 25
            },
            yAxis: {
                type: 'value',
                name: '气温 (°C)', // Y轴名称
                nameLocation: 'end',
                nameGap: 30
            },
            tooltip: {
                trigger: 'axis', // 鼠标悬停时显示数据
                formatter: '时间: {b0}<br />气温: {c0}°C'
            },
            series: [
                {
                    data: [
                        22, 21, 20, 19, 18, 17, 16, 15, 16, 18, 20, 22,
                        24, 26, 28, 30, 32, 33, 32, 30, 28, 26, 24, 23
                    ], // 24小时气温数据
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
        },
        airHumidityOption: {
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
                data: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`), // 24小时时间点
                name: '时间', // X轴名称
                nameLocation: 'center',
                nameGap: 25
            },
            yAxis: {
                type: 'value',
                name: '湿度 (%)', // Y轴名称
                nameLocation: 'end',
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
                    data: [
                        60, 62, 64, 65, 66, 68, 70, 72, 74, 75, 76, 77,
                        78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67
                    ], // 24小时湿度数据
                    type: 'line',
                    smooth: true, // 平滑曲线
                    areaStyle: {
                        color: 'rgba(54, 162, 235, 0.2)' // 添加背景色
                    },
                    lineStyle: {
                        color: 'rgba(54, 162, 235, 1)' // 折线颜色
                    },
                    itemStyle: {
                        color: 'rgba(54, 162, 235, 1)' // 数据点颜色
                    }
                }
            ],
            axisPointer: {
                show: true,
                snap: true
            }
        },
        illuminationOption: {
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
                data: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`), // 24小时时间点
                name: '时间', // X轴名称
                nameLocation: 'center',
                nameGap: 25
            },
            yAxis: {
                offset:-3,
                type: 'value',
                name: '光照强度 (lux)', // Y轴名称
                nameLocation: 'end',
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
                    data: [
                        0, 0, 0, 0, 0, 50, 200, 500, 1000, 1500, 2000, 2500,
                        3000, 3500, 4000, 4500, 4000, 3500, 3000, 2000, 1000, 500, 100, 0
                    ], // 24小时光照数据
                    type: 'line',
                    smooth: true, // 平滑曲线
                    areaStyle: {
                        color: 'rgba(255, 193, 7, 0.2)' // 添加背景色（橙色）
                    },
                    lineStyle: {
                        color: 'rgba(255, 193, 7, 1)' // 折线颜色（橙色）
                    },
                    itemStyle: {
                        color: 'rgba(255, 193, 7, 1)' // 数据点颜色（橙色）
                    }
                }
            ],
            axisPointer: {
                show: true,
                snap: true
            }
        },
        meanSoilTemperatureOption: {
            backgroundColor: '#fff',
            title: {
                text: '24小时平均土壤温度变化',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                type: 'category',
                data: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
                name: '时间',
                nameLocation: 'center',
                nameGap: 25
            },
            yAxis: {
                type: 'value',
                name: '土壤温度 (°C)',
                nameLocation: 'end',
                nameGap: 30,
                min: 15,
                max: 30
            },
            tooltip: {
                trigger: 'axis',
                formatter: '时间: {b0}<br />土壤温度: {c0}°C'
            },
            series: [
                {
                    data: [
                        18, 18, 17, 17, 16, 16, 16, 16, 17, 18, 19, 20,
                        21, 22, 23, 24, 25, 26, 25, 24, 23, 22, 21, 20
                    ],
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: 'rgba(139, 69, 19, 0.2)' // Brown color with transparency
                    },
                    lineStyle: {
                        color: 'rgba(139, 69, 19, 1)' // Brown color
                    },
                    itemStyle: {
                        color: 'rgba(139, 69, 19, 1)' // Brown color
                    }
                }
            ],
            axisPointer: {
                show: true,
                snap: true
            }
        },
        meanSoilHumidityOption: {
            backgroundColor: '#fff',
            title: {
                text: '24小时平均土壤湿度变化',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                type: 'category',
                data: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
                name: '时间',
                nameLocation: 'center',
                nameGap: 25
            },
            yAxis: {
                type: 'value',
                name: '土壤湿度 (%)',
                nameLocation: 'end',
                nameGap: 30,
                min: 40,
                max: 80
            },
            tooltip: {
                trigger: 'axis',
                formatter: '时间: {b0}<br />土壤湿度: {c0}%'
            },
            series: [
                {
                    data: [
                        65, 65, 66, 66, 67, 67, 68, 68, 67, 66, 65, 64,
                        63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52
                    ],
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: 'rgba(0, 100, 0, 0.2)' // Dark green color with transparency
                    },
                    lineStyle: {
                        color: 'rgba(0, 100, 0, 1)' // Dark green color
                    },
                    itemStyle: {
                        color: 'rgba(0, 100, 0, 1)' // Dark green color
                    }
                }
            ],
            axisPointer: {
                show: true,
                snap: true
            }
        },
        environmentRadarOption: {
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'item'
            },
            radar: {
                // 雷达图的指标（维度）
                indicator: [
                    { name: '温度', max: 40 }, // 温度范围：0°C - 40°C
                    { name: '湿度', max: 100 }, // 湿度范围：0% - 100%
                    { name: '光照', max: 5000 }, // 光照范围：0 lux - 5000 lux
                    { name: 'CO₂浓度', max: 2000 }, // CO₂浓度范围：0 ppm - 2000 ppm
                    { name: '土壤湿度', max: 100 } // 土壤湿度范围：0% - 100%
                ], // 雷达图的指标
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
                    // 模拟的温室环境数据
                    data: [
                        {
                            value: [25, 60, 3000, 800, 70], // 对应指标的值
                            name: '当前环境'
                        },
                        {
                            value: [20, 50, 2500, 600, 60], // 对比数据（例如：前一天）
                            name: '前一天环境'
                        }
                    ], // 数据
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
        },
    }),
    actions: {

    }
})