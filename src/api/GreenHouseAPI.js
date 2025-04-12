import request from '../utils/request';

const getAllGreenHouse = async () => {
    try {
        const response = await request.get('/api/page_1');        
        return response.data;
    } catch (error) {
        return [];
    }
};

const getGreenHouseById = async (id) => {
    try {
        const response = await request.get(`/api/page_1/${id}`);
        return response.data;
    } catch (error) {
        return [];
    }
};


export default {
    getAllGreenHouse,
    getGreenHouseById
};
