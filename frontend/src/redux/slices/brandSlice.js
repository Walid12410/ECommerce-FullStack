import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBrandApi } from '../../api/brandApi';

export const getBrand = createAsyncThunk(
    "brand/fetchBrand",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchBrandApi();
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

const brandSlice = createSlice({
    name: "brand",
    initialState: {
        brands: [],
        loadingBrand: false,
        errorBrand: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch all brand
            .addCase(getBrand.pending, (state) => {
                state.loadingBrand = true;
                state.errorBrand = null;
            })
            .addCase(getBrand.fulfilled, (state, action) => {
                state.loadingBrand = false;
                state.brands = action.payload;
            })
            .addCase(getBrand.rejected, (state, action) => {
                state.loadingBrand = false;
                state.errorBrand = action.payload || "Failed to fetch banner";
            });
        
    }
});


export default brandSlice.reducer;