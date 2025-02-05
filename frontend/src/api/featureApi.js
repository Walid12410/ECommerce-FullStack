import request from "../utils/requset";


export const fetchFeatureApi = async (time, page, limit) => {
    const response = await request.get(`/api/feature?currentTime=${time}&page=${page}&limit=${limit}`);
    return response.data;
}