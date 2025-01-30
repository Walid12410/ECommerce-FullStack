import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import genderReducer from "./slices/genderSlice";

const store = configureStore({
    reducer : {
        categories : categoryReducer,
        gender : genderReducer
    }
});

export default store;