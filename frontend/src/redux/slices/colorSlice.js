import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchColorApi } from '../../api/colorApi';

export const getColors = createAsyncThunk(
    "color/fetchColor",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchColorApi();
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

const colorSlice = createSlice({
    name: "color",
    initialState: {
        colors: [],
        loadingColor: false,
        errorColor: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch color
            .addCase(getColors.pending, (state) => {
                state.loadingColor = true;
                state.errorColor = null;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.loadingColor = false;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.loadingColor = false;
                state.errorColor = action.payload || "Failed to fetch color";
            });
        
    }
});


export default colorSlice.reducer;