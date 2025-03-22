import request from '../utils/request'

const getAllFlowerPotForm = async () => {
    try {
        const response = await request.get('/api/home/detail/pot/selectAll');
        return response.data;
    } catch (error) {
        return [];
    }
}

const deleteFlowerPotByIdList = async (greenHouseId, potIdList) => {
    try {
        const response = await request.delete(`/api/home/detail/pot/delete/${greenHouseId}`, {
            data: potIdList
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