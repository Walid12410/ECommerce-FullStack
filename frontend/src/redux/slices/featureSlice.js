import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFeatureApi } from '../../api/featureApi';
import { getCurrentTime } from "../../utils/currentTime";


export const getFeature = createAsyncThunk(
    "feature/fetchFeature",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const time = getCurrentTime();
            const data = await fetchFeatureApi(time,page, limit);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching data");
            return rejectWithValue(error.response?.data?.message || "Error fetching data");
        }
    }
);


const featureSlice = createSlice({
    name: "feature",
    initialState: {
        feature: [],
        loadingFeature: false,
        errorFeature: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeature.pending, (state) => {
                state.loadingFeature = true;
                state.errorFeature = null;
            })
            .addCase(getFeature.fulfilled, (state, action) => {
                state.loadingFeature = false;
                state.feature = action.payload;
            })
            .addCase(getFeature.rejected, (state, action) => {
                state.loadingFeature = false;
                state.errorFeature = action.payload || "Failed to fetch feature";
            });
    }
});

export default featureSlice.reducer;
