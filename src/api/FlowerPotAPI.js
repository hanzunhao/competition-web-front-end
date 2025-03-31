import request from '../utils/request'

const getFlowerPotByGreenHouseId = async (greenHouseId) => {
    try {
        const response = await request.get(`/api/home/${greenHouseId}/pot`);
        return response.data;
    } catch (error) {
        return [];
    }
}

const deleteFlowerPotByPotIdList = async (greenHouseId, potIdList) => {
    try {
        const response = await request.delete(`/api/home/${greenHouseId}/pot`, {
            data: potIdList
        });
        return response.data;
    } catch (error) {
        return [];
    }
}

export default {
    getFlowerPotByGreenHouseId,
    deleteFlowerPotByPotIdList
};