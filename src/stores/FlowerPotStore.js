import { defineStore } from "pinia";
import api from "../api";

export const FlowerPotStore = defineStore('FlowerPotStore', {
    state: () => ({
        list: [], // 花盆列表
        movePotIdList: [], // 需要搬运的花盆 id 列表
        waterPotIdList: []
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
            console.log("move-list:", this.movePotIdList);
        },
        // 从 movePotIdList 中移除 id
        removeFromMovePotIdList(id) {
            const index = this.movePotIdList.indexOf(id);
            if (index !== -1) {
                this.movePotIdList.splice(index, 1);
            }
            console.log("move-list:", this.movePotIdList);
        },
        // 清空 MovePotIdList
        clearMovePotIdList() {
            this.movePotIdList = [];
            console.log("move-list:", this.movePotIdList);
        },
        // 添加 id 到 waterPotIdList
        addToWaterPotIdList(id) {
            if (!this.waterPotIdList.includes(id)) {
                this.waterPotIdList.push(id);
            }
            console.log("water-list:", this.waterPotIdList);
        },
        // 从 waterPotIdList 中移除 id
        removeFromWaterPotIdList(id) {
            const index = this.waterPotIdList.indexOf(id);
            if (index !== -1) {
                this.waterPotIdList.splice(index, 1);
            }
            console.log("water-list:", this.waterPotIdList);
        },
        // 清空 waterPotIdList
        clearWaterPotIdList() {
            this.waterPotIdList = [];
            console.log("water-list:", this.waterPotIdList);
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