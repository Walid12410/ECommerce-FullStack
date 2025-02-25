import request from "../utils/requset";


export const fetchColorApi = async()=> {
    const response = await request.get(`/api/color`);
    return response.data;
}