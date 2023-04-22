import { createSlice } from "@reduxjs/toolkit";

import {
    getAllUsersThunk, updateRoleThunk
} from "../../services/auth-thunk";


const userSlice = createSlice({
    name: "users",
    initialState: { users: [] },
    reducers: {},
    extraReducers: {
        [getAllUsersThunk.fulfilled]: (state, { payload }) => {
            state.users = payload;
        },
        [updateRoleThunk.fulfilled]: (state, { payload }) => {
            const uIndex = state.users.findIndex((u) => u._id === payload._id)
            state.users[uIndex] = {
                ...state.users[uIndex],
                ...payload
            }
        }
    },
});

export default userSlice.reducer;