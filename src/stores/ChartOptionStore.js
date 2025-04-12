import { defineStore } from "pinia";
import api from "../api";

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
                data: [], // 24小时时间点
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
                    data: [], // 24小时气温数据
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
                data: [], // 24小时时间点
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
                    data: [], // 24小时湿度数据
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
                data: [], // 24小时时间点
                name: '时间', // X轴名称
                nameLocation: 'center',
                nameGap: 25
            },
            yAxis: {
                offset: -3,
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
                    data: [], // 24小时光照数据
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
                data: [],
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
                    data: [],
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
                data: [],
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
                    data: [],
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
                    data: [], // 数据
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
        async loadChartData(greenHouseId = 1) {
            try {
                // const now = new Date();

                // 测试用固定时间
                const now = new Date('2025-04-10T23:00:01'); 

                
                const endTime = new Date(now);
                const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 精确24小时 

                const res = await api.HistoryDataAPI.select(
                    greenHouseId,
                    this.formatForBackend(startTime), // 输出示例：2025-04-10T12:03:03 
                    this.formatForBackend(endTime)    // 输出示例：2025-04-11T12:03:03 
                );
                // 处理数据为24小时格式 
                const processedData = this.processHistoryData(res);

                // 更新各个图表 
                this.updateAllCharts(processedData);

                const radarSeries = this.processRadarData(res);
                this.environmentRadarOption.series = radarSeries.map(data => ({
                    name: data.name,
                    type: 'radar',
                    data: [{
                        value: data.value,
                        areaStyle: { color: this.getRandomColor() }
                    }]
                }));

                return true;
            } catch (error) {
                console.error(' 加载图表数据失败:', error);
                return false;
            }
        },

        formatForBackend(date) {
            const pad = num => num.toString().padStart(2, '0');
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        },

        processHistoryData(rawData) {
            // 1. 按自然小时分组（支持跨天数据）
            const hourlyMap = new Map(); // 使用Map存储按小时分组的数据 

            rawData.forEach(item => {
                const date = new Date(item.time);
                // 生成唯一小时键（包含日期+小时，避免跨天合并）
                const hourKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}`;

                if (!hourlyMap.has(hourKey)) {
                    hourlyMap.set(hourKey, {
                        count: 0,
                        datetime: date, // 保留完整时间对象 
                        airTemperature: 0,
                        airHumidity: 0,
                        illumination: 0,
                        meanSoilTemperature: 0,
                        meanSoilHumidity: 0
                    });
                }

                const hourData = hourlyMap.get(hourKey);
                hourData.count++;
                hourData.airTemperature += item.airTemperature;
                hourData.airHumidity += item.airHumidity;
                hourData.illumination += item.illumination;
                hourData.meanSoilTemperature += item.meanSoilTemperature;
                hourData.meanSoilHumidity += item.meanSoilHumidity;
            });

            // 2. 转换为数组并按时间排序 
            const sortedData = Array.from(hourlyMap.values())
                .sort((a, b) => a.datetime - b.datetime)
                .map(hourData => ({
                    // 格式化为可读时间（可根据需要调整格式）
                    time: hourData.datetime.toLocaleString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        month: '2-digit',
                        day: '2-digit'
                    }),
                    airTemperature: hourData.count ? (hourData.airTemperature / hourData.count).toFixed(1) : 0,
                    airHumidity: hourData.count ? (hourData.airHumidity / hourData.count).toFixed(1) : 0,
                    illumination: hourData.count ? Math.round(hourData.illumination / hourData.count) : 0,
                    meanSoilTemperature: hourData.count ? (hourData.meanSoilTemperature / hourData.count).toFixed(1) : 0,
                    meanSoilHumidity: hourData.count ? (hourData.meanSoilHumidity / hourData.count).toFixed(1) : 0
                }));

            return sortedData;
        },

        processRadarData(rawData) {
            if (!rawData || !Array.isArray(rawData)) return [];

            const dateMap = new Map();

            // 按日期分组（示例：2025-04-10）
            rawData.forEach(item => {
                const dateStr = new Date(item.time).toISOString().split('T')[0];
                if (!dateMap.has(dateStr)) {
                    dateMap.set(dateStr, []);
                }
                dateMap.get(dateStr).push(item);
            });

            // 计算每日五维平均值 
            return Array.from(dateMap.entries()).map(([date, dayData]) => {
                const count = dayData.length;
                return {
                    name: date,
                    value: [
                        dayData.reduce((sum, d) => sum + d.airTemperature, 0) / count,
                        dayData.reduce((sum, d) => sum + d.airHumidity, 0) / count,
                        dayData.reduce((sum, d) => sum + d.illumination, 0) / count,
                        800, // CO₂示例值（需替换实际字段）
                        dayData.reduce((sum, d) => sum + d.meanSoilHumidity, 0) / count
                    ]
                };
            });
        },

        updateAllCharts(processedData) {
            // 直接在方法内格式化时间 (HH:00格式)
            const formatHour = (date) => {
                const hours = date.getHours().toString().padStart(2, '0');
                return `${hours}:00`;
            };

            // 生成时间轴数据 
            const timeData = processedData.map(item =>
                formatHour(new Date(item.time))  // 直接转换原始时间 
            );

            // 更新所有图表配置 
            const updateChart = (chartOption, dataKey) => ({
                ...chartOption,
                xAxis: { ...chartOption.xAxis, data: timeData },
                series: [{ ...chartOption.series[0], data: processedData.map(item => item[dataKey]) }]
            });

            this.airTemperatureOption = updateChart(this.airTemperatureOption, 'airTemperature');
            this.airHumidityOption = updateChart(this.airHumidityOption, 'airHumidity');
            this.illuminationOption = updateChart(this.illuminationOption, 'illumination');
            this.meanSoilTemperatureOption = updateChart(this.meanSoilTemperatureOption, 'meanSoilTemperature');
            this.meanSoilHumidityOption = updateChart(this.meanSoilHumidityOption, 'meanSoilHumidity');
        },

        getRandomColor() {
            const colors = [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)'
            ];
            return colors[Math.floor(Math.random() * colors.length)]; 
        }
    }
})