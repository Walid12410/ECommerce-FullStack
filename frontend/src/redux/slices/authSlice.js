import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserAuth } from '../../api/authApi';

export const getUserAuth = createAsyncThunk(
    "auth/checkUser",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchUserAuth(time);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // check user auth
            .addCase(getUserAuth.fulfilled, (state, action) => {
                state.authUser = action.payload;
            })
            .addCase(getUserAuth.rejected, (state) => {
                state.authUser = null;
            });
    }
});

export default authSlice.reducer;