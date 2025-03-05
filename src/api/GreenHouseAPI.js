import request from '../utils/request';

const getAllGreenHouseForm = async () => {
    try {
        const response = await request.get('/api/home');
        return response.data;
    } catch (error) {
        return [];
    }
};

export default {
    getAllGreenHouseForm,
};
