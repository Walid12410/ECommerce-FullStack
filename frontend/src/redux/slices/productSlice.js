import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGenderProduct, fetchProduct, fetchSubCategoryProduct } from '../../api/productApi';


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

const productSlice = createSlice({
    name: "product",
    initialState: {
        // latest product (5 items)
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
        errorGenderProduct: false,
        hasMoreDataGenderProduct: true
    },
    reducers: {
        clearSubCategoryProduct: (state) => {
            state.subCategoryProduct = [];
            state.hasMoreDataSubCategory = true;
        },
        clearGenderProduct: (state) => {
            state.genderProduct = [];
            state.hasMoreDataGenderProduct = true;
        }
    },
    extraReducers: (builder) => {
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
    }
});

export const { clearSubCategoryProduct,clearGenderProduct } = productSlice.actions;
export default productSlice.reducer;
