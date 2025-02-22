import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserApi, fetchUserCountApi } from '../../api/userApi';

export const getUser = createAsyncThunk(
    "user/fetchUser",
    async ({page,limit}, { rejectWithValue }) => {
        try {
            const data = await fetchUserApi(page,limit);
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

export const getUserCount = createAsyncThunk(
    "user/fetchUserCount",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchUserCountApi();
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loadingUsers: false,
        errorUsers: null,
        userCount: 1
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch users
            .addCase(getUser.pending, (state) => {
                state.loadingUsers = true;
                state.errorUsers = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loadingUsers = false;
                state.users = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loadingUsers = false;
                state.errorUsers = action.payload || "Failed to fetch banner";
            });
        builder
            // count user
            .addCase(getUserCount.pending,(state) => {
                state.userCount = 1;
            })
            .addCase(getUserCount.fulfilled, (state, action)=>{
                state.userCount = action.payload;
            })
            .addCase(getUserCount.rejected,(state) => {
                state.userCount = 1;
            })
    }
});


export default userSlice.reducer;