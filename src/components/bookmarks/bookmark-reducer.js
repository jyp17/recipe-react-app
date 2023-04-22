import { createSlice } from "@reduxjs/toolkit";

import {findBookmarksByTopicThunk, findBookmarksByUserThunk, findRecentBookmarksThunk, createBookmarkThunk, deleteBookmarkThunk}
    from "../../services/bookmarks-thunk";


const bookmarkSlice = createSlice({
    name: "bookmarks",
    initialState: {bookmarks: []},
    reducers: {},
    extraReducers: {
        [findBookmarksByUserThunk.fulfilled]: (state, { payload }) => {
            state.bookmarks = payload;
        },
        [findBookmarksByTopicThunk.fulfilled]: (state, { payload }) => {
            state.bookmarks = payload;
        },
        [findRecentBookmarksThunk.fulfilled]: (state, { payload }) => {
            state.bookmarks = payload;
        },
        [deleteBookmarkThunk.fulfilled]: (state, { payload }) => {
            state.bookmarks = state.bookmarks.filter(b => b._id !== payload)
        },
        [createBookmarkThunk.fulfilled]: (state, { payload }) => {
            state.bookmarks.push(payload);
        },
    },
});

export default bookmarkSlice.reducer;