import { createAsyncThunk } from "@reduxjs/toolkit";
import * as followService from "./follow-service";

export const followThunk = createAsyncThunk(
    "follow/create", async (follow) => {
        const newFollow = await followService.createFollow(follow.follower, follow.followed);
        return newFollow;
    }
);

export const unfollowThunk = createAsyncThunk(
    "follow/delete", async (follow) => {
        const newUnfollow = await followService.deleteFollow(follow.follower, follow.followed);
        return newUnfollow;
    }
);

export const findAllFollowsThunk = createAsyncThunk(
    "follow/all", async () => {
        const follows = await followService.findAllFollows();
        return follows;
    }
);

export const findFollowThunk = createAsyncThunk(
    "follow/find", async (follow) => {
        const results = await followService.findFollow(follow.follower, follow.followed);
        return results;
    }
);

export const findByFollowerThunk = createAsyncThunk(
    "follow/findByFollower", async (follower) => {
        const follow = await followService.findByFollowers(follower);
        return follow;
    }
);

export const findByFollowedThunk = createAsyncThunk(
    "follow/findByFollowed", async (followed) => {
        const follow = await followService.findByFollowed(followed);
        return follow;
    }
);