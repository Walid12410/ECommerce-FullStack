import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCompanyApi } from '../../api/companyApi';

export const getCompany = createAsyncThunk(
    "company/fetchCompany",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchCompanyApi();
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: [],
        loadingCompanies: false,
        errorCompanies: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch all company
            .addCase(getCompany.pending, (state) => {
                state.loadingCompanies = true;
                state.errorCompanies = null;
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.loadingCompanies = false;
                state.companies = action.payload;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.loadingCompanies = false;
                state.errorCompanies = action.payload || "Failed to fetch banner";
            });
    }
});


export default companySlice.reducer;