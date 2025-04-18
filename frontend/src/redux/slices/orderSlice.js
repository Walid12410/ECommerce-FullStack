import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async ({ userNo, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `/api/orders/user/${userNo}?page=${page}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchOrderDetails = createAsyncThunk(
    "orders/fetchOrderDetails",
    async (orderNo, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/orders/${orderNo}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = {
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
    }
};

// Slice
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
            state.orderDetails = null;
            state.error = null;
            state.pagination = {
                total: 0,
                page: 1,
                limit: 10,
                pages: 0
            };
        }
    },
    extraReducers: (builder) => {
        // Fetch user orders
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data.orders;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch orders";
            })
            // Fetch order details
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch order details";
            });
    }
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer; 