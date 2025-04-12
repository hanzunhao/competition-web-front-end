import { defineStore } from 'pinia';
import { TimeLineStore } from './TimeLineStore';

const store = TimeLineStore()

export const VisibleStore = defineStore("VisibleStore", {
    state: () => ({
        selectOrPrimaryMoveButtonVisible: true,
        cancelMoveButtonVisible: false,
        selectOrPrimaryWaterButtonVisible: true,
        cancelWaterButtonVisible: false,
        showFlowerPotHeader: false,
        taskDrawerVisible: false,
        flowerPotDrawerVisible: false,
        day: Object.keys(store.taskAndTime)[0],
        greenhouseId: null
    }),
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