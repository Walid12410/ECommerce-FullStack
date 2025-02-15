import request from "../utils/requset";


export const fetchOffersApi = async(time,page,limit)=> {
    const response = await request.get(`/api/offer?page=${page}&limit=${limit}&time=${time}`);
    return response.data;
}