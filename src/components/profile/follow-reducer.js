import { createSlice } from "@reduxjs/toolkit";

import {followThunk, unfollowThunk, findAllFollowsThunk, findFollowThunk, findByFollowedThunk, findByFollowerThunk}
    from "../../services/follow-thunk";


const followSlice = createSlice({
    name: "follows",
    initialState: {follows: []},
    reducers: {},
    extraReducers: {
        [findByFollowerThunk.fulfilled]: (state, { payload }) => {
            state.follows = payload;
        },
        [findByFollowedThunk.fulfilled]: (state, { payload }) => {
            state.follows = payload;
        },
        [findFollowThunk.fulfilled]: (state, { payload }) => {
            state.follows = payload;
        },
        [findAllFollowsThunk.fulfilled]: (state, { payload }) => {
            state.follows = payload;
        },
        [unfollowThunk.fulfilled]: (state, { payload }) => {
            state.follows = state.follows.filter(f => f._id !== payload._id)
        },
        [followThunk.fulfilled]: (state, { payload }) => {
            state.follows.push(payload);
        },
    },
});

export default followSlice.reducer;