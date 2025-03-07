import { defineStore } from 'pinia';

export const JwtStore = defineStore('JwtStore', {
    state: () => ({
        jwt: null
    }),
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'jwt-store', // 存储的 key，默认是 store 的 id
                storage: localStorage, // 使用 localStorage
            },
        ],
    },
});
