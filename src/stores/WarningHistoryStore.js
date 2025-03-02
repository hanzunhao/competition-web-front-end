import { defineStore } from 'pinia';
import api from '../api';

export const WarningHistoryStore = defineStore("WarningHistoryStore", {
    state: () => ({
        list: []
    }),
    getters: {
        // 添加一个 getter，返回格式化后的列表
        formattedList: (state) => {
            return state.list.map(item => ({
                ...item,
                date: formatDate(item.date) // 格式化日期
            }));
        }
    },
    actions: {
        async getAllWarning() {
            const allWarning = await api.WarningListAPI.getAllWarning();
            console.log('All Warning Data:', allWarning);
            this.list = allWarning;
        },
        async deleteWarning(ids) {
            await api.WarningListAPI.deleteWarning(ids);
        },
        logState() {
            console.log(this.list);
        }
    }
});

// 日期格式化函数（显示当地时间）
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear(); // 获取当地年份
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取当地月份（0-11），需要 +1
    const day = String(date.getDate()).padStart(2, '0'); // 获取当地日期
    const hours = String(date.getHours()).padStart(2, '0'); // 获取当地小时
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 获取当地分钟
    return `${year}-${month}-${day} ${hours}:${minutes}`; // 格式化为 YYYY-MM-DD HH:mm
}