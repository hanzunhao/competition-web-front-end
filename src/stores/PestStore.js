import { defineStore } from "pinia";
import api from "../api";

export const PestStore = defineStore("PestStore", {
    state: () => ({
        list: []
    }),
    actions: {
        add(input) {
            if (!input) return;
            // 统一处理为数组
            let names = [];

            if (typeof input === 'string') {
                // 处理逗号分隔的字符串（自动去除前后空格）
                names = input.split(',')
                    .map(name => name.trim())
                    .filter(name => name.length > 0); // 过滤空字符串
            } else if (Array.isArray(input)) {
                names = input.filter(name => typeof name === 'string' && name.trim().length > 0);
            }

            // 添加到列表（避免重复）
            names.forEach(name => {
                if (!this.list.includes(name)) {
                    this.list.push(name);
                }
            });
        },
        async refresh() {
            try {
                this.list = [];

                const allGreenHouseData = await api.GreenHouseAPI.getAllGreenHouse();

                allGreenHouseData.forEach(greenhouse => {
                    // 假设每个温室对象有 pests 字段存储病虫害数据
                    if (greenhouse.pestNames) {
                        this.add(greenhouse.pestNames); // 调用 add 方法添加病虫害
                    }
                });
            } catch (error) {
                console.error('刷新数据失败:', error);
            }
        }
    },
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'pest-store', // 存储的 key，默认是 store 的 id
                storage: localStorage, // 使用 localStorage
            },
        ],
    },
})