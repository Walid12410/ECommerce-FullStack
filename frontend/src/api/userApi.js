import request from "../utils/requset";

export const fetchUserCountApi = async() => {
    const response = await request.get(`/api/user/count`);
    return response.data;
}


export const fetchUserApi = async(page,limit) => {
    const response = await request.get(`/api/user?page=${page}&limit=${limit}`);
    return response.data;
}


export const updateUserApi = async(userData,id) => {
    const response = await request.put(`/api/user/${id}`,userData);
    return response.data;
}


export const updateUserPasswordApi = async(userData) => {
    const response = await request.put(`/api/user/change-password`,userData);
    return response.data;
}
