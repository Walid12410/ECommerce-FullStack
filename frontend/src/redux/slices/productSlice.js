import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProduct } from '../../api/productApi';


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


const productSlice = createSlice({
    name: "product",
    initialState: {
        latestProduct: [],
        loadingLatestProduct: false,
        errorLatestProduct: null,
    },
    reducers: {},
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
    }
});

export default productSlice.reducer;
