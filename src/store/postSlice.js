import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    error: null,
    loading : true,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts : (state, action) => {
            state.posts = action.payload;
            state.error = null;
            if(action.payload.length > 0) {
                state.loading = false;
            }
        },
        setError : (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setPosts, setError } = postSlice.actions;
export default postSlice.reducer;