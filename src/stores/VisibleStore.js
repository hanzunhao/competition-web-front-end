import { defineStore } from 'pinia';
import { TimeLineStore } from './TimeLineStore';

const store = TimeLineStore()

export const VisibleStore = defineStore("VisibleStore", {
    state: () => ({
        taskDrawerVisible: false,
        day: Object.keys(store.taskAndTime)[0],
        greenhouseId: null
    }),
    actions: {
        logState() {
            console.log(this.taskDrawerVisible)
            console.log(this.day)
            console.log(this.greenhouseId)
        }
    },
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'visible-store', // 存储的 key，默认是 store 的 id
                storage: localStorage, // 使用 localStorage
            },
        ],
    },
})