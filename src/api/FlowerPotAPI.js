import request from '../utils/request'

const getAllFlowerPotForm=async()=>{
    try {
        const response = await request.get('/api/home/detail/pot');
        return response.data;
    } catch (error) {
        return [];
    }
}

export default {
    getAllFlowerPotForm,
};