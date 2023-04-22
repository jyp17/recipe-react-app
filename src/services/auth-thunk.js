import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";
export const registerThunk = createAsyncThunk(
    "auth/register", async (newUser) => {
        const user = await authService.register(newUser)
        return user;
    }
);
export const loginThunk = createAsyncThunk(
    "auth/login", async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);
export const getUserThunk = createAsyncThunk(
    "auth/getUser", async (uid) => {
        return await authService.getUser(uid);
    });

export const getUserByNameThunk = createAsyncThunk(
    "auth/getUserByName", async (uname) => {
        return await authService.getUserByUsername(uname);
    });

export const getAllUsersThunk = createAsyncThunk(
    "auth/getAllUsers", async () => {
        return await authService.getAllUsers();
    });

export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
        return await authService.logout();
    });
export const updateUserThunk = createAsyncThunk(
    "auth/updateUser", async (user) => {
        await authService.updateUser(user);
        return user;
    }
);

export const updateRoleThunk = createAsyncThunk(
    "auth/updateRole", async (user) => {
        await authService.updateUser(user);
        return user;
    }
);