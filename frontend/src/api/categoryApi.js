import request from "../utils/requset";


export const fetchCategoryApi = async()=> {
    const response = await request.get('/api/category/subcategory');
    return response.data;
}