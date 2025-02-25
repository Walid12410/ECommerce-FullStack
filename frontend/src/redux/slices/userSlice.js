import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserApi, fetchUserCountApi } from '../../api/userApi';
import { registerUser } from '../../api/authApi';
import toast from 'react-hot-toast';

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

export const createNewUser = createAsyncThunk(
    "user/newUser",
    async ({ userData }, { rejectWithValue }) => {
        try {
            const data = await registerUser(userData);
            toast.success("New user created successfully");
            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error create new user");
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
        userCount: 1,
        loadingCreateUser: false,
        successCreate: false
    },
    reducers: {
        clearCreateUser: (state) => {
            state.successCreate = false;
        }
    },
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
                state.errorUsers = action.payload || "Failed to fetch user";
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
        builder
            // add new user
            .addCase(createNewUser.pending, (state)=> {
                state.loadingCreateUser = true;
                state.successCreate = false;
            })
            .addCase(createNewUser.fulfilled, (state) =>{
                state.loadingCreateUser = false;
                state.successCreate = true;
            })
            .addCase(createNewUser.rejected,(state)=>{
                state.loadingCreateUser = false;
                state.successCreate = false;
            })
    }
});

export const { clearCreateUser } = userSlice.actions;
export default userSlice.reducer;