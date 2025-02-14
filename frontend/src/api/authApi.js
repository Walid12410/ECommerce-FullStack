import request from "../utils/requset";


export const fetchUserAuth = async() => {
    const response = await request.get(`/api/auth/check`);
    return response.data;
}


export const loginUser = async(data) => {
    const response = await request.post(`/api/auth/login`,data);
    return response.data;
}