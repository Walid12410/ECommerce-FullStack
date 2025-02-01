import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import genderReducer from "./slices/genderSlice";
import bannerReducer from "./slices/bannerSlice";

const store = configureStore({
    reducer : {
        categories : categoryReducer,
        gender : genderReducer,
        banner: bannerReducer
    }
});

export default store;