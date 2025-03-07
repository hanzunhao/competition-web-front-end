import { defineStore } from "pinia";
import api from "../api";

export const GreenHouseStore = defineStore('GreenHouseStore', {
    state: () => ({
        list: [], // 存储温室数据

        keyToChinese: {
            id: '大棚ID',
            flowerName: '花卉名称',
            illumination: '光照强度',
            airTemperature: '空气温度',
            soilTemperature: '土壤温度',
            airHumidity: '空气湿度',
            soilHumidity: '土壤湿度',
            soilOrganicMatterContent: '土壤有机质含量',
            soilPorosity: '土壤疏松性',
            soilPH: '土壤酸碱度',
            soilEC: '土壤可溶性盐浓度',
            pestName: '病虫害',
        },
        keyToUnit: {
            id: '',
            flowerName: '',
            illumination: ' 勒克斯（Lux）',
            airTemperature: ' 摄氏度（℃）',
            soilTemperature: ' 摄氏度（℃）',
            airHumidity: ' 百分比（%）',
            soilHumidity: ' 百分比（%）',
            soilOrganicMatterContent: ' 百分比（%）',
            soilPorosity: ' 百分比（%）',
            soilPH: '',
            soilEC: ' 毫西门子/厘米（mS/cm）',
            pestName: '',
        },
    }),
    actions: {
        // 获取大棚数据
        async fetchGreenHouseForms() {
            try {
                const allGreenHouseForm = await api.GreenHouseAPI.getAllGreenHouseForm();
                console.log('All Greenhouse Da ta:', allGreenHouseForm);
                this.list = allGreenHouseForm;
                this.shouldFetchData = false; // 数据获取完成后，标记为不需要重新获取
            } catch (error) {
                console.error('获取大棚数据失败:', error);
            }            
        },
        // 获取键的中文名称
        getChineseKey(key) {
            return this.keyToChinese[key] || key; // 如果找不到对应的中文名称，返回原始键名
        },
        // 获取键对应的单位
        getUnit(key) {
            return this.keyToUnit[key] || ''; // 如果找不到对应的单位，返回空字符串
        },
    }
});