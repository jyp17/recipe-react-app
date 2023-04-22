import { createSlice } from "@reduxjs/toolkit";

import {
    loginThunk, logoutThunk, registerThunk,
    getUserThunk, updateUserThunk,
} from "../../services/auth-thunk";


const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [getUserThunk.fulfilled]: (state, { payload }) => {
            // do nothing
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            console.log(state.currentUser)
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
});

export default authSlice.reducer;