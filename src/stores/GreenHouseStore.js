import { defineStore } from 'pinia';
import api from '../api';

export const GreenHouseStore = defineStore('GreenHouseStore', {
    state: () => ({
        // 存储温室数据
        list: [],
        // 键名到中文名称的映射
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

        // 键名到单位的映射
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
        async fetchGreenHouseForms() {
            const allGreenHouseForm = await api.GreenHouseAPI.getAllGreenHouseForm();
            console.log('All Greenhouse Data:', allGreenHouseForm);
            this.list = allGreenHouseForm;
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
