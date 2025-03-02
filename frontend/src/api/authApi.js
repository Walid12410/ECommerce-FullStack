import request from "../utils/requset";

export const fetchUserAuth = async() => {
    const response = await request.get(`/api/auth/check`);
    return response.data;
}

export const loginUser = async(data) => {
    const response = await request.post(`/api/auth/login`,data);
    return response.data;
}


export const adminLogin = async(data) => {
    const response = await request.post(`/api/auth/login-admin`,data);
    return response.data;
}

export const logoutUser = async() => {
    const response = await request.post(`/api/auth/logout`);
    return response.data;
}


export const registerUser = async(data) => {
    const response = await request.post(`/api/auth/register`,data);
    return response.data;
}


export const loginCompany = async (data) => {
    try {
        const response = await request.post(`/api/auth-company/login`, data);
        
        if (!response.data) {
            console.error("No data returned from API");
            return;
        }

        console.log("Login Successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Login Error:", error.response?.data || error.message);
    }
};
