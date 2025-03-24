import request from '../utils/request';

const getAllGreenHouseForm = async () => {
    try {
        const response = await request.get('/api/home/get');
        return response.data;
    } catch (error) {
        return [];
    }
};

export default {
    getAllGreenHouseForm,
};
