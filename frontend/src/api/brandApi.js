import request from "../utils/requset";


export const fetchBrandApi = async()=> {
    const response = await request.get(`/api/brand`);
    return response.data;
}