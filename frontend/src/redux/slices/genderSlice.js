import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGenderApi } from '../../api/genderApi';


export const getGender = createAsyncThunk(
    "gender/fetchGender",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchGenderApi();
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

const genderSlice = createSlice({
    name: "gender",
    initialState: {
        gender: [],
        loadingGender: false,
        errorGender: null,
        selectedGenders: [], // Change from an object to an array
    },
    reducers: {
        setSelectedGenders: (state, action) => {
            state.selectedGenders = action.payload; // Set selected gender IDs array
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGender.pending, (state) => {
                state.loadingGender = true;
                state.errorGender = null;
            })
            .addCase(getGender.fulfilled, (state, action) => {
                state.loadingGender = false;
                state.gender = action.payload;
            })
            .addCase(getGender.rejected, (state, action) => {
                state.loadingGender = false;
                state.errorGender = action.payload || "Failed to fetch gender";
            });
    }
});

export const { setSelectedGenders } = genderSlice.actions;
export default genderSlice.reducer;
