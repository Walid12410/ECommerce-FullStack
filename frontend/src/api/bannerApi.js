import request from "../utils/requset";


export const fetchBannerApi = async(time)=> {
    const response = await request.get(`/api/banner?time=${time}`);
    return response.data;
}