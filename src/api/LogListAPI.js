import request from '../utils/request';

const getAllLog = async () => {
    try {
        const response = await request.get('/api/page_2/log/selectAll');
        return response.data;
    } catch (error) {
        return [];
    }
};
const deleteLog = async (ids) => {
    try {
        await request.delete('/api/page_2/log/delete', {
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
    getAllLog,
    deleteLog
};
