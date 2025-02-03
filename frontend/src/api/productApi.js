import request from "../utils/requset";


export const fetchProduct = async(page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}`);
    return response.data;
}