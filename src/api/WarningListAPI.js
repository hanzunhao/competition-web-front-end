import axios from 'axios';

const getAllWarning = async () => {
    try {
        const response = await axios.get('/api/page_2/warning/selectAll');
        return response.data.data;
    } catch (error) {
        return [];
    }
};
const deleteWarning = async (ids) => {
    try {
        await axios.delete('/api/page_2/warning/delete', {
            params: { ids }, // 将 ids 作为 URL 参数传递
            paramsSerializer: (params) => {
                // 将数组转换为 ids=1&ids=2 格式
                return Object.keys(params)
                    .map((key) => {
                        if (Array.isArray(params[key])) {
                            return params[key].map((value) => `${key}=${value}`).join('&');
                        }
                        return `${key}=${params[key]}`;
                    })
                    .join('&');
            }
        });
        console.log('删除成功');
    } catch (error) {
        console.error('删除失败:', error);
    }
};

export default {
    getAllWarning,
    deleteWarning
};
