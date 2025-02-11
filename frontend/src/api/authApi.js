import request from "../utils/requset";


export const fetchUserAuth = async() => {
    const response = await request.get(`/api/auth/check`);
    return response.data;
}