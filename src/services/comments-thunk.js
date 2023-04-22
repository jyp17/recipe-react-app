import { createAsyncThunk } from "@reduxjs/toolkit";
import * as commentService from "./comments-service";

export const createCommentThunk = createAsyncThunk(
    "comment/create", async (newComment) => {
        const comment = await commentService.createComment(newComment);
        return comment;
    }
);

export const findCommentByAuthorThunk = createAsyncThunk(
    "comment/findByAuthor", async (username) => {
        const comment = await commentService.findCommentByAuthor(username);
        return comment;
    }
);

export const findCommentByTopicThunk = createAsyncThunk(
    "comment/findByTopic", async (tid) => {
        const comment = await commentService.findCommentByTopic(tid);
        return comment;
    }
);

export const updateCommentThunk = createAsyncThunk(
    "comment/update", async (newComment) => {
        const comment = await commentService.updateComment(newComment);
        return comment;
    }
);

export const deleteCommentThunk = createAsyncThunk(
    "comment/delete", async (cid) => {
        await commentService.deleteComment(cid);
        return cid;
    }
);