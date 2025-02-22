import request from "../utils/requset";

export const fetchUserCountApi = async() => {
    const response = await request.get(`/api/user/count`);
    return response.data;
}


export const fetchUserApi = async(page,limit) => {
    const response = await request.get(`/api/user?page=${page}&limit=${limit}`);
    return response.data;
}