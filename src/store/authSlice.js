import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    user: null,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login : (state, action) => {
            state.status = true;
            state.user = action.payload;
            state.error = null;
        },

        logout : (state) => {
            state.status = false;
            state.user = null;
            state.error = null;
        },
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
