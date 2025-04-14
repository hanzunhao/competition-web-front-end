import { defineStore } from "pinia";
import api from "../api";

export const FlowerPotStore = defineStore('FlowerPotStore', {
    state: () => ({
        list: [], // 花盆列表
        movePotIdList: [], // 需要搬运的花盆 id 列表
        waterPotIdList: [],
        updatePotIdList: [],
        detectPotIdList: []
    }),
    actions: {
        // 获取花盆数据
        async getFlowerPotByGreenHouseId(greenHouseId) {
            try {
                const data = await api.FlowerPotAPI.getFlowerPotByGreenHouseId(greenHouseId);
                this.list = data;
            } catch (error) {
                console.error('获取花盆数据失败:', error);
            }
        },
        // 删除花盆数据
        async deleteFlowerPotByPotIdList(greenHouseId) {
            try {
                const data = await api.FlowerPotAPI.deleteFlowerPotByPotIdList(greenHouseId, this.movePotIdList);
                this.list = data;
            } catch (error) {
                console.error('获取花盆数据失败:', error);
            }
        },
        // 添加 id 到 movePotIdList
        addToMovePotIdList(id) {
            if (!this.movePotIdList.includes(id)) {
                this.movePotIdList.push(id);
            }
        },
        // 从 movePotIdList 中移除 id
        removeFromMovePotIdList(id) {
            const index = this.movePotIdList.indexOf(id);
            if (index !== -1) {
                this.movePotIdList.splice(index, 1);
            }
        },
        // 清空 MovePotIdList
        clearMovePotIdList() {
            this.movePotIdList = [];
        },
        // 添加 id 到 waterPotIdList
        addToWaterPotIdList(id) {
            if (!this.waterPotIdList.includes(id)) {
                this.waterPotIdList.push(id);
            }
        },
        // 从 waterPotIdList 中移除 id
        removeFromWaterPotIdList(id) {
            const index = this.waterPotIdList.indexOf(id);
            if (index !== -1) {
                this.waterPotIdList.splice(index, 1);
            }
        },
        // 清空 waterPotIdList
        clearWaterPotIdList() {
            this.waterPotIdList = [];
        },
        // 添加 id 到 updatePotIdList
        addToUpdatePotIdList(id) {
            if (!this.updatePotIdList.includes(id)) {
                this.updatePotIdList.push(id);
            }
        },
        // 从 updatePotIdList 中移除 id
        removeFromUpdatePotIdList(id) {
            const index = this.updatePotIdList.indexOf(id);
            if (index !== -1) {
                this.updatePotIdList.splice(index, 1);
            }
        },
        // 清空 updatePotIdList
        clearUpdatePotIdList() {
            this.updatePotIdList = [];
        },
        // 添加 id 到 detectPotIdList
        addToDetectPotIdList(id) {
            if (!this.detectPotIdList.includes(id)) {
                this.detectPotIdList.push(id);
            }
        },
        // 从 detectPotIdList 中移除 id
        removeFromDetectPotIdList(id) {
            const index = this.detectPotIdList.indexOf(id);
            if (index !== -1) {
                this.detectPotIdList.splice(index, 1);
            }
        },
        // 清空 detectPotIdList
        clearDetectPotIdList() {
            this.detectPotIdList = [];
        },
        // 向后端传递温室ID和MovePotIdList用于删除花盆数据
        async deleteSelectedFlowerPots(greenHouseId) {
            try {
                await api.FlowerPotAPI.deleteFlowerPotByPotIdList(greenHouseId, this.movePotIdList);
            } catch (error) {
                console.error('删除被搬运的花盆失败:', error);
            }
        }
    }
});