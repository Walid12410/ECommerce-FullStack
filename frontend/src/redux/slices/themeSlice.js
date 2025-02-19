import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: localStorage.getItem("theme") || "dark", // Default to "dark" if no theme is stored
    },
    reducers: {
        setTheme: (state, action) => {
            const newTheme = action.payload; // Access the payload via action.payload
            localStorage.setItem("theme", newTheme); // Store the new theme in localStorage
            state.theme = newTheme; // Update the state
        }
    },
    extraReducers: (builder) => { }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;