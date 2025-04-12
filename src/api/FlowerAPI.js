import request from "../utils/request";

const insertFlower=async(name,number,storeId)=>{
    try {
        const flower={
            id:null,
            name:name,
            number:number,
            sellingPrice:null,
            storeId:storeId
        }
        const response = await request.put(`/api/flower/insert`,flower);
        return response.data;
    } catch (error) {
        return [];
    }
}

export default{
    insertFlower
}