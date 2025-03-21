import { defineStore } from "pinia";
import api from "../api";

export const FlowerPotStore = defineStore('FlowerPotStore', {
    state: () => ({
        list: [], // 花盆列表
        transportedIdList: [] // 需要搬运的花盆 id 列表
    }),
    actions: {
        // 获取花盆数据
        async fetchFlowerPotForms() {
            try {
                const allFlowerPotForm = await api.FlowerPotAPI.getAllFlowerPotForm();
                this.list = allFlowerPotForm;
            } catch (error) {
                console.error('获取花盆数据失败:', error);
            }
        },
        // 添加 id 到 transportedIdList
        addToTransportedIdList(id) {
            if (!this.transportedIdList.includes(id)) {
                this.transportedIdList.push(id);
            }
        },
        // 从 transportedIdList 中移除 id
        removeFromTransportedIdList(id) {
            const index = this.transportedIdList.indexOf(id);
            if (index !== -1) {
                this.transportedIdList.splice(index, 1);
            }
        },
        // 清空 transportedIdList
        clearTransportedIdList() {
            this.transportedIdList = [];
        },
        // 向后端传递transportedIdList用于删除花盆数据
        async deleteSelectedFlowerPots() {
            try {
                await api.FlowerPotAPI.deleteFlowerPotByIdList(this.transportedIdList);
            } catch (error) {
                console.error('删除被搬运的花盆失败:', error);
            }
        },
    }
});