import request from "../utils/requset";


export const fetchGenderApi = async()=> {
    const response = await request.get('/api/gender');
    return response.data;
}