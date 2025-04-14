import { defineStore } from 'pinia';
import { TimeLineStore } from './TimeLineStore';

const store = TimeLineStore()

export const VisibleStore = defineStore("VisibleStore", {
    state: () => ({
        selectOrPrimaryMoveButtonVisible: true,
        cancelMoveButtonVisible: false,
        selectOrPrimaryWaterButtonVisible: true,
        cancelWaterButtonVisible: false,
        selectOrPrimaryUpdateButtonVisible: true,
        cancelUpdateButtonVisible: false,
        selectOrPrimaryDetectButtonVisible: true,
        cancelDetectButtonVisible: false,
        showFlowerPotHeader: false,
        taskDrawerVisible: false,
        flowerPotDrawerVisible: false,
        day: Object.keys(store.list)[0],
        greenhouseId: null
    }),
    action:{
        logVisible(){
            console.log("selectOrPrimaryMoveButtonVisible:",this.selectOrPrimaryMoveButtonVisible);
            console.log("cancelMoveButtonVisible:",this.cancelMoveButtonVisible);
            console.log("selectOrPrimaryWaterButtonVisible:",this.selectOrPrimaryWaterButtonVisible);
            console.log("cancelWaterButtonVisible:",this.cancelWaterButtonVisible);
            console.log("selectOrPrimaryUpdateButtonVisible:",this.selectOrPrimaryUpdateButtonVisible);
            console.log("cancelUpdateButtonVisible:",this.cancelUpdateButtonVisible);
            console.log("selectOrPrimaryDetectButtonVisible:",this.selectOrPrimaryDetectButtonVisible);
            console.log("cancelDetectButtonVisible:",this.cancelDetectButtonVisible);
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