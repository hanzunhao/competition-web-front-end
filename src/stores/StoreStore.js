import { defineStore } from "pinia";
import api from "../api";

export const StoreStore = defineStore("StoreStore", {
    state: () => ({
        list: [],
    }),
    actions: {
        async getAllStore() {
            try {
                const data = await api.StoreAPI.getAllStore();
                this.list = data;
            } catch (error) {
                console.error('获取仓库数据失败:', error);
            }
        },
        async getStoreById(id) {
            try {
                const data = await api.StoreAPI.getStoreById(id);
                // 更新 list 数据
                const index = this.list.findIndex(item => item.id === id);
                if (index >= 0) {
                    this.list[index] = data; // 更新已有数据
                } else {
                    this.list.push(data); // 新增数据
                }
            } catch (error) {
                console.error('获取仓库数据失败:', error);
            }
        }
    }
})