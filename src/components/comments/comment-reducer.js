import { createSlice } from "@reduxjs/toolkit";

import {createCommentThunk, deleteCommentThunk, updateCommentThunk, findCommentByAuthorThunk, findCommentByTopicThunk}
    from "../../services/comments-thunk";


const commentSlice = createSlice({
    name: "comments",
    initialState: {comments: []},
    reducers: {},
    extraReducers: {
        [findCommentByAuthorThunk.fulfilled]: (state, { payload }) => {
            state.comments = payload;
        },
        [findCommentByTopicThunk.fulfilled]: (state, { payload }) => {
            state.comments = payload;
        },
        [deleteCommentThunk.fulfilled]: (state, { payload }) => {
            state.comments = state.comments.filter(c => c._id !== payload)
        },
        [updateCommentThunk.fulfilled]: (state, { payload }) => {
            const cIndex = state.comments.findIndex((c) => c._id === payload._id)
            state.comments[cIndex] = {
                ...state.comments[cIndex],
                ...payload
            }
        },
        [createCommentThunk.fulfilled]: (state, { payload }) => {
            state.comments.push(payload);
        },
    },
});

export default commentSlice.reducer;