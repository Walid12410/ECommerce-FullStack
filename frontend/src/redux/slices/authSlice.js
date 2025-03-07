import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLogin, fetchUserAuth, loginCompany, loginUser, logoutUser, registerUser } from '../../api/authApi';
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
            toast.success("Login successfully");
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

export const checkRegisterUser = createAsyncThunk(
    "auth/register",
    async ({ userData }, { rejectWithValue }) => {
        try {
            const data = await registerUser(userData);
            toast.success("Register successfully");
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

export const logOutAuth = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const data = await logoutUser();
            toast.success("Logout successfully");
            return data;
        } catch (error) {
            toast.error("Something went wrong. Try again later");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

export const checkAdminLogin = createAsyncThunk(
    "auth/adminLogin",
    async({userData}, {rejectWithValue}) => {
        try {
            const data = await adminLogin(userData);
            toast.success("Login successfully");
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
)

export const checkCompanyLogin = createAsyncThunk(
    "auth/loginCompany",
    async({userData}, {rejectWithValue}) => {
        try {
            const data = await loginCompany(userData);
            toast.success("Login successfully");
            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error fetch data");
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        isLoggingIn: false,
        isSiggingUp: false,
        successRegister: false,
        isAdminLoggingIn : false,
        authCompany: null,
        isCompanyLoggingIn: false
    },
    reducers: {
        clearRegisterCheck: (state) => {
            state.successRegister = false;
        }
    },
    extraReducers: (builder) => {
        // check user auth
        builder
            .addCase(getUserAuth.fulfilled, (state, action) => {
                state.authUser = action.payload.user;
            })
            .addCase(getUserAuth.rejected, (state) => {
                state.authUser = null;
            });
        // Register
        builder
            .addCase(checkRegisterUser.pending, (state) => {
                state.isSiggingUp = true;
            })
            .addCase(checkRegisterUser.fulfilled, (state) => {
                state.successRegister = true;
                state.isSiggingUp = false;
            })
            .addCase(checkRegisterUser.rejected, (state) => {
                state.isSiggingUp = false;
                state.successRegister = false;
            })
        // login
        builder
            .addCase(checkLoginUser.pending, (state) => {
                state.isLoggingIn = true;
            })
            .addCase(checkLoginUser.fulfilled, (state, action) => {
                state.authUser = action.payload.user;
                state.isLoggingIn = false;
            })
            .addCase(checkLoginUser.rejected, (state) => {
                state.isLoggingIn = false;
                state.authUser = null;
            });
        // admin login
        builder
            .addCase(checkAdminLogin.pending, (state) => {
                state.isAdminLoggingIn = true;
            })
            .addCase(checkAdminLogin.fulfilled, (state, action) => {
                state.authUser = action.payload.user;
                state.isAdminLoggingIn = false;
            })
            .addCase(checkAdminLogin.rejected, (state) => {
                state.isAdminLoggingIn = false;
                state.authUser = null;
            })
        // Logout
        builder
            .addCase(logOutAuth.fulfilled, (state) => {
                state.authUser = null;
            })
        // login company
        builder
            .addCase(checkCompanyLogin.pending,(state) => {
                state.isCompanyLoggingIn = true;
            })
            .addCase(checkCompanyLogin.fulfilled,(state, action)=> {
                state.isCompanyLoggingIn = false;
                state.authCompany = action.payload;
            })
            .addCase(checkCompanyLogin.rejected,(state)=> {
                state.isCompanyLoggingIn = false;
            })
    }
});

export const { clearRegisterCheck } = authSlice.actions;
export default authSlice.reducer;