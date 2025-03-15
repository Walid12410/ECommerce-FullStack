import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBrandProduct,
    fetchCompanyProductApi,
    fetchCountProductApi,
    fetchGenderProduct,
    fetchProduct,
    fetchProductDetailsApi,
    fetchSubCategoryProduct
} from '../../api/productApi';
import toast from 'react-hot-toast';


export const getProduct = createAsyncThunk(
    "product/fetchProduct",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const data = await fetchProduct(page, limit);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);

export const getSubCategoryProduct = createAsyncThunk(
    "product/fetchSubCategoryProduct",
    async ({ subCategoryID, page, limit }, { rejectWithValue }) => {
        try {
            let data;
            if (subCategoryID === null) {
                data = await fetchProduct(page, limit);
            } else {
                data = await fetchSubCategoryProduct(subCategoryID, page, limit);
            }
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);

export const getGenderProduct = createAsyncThunk(
    "product/fetchGenderProduct",
    async ({ genderNo, page, limit }, { rejectWithValue }) => {
        try {
            let data;
            if (genderNo === null) {
                data = await fetchProduct(page, limit);
            } else {
                data = await fetchGenderProduct(genderNo, page, limit);
            }
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);

export const getBrandProduct = createAsyncThunk(
    "product/fetchBrandProduct",
    async ({ brandId, page, limit }, { rejectWithValue }) => {
        try {
            const data = await fetchBrandProduct(brandId, page, limit);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);

export const getCompanyProduct = createAsyncThunk(
    "product/fetchCompanyProduct",
    async ({ companyId, page, limit }, { rejectWithValue }) => {
        try {
            const data = await fetchCompanyProductApi(companyId, page, limit);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);

export const getProductCount = createAsyncThunk(
    "product/fetchProductCount",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchCountProductApi();
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);

export const getProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async ({id}, { rejectWithValue }) => {
        try {
            const data = await fetchProductDetailsApi(id);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);



const productSlice = createSlice({
    name: "product",
    initialState: {
        // count all product
        countProducts: 0,
        // latest product 
        latestProduct: [],
        loadingLatestProduct: false,
        errorLatestProduct: null,
        // sub category product
        subCategoryProduct: [],
        loadingSubCategoryProduct: false,
        errorSubCategoryProduct: null,
        hasMoreDataSubCategory: true,
        // gender product
        genderProduct: [],
        loadingGenderProduct: false,
        errorGenderProduct: null,
        hasMoreDataGenderProduct: true,
        // brand product
        brandProduct: [],
        loadingBrandProduct: false,
        errorBrandProduct: null,
        hasMoreDataBrandProduct: true,
        // company product
        companyProduct: [],
        loadingCompanyProduct: false,
        errorCompanyProduct: null,
        hasMoreDataCompanyProduct: true,
        // product Details
        loadingProductDetails: false,
        productDetails: null
    },
    reducers: {
        clearSubCategoryProduct: (state) => {
            state.subCategoryProduct = [];
            state.hasMoreDataSubCategory = true;
        },
        clearGenderProduct: (state) => {
            state.genderProduct = [];
            state.hasMoreDataGenderProduct = true;
        },
        clearBrandProduct: (state) => {
            state.brandProduct = [];
            state.hasMoreDataBrandProduct = true;
        },
        clearCompanyProduct: (state) => {
            state.companyProduct = [];
            state.hasMoreDataCompanyProduct = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductCount.pending,(state)=> {
                state.countProducts = 0;
            })
            .addCase(getProductCount.fulfilled,(state,action)=>{
                state.countProducts = action.payload;
            })
            .addCase(getProductCount.rejected,(state)=>{
                state.countProducts = 0;
            })
        // all product
        builder
            .addCase(getProduct.pending, (state) => {
                state.loadingLatestProduct = true;
                state.errorLatestProduct = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loadingLatestProduct = false;
                state.latestProduct = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loadingLatestProduct = false;
                state.errorLatestProduct = action.payload || "Failed to fetch product";
            });
        // Sub category product
        builder
            .addCase(getSubCategoryProduct.pending, (state) => {
                state.loadingSubCategoryProduct = true;
                state.errorSubCategoryProduct = null;
            })
            .addCase(getSubCategoryProduct.fulfilled, (state, action) => {
                state.loadingSubCategoryProduct = false;

                if (action.payload.length === 0) {
                    state.hasMoreDataSubCategory = false; // No more data to load
                } else {
                    // Filter out duplicates based on ProductNo
                    const newProducts = action.payload.filter(
                        (newProduct) => !state.subCategoryProduct.some(
                            (existingProduct) => existingProduct.ProductNo === newProduct.ProductNo
                        )
                    );

                    // Add only non-duplicate products to the state
                    state.subCategoryProduct = [...state.subCategoryProduct, ...newProducts];
                }
            })
            .addCase(getSubCategoryProduct.rejected, (state, action) => {
                state.loadingSubCategoryProduct = false;
                state.errorSubCategoryProduct = action.payload || "Failed to fetch product";
            });
        // Gender product
        builder
            .addCase(getGenderProduct.pending, (state) => {
                state.loadingGenderProduct = true;
                state.errorGenderProduct = null;
            })
            .addCase(getGenderProduct.fulfilled, (state, action) => {
                state.loadingGenderProduct = false;

                if (action.payload.length === 0) {
                    state.hasMoreDataGenderProduct = false; // No more data to load
                } else {
                    // Filter out duplicates based on ProductNo
                    const newProducts = action.payload.filter(
                        (newProduct) => !state.genderProduct.some(
                            (existingProduct) => existingProduct.ProductNo === newProduct.ProductNo
                        )
                    );

                    // Add only non-duplicate products to the state
                    state.genderProduct = [...state.genderProduct, ...newProducts];
                }
            })
            .addCase(getGenderProduct.rejected, (state, action) => {
                state.loadingGenderProduct = false;
                state.errorGenderProduct = action.payload || "Failed to fetch product";
            })
        // brand product
        builder
            .addCase(getBrandProduct.pending, (state) => {
                state.loadingBrandProduct = true;
                state.errorBrandProduct = null;
            })
            .addCase(getBrandProduct.fulfilled, (state, action) => {
                state.loadingBrandProduct = false;

                if (action.payload.length === 0) {
                    state.hasMoreDataBrandProduct = false;
                } else {

                    const newProduct = action.payload.filter(
                        (newProduct) => !state.brandProduct.some(
                            (existingProduct) => existingProduct.ProductNo === newProduct.ProductNo
                        )
                    );

                    state.brandProduct = [...state.brandProduct, ...newProduct];
                }
            })
            .addCase(getBrandProduct.rejected, (state, action) => {
                state.loadingBrandProduct = false;
                state.errorBrandProduct = action.payload || "Failed to fetch product";
            })
        // Company product
        builder
            .addCase(getCompanyProduct.pending, (state) => {
                state.loadingCompanyProduct = true;
                state.errorCompanyProduct = null;
            })
            .addCase(getCompanyProduct.fulfilled, (state, action) => {
                state.loadingCompanyProduct = false;

                if (action.payload.length === 0) {
                    state.hasMoreDataCompanyProduct = false;
                } else {

                    const newProduct = action.payload.filter(
                        (newProduct) => !state.companyProduct.some(
                            (existingProduct) => existingProduct.ProductNo === newProduct.ProductNo
                        )
                    );

                    state.companyProduct = [...state.companyProduct, ...newProduct];
                }
            })
            .addCase(getCompanyProduct.rejected, (state, action) => {
                state.loadingCompanyProduct = false;
                state.errorCompanyProduct = action.payload || "Failed to fetch product";
            })
        // Product Details
        builder
            .addCase(getProductDetails.pending, (state) => {
                state.loadingProductDetails = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loadingProductDetails = false;
                state.productDetails = action.payload;
            })
            .addCase(getProductDetails.rejected, (state) => {
                state.loadingProductDetails = false;
                state.productDetails = null;
            })
    }
});

export const { clearSubCategoryProduct,
    clearCompanyProduct,
    clearGenderProduct,
    clearBrandProduct
} = productSlice.actions;
export default productSlice.reducer;
