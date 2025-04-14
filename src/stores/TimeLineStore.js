import { defineStore } from 'pinia';

export const TimeLineStore = defineStore('TimeLineStore', {
    state: () => ({
        list: {
            Mon: [],
            Tue: [],
            Wed: [],
            Thu: [],
            Fri: [],
            Sat: [],
            Sun: [],
        }
    }),
    actions: {
        
    },
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'time-line-store', // 存储的 key，默认是 store 的 id
                storage: localStorage, // 使用 localStorage
            },
        ],
    },
});
