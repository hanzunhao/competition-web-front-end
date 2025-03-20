import { defineStore } from "pinia";
import api from "../api";

export const FlowerPotStore = defineStore('FlowerPotStore', {
    state: () => ({
        list: []
    }),
    actions:{
        // 获取大棚数据
        async fetchFlowerPotForms() {
            try {
                const allFlowerPotForm = await api.FlowerPotAPI.getAllFlowerPotForm();
                this.list = allFlowerPotForm;                
            } catch (error) {
                console.error('获取花盆数据失败:', error);
            }            
        }
    }
});