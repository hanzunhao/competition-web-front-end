import request from '../utils/request';

const getAllGreenHouse = async () => {
    try {
        const response = await request.get('/api/home');
        return response.data;
    } catch (error) {
        return [];
    }
};

const getGreenHouseById = async (id) => {
    try {
        const response = await request.get(`/api/home/${id}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

const deleteGreenHouseById = async (id) => {
    try {
        const response = await request.delete(`/api/home/${id}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

const insertGreenHouseById = async (id) => {
    try {
        const response = await request.insert(`/api/home/${id}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export default {
    getAllGreenHouse,
    getGreenHouseById,
    deleteGreenHouseById,
    insertGreenHouseById
};
