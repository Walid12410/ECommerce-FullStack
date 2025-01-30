import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoryApi } from '../../api/categoryApi';


export const getCategory = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchCategoryApi();
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

// Category Slice
const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loadingCategory: false,
        errorCategory: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch categorise
            .addCase(getCategory.pending, (state) => {
                state.loadingCategory = true;
                state.errorCategory = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loadingCategory = false;
                state.categories = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loadingCategory = false;
                state.errorCategory = action.payload || "Failed to fetch category";
            });
        
    }
});


export default categorySlice.reducer;