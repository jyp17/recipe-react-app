import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookmarkService from "./bookmarks-service";

export const createBookmarkThunk = createAsyncThunk(
    "bookmark/create", async (newBkmk) => {
        const bookmark = await bookmarkService.createBookmark(newBkmk);
        return bookmark;
    }
);

export const findBookmarksByUserThunk = createAsyncThunk(
    "bookmark/findByUser", async (username) => {
        const bookmark = await bookmarkService.findBookmarksByUser(username);
        return bookmark;
    }
);

export const findBookmarksByTopicThunk = createAsyncThunk(
    "bookmark/findByTopic", async (tid) => {
        const bookmark = await bookmarkService.findBookmarksByTopic(tid);
        return bookmark;
    }
);

export const findRecentBookmarksThunk = createAsyncThunk(
    "bookmark/recent", async () => {
        const bookmarks = await bookmarkService.findRecentBookmarks();
        return bookmarks;
    }
);

export const deleteBookmarkThunk = createAsyncThunk(
    "bookmark/delete", async (bid) => {
        await bookmarkService.deleteBookmark(bid);
        return bid;
    }
);