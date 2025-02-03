import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import genderReducer from "./slices/genderSlice";
import bannerReducer from "./slices/bannerSlice";
import productReducer from "./slices/productSlice";

const store = configureStore({
    reducer : {
        categories : categoryReducer,
        gender : genderReducer,
        banner: bannerReducer,
        product : productReducer
    }
});

export default store;