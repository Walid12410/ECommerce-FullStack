import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentTime } from "../../utils/currentTime";
import { fetchOffersApi } from '../../api/offerApi';

export const getOffer = createAsyncThunk(
    "offer/fetchOffer",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const time = getCurrentTime();
            const data = await fetchOffersApi(time, page, limit);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

const offerrSlice = createSlice({
    name: "offers",
    initialState: {
        offers: [],
        loadingOffers: false,
        errorOffers: null,
        hasMoreDateOffers: true
    },
    reducers: {
        clearOffers: (state) => {
            state.offers = [];
            state.hasMoreDateOffers = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOffer.pending, (state) => {
                state.loadingOffers = true;
                state.errorOffers = null;
            })
            .addCase(getOffer.fulfilled, (state, action) => {
                state.loadingOffers = false;

                if (action.payload.length === 0) {
                    state.hasMoreDateOffers = false; // No more data to load
                } else {
                    // Filter out duplicates based on ProductNo
                    const newOffer = action.payload.filter(
                        (newOffer) => !state.offers.some(
                            (existingProduct) => existingProduct.OfferNo === newOffer.OfferNo
                        )
                    );

                    // Add only non-duplicate products to the state
                    state.offers = [...state.offers, ...newOffer];
                }
            })
            .addCase(getOffer.rejected, (state, action) => {
                state.loadingOffers = false;
                state.errorOffers = action.payload || "Failed to fetch banner";
            });
    }
});

export const { clearOffers } = offerrSlice.reducer;
export default offerrSlice.reducer;