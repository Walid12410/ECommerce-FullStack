import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.product.ProductNo !== action.payload);
        },
        clearCart: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {}
});


export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;