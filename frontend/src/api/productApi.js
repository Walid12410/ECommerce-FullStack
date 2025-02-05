import request from "../utils/requset";


export const fetchProduct = async(page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}`);
    return response.data;
}


export const fetchSubCategoryProduct = async(subCategoryID,page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}&subCategoryNo=${subCategoryID}`);
    return response.data;
}
