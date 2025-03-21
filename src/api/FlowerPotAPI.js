import request from '../utils/request'

const getAllFlowerPotForm = async () => {
    try {
        const response = await request.get('/api/home/detail/pot/selectAll');
        return response.data;
    } catch (error) {
        return [];
    }
}

const deleteFlowerPotByIdList = async (idList) => {
    try {
        const response = await request.delete('/api/home/detail/pot/delete', {
            data: idList, // 将数组作为请求体发送
          });
        return response.data;
    } catch (error) {
        return [];
    }
}

export default {
    getAllFlowerPotForm,
    deleteFlowerPotByIdList
};