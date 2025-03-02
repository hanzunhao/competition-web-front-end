import axios from 'axios';

const getAllGreenHouseForm = async () => {
    try {
        const response = await axios.get('/api/home');
        return response.data.data;
    } catch (error) {
        return [];
    }
};

export default {
    getAllGreenHouseForm,
};
