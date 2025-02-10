import request from "../utils/requset";


export const fetchProduct = async(page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}`);
    return response.data;
}


export const fetchSubCategoryProduct = async(subCategoryID,page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}&subCategoryNo=${subCategoryID}`);
    return response.data;
}


export const fetchGenderProduct = async(genderNo,page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}&GenderNo=${genderNo}`);
    return response.data;
}


export const fetchBrandProduct = async(brandNo,page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}&BrandNo=${brandNo}`);
    return response.data;
}



export const fetchCompanyProductApi = async(companyId,page,limit)=> {
    const response = await request.get(`/api/product?page=${page}&limit=${limit}&CompanyNo=${companyId}`);
    return response.data;
}
