import request from '../utils/request';

const getAllStore=async()=>{
    try {
        const response=await request.get("/api/page_4/store/get");        
        return response.data;
    } catch (error) {
        return [];
    }
};

const getStoreById=async(id)=>{
    try {
        const response=await request.get(`/api/page_4/store/${id}/get`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export default{
    getAllStore,
    getStoreById
}
