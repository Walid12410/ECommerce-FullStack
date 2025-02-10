import request from "../utils/requset";


export const fetchCompanyApi = async()=> {
    const response = await request.get(`/api/company`);
    return response.data;
}