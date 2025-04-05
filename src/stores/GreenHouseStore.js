import { defineStore } from "pinia";
import api from "../api";

export const GreenHouseStore = defineStore('GreenHouseStore', {
    state: () => ({
        list: [], 
        keyToChinese: {
            greenHouseId: '大棚ID',
            storeId:'所属仓库ID',
            flowerName: '花卉名称',
            totalPots:'花盆总数',
            potsWithFlowers:'种植数量',
            illumination: '光照强度',
            airTemperature: '空气温度',
            meanSoilTemperature: '平均土壤温度',
            airHumidity: '空气湿度',
            meanSoilHumidity: '平均土壤湿度',
            pestNames: '病虫害',
        },
        keyToUnit: {
            greenHouseId: '',
            storeId:'',
            flowerName: '',
            totalPots:'',
            potsWithFlowers:'',
            illumination: ' 勒克斯（Lux）',
            airTemperature: ' 摄氏度（℃）',
            meanSoilTemperature: ' 摄氏度（℃）',
            airHumidity: ' 百分比（%）',
            meanSoilHumidity: ' 百分比（%）',
            pestNames: '',
        },
    }),
    actions: {
        // 获取所有温室数据
        async getAllGreenHouse() {
            try {
                const data = await api.GreenHouseAPI.getAllGreenHouse();
                this.list = data;                
            } catch (error) {
                console.error('获取大棚数据失败:', error);
            }
        },
        // 根据id获取温室数据
        async getGreenHouseById(id) {
            try {
                const data = await api.GreenHouseAPI.getGreenHouseById(id);
                this.list = data;
            } catch (error) {
                console.error('获取大棚数据失败:', error);
            }
        },
        // 根据id插入温室数据
        async insertGreenHouseById(id) {
            try {
                const data = await api.GreenHouseAPI.insertGreenHouseById(id);
                this.list = data;
            } catch (error) {
                console.error('插入大棚数据失败:', error);
            }
        },
        // 根据id删除温室数据
        async deleteGreenHouseById(id) {
            try {
                const data = await api.GreenHouseAPI.deleteGreenHouseById(id);
                this.list = data;
            } catch (error) {
                console.error('删除大棚数据失败:', error);
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