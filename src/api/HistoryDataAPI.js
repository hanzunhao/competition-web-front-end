import request from "../utils/request";
 
/**
 * 查询温室历史数据 
 * @param {number} greenHouseId - 温室ID（正整数）
 * @param {string} startTime - 开始时间（格式：yyyy-MM-dd HH:mm:ss）
 * @param {string} endTime - 结束时间（格式：yyyy-MM-dd HH:mm:ss）
 * @returns {Promise} 包含查询结果的Promise对象 
 */
const select = async (greenHouseId, startTime, endTime) => {
    try {
        const res = await request.get("/api/history_data/select",  {
            params: {
                greenHouseId,
                startTime,
                endTime 
            }
        });
        return res.data; 
    } catch (error) {
        console.error(" 查询历史数据失败:", error);
        throw error;
    }
};
 
/**
 * 新增温室历史数据 
 * @param {Object} historyData - 温室历史数据对象 
 * @param {number} historyData.greenHouseId  - 温室ID（正整数）
 * @param {string} historyData.time  - 记录时间（格式：yyyy-MM-dd HH:mm:ss）
 * @param {number} [historyData.temperature] - 温度（可选）
 * @param {number} [historyData.humidity] - 湿度（可选）
 * @param {number} [historyData.co2] - CO2浓度（可选）
 * @returns {Promise} 包含操作结果的Promise对象 
 */
const insert = async (historyData) => {
    try {
        const res = await request.post("/api/history_data/insert",  historyData);
        return res.data; 
    } catch (error) {
        console.error(" 新增历史数据失败:", error);
        throw error;
    }
};
 
export default {
    select,
    insert 
};