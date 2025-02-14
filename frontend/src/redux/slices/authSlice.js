import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserAuth, loginUser } from '../../api/authApi';
import toast from 'react-hot-toast';

export const getUserAuth = createAsyncThunk(
    "auth/checkUser",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchUserAuth();
            return data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);


export const checkLoginUser = createAsyncThunk(
    "auth/login",
    async ({ userData }, { rejectWithValue }) => {
        try {
            const data = await loginUser(userData);
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
        isLoggingIn : false
    },
    reducers: {},
    extraReducers: (builder) => {
        // check user auth
        builder
            .addCase(getUserAuth.fulfilled, (state, action) => {
                state.authUser = action.payload.user;
            })
            .addCase(getUserAuth.rejected, (state) => {
                state.authUser = null;
            });
        // login
        builder
            .addCase(checkLoginUser.pending,(state)=>{
                state.isLoggingIn = true;
            })
            .addCase(checkLoginUser.fulfilled,(state, action) => {
                state.authUser = action.payload.user;
                state.isLoggingIn = false;
            })
            .addCase(checkLoginUser.rejected,(state)=>{
                state.isLoggingIn = false;
                state.authUser = null;
            });
    }
});

export default authSlice.reducer;