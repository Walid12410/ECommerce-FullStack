import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBannerApi } from '../../api/bannerApi';
import { getCurrentTime } from "../../utils/currentTime";

export const getBanner = createAsyncThunk(
    "banner/fetchBanner",
    async (_, { rejectWithValue }) => {
        try {
            const time = getCurrentTime();
            const data = await fetchBannerApi(time);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

// Banner Slice
const bannerSlice = createSlice({
    name: "banners",
    initialState: {
        banners: [],
        loadingBanners: false,
        errorBanners: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch categorise
            .addCase(getBanner.pending, (state) => {
                state.loadingBanners = true;
                state.errorBanners = null;
            })
            .addCase(getBanner.fulfilled, (state, action) => {
                state.loadingBanners = false;
                state.banners = action.payload;
            })
            .addCase(getBanner.rejected, (state, action) => {
                state.loadingBanners = false;
                state.errorBanners = action.payload || "Failed to fetch banner";
            });
        
    }
});


export default bannerSlice.reducer;